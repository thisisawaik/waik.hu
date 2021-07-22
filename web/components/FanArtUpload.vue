<template>
  <div>
    <v-form v-model="valid">
      <v-container style="max-width: 400px">
        <v-text-field
          v-model="firstname"
          :rules="titleRules"
          :counter="title.maxLength"
          :label="title.default"
          required
        />

        <v-text-field
          v-model="lastname"
          :rules="descRules"
          :counter="desc.maxLength"
          :label="desc.default"
          required
        />

        <v-file-input truncate-length="15" @change="upload" />
        <v-progress-linear :value="uploadProgress || 0" />
      </v-container>
    </v-form>
    <v-dialog v-model="rulesDialog" width="500">
      <template #activator="{ on, attrs }">
        <div>
          <v-spacer />
          <v-btn color="center" dark v-bind="attrs" v-on="on">
            Szabályzat
          </v-btn>
          <v-btn color="green" dark v-bind="attrs" v-on="on">
            Mentés
          </v-btn>
          <v-btn color="green" dark v-bind="attrs" v-on="on">
            Beküldés
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title>{{ $store.state.fanartRules.title }}</v-card-title>
        <nuxt-content class="document" :document="$store.state.fanartRules" />
        <v-card-actions>
          <p class="updated">
            Frissítve: {{ formatDate($store.state.fanartRules.updatedAt) }}
          </p>
          <v-spacer />
          <v-btn color="primary" text @click="rulesDialog = false">
            Bezárás
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'FanArtUpload',
  data () {
    const title = {
      maxLength: 30,
      default: 'Cím'
    }
    const desc = {
      maxLength: 300,
      default: 'Leírás'
    }
    return {
      rulesDialog: false,
      rules: this.$store.state.fanartRules,
      title,
      desc,
      valid: false,
      firstname: '',
      lastname: '',
      titleRules: [
        v => !!v || 'Cím megadása kotelezo',
        v =>
          v.length <= title.maxLength ||
          `Nem lehet tobb mint ${title.maxLength} karakter`
      ],
      descRules: [
        v =>
          v.length <= desc.maxLength ||
          `Nem lehet tobb mint ${desc.maxLength} karakter`
      ],
      uploadProgress: null
    }
  },
  created () {
    const article = this.$store.state.fanartRules
    // console.log(article)
    this.rules = article
    this.rulesLoading = false
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
    },
    upload (e) {
      const storage = this.$fire.storage
      const user = this.$fire.auth.currentUser
      const ref = storage.ref(`/waik/fanarts/temp/${user.uid}/${e.name}`)
      // eslint-disable-next-line require-await
      ref.put(e).on('state_changed', async (snap) => {
        const uploadPrecentage =
              (snap.bytesTransferred / snap.totalBytes) * 100
        this.uploadProgress = uploadPrecentage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btns {
  position: relative;
  left: 100%;
}
</style>
