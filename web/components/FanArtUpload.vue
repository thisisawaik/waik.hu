<template>
  <div>
    <v-form v-if="!!$fire.auth.currentUser" v-model="valid">
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
        <v-progress-linear style="margin-bottom: 20px;" :value="uploadProgress || 0" />
        <v-checkbox
          v-model="isForComp"
          :label="`Checkbox 1: ${isForComp.toString()}`"
        />
        <v-img
          max-width="486"
          max-height="1000"
          :src="image ? image : 'https://picsum.photos/id/11/500/300'"
          lazy-src="https://picsum.photos/id/11/10/6"
        />
      </v-container>
      <v-dialog v-model="rulesDialog" width="500">
        <template #activator="{ on, attrs }">
          <div>
            <v-spacer />
            <v-btn color="center" dark v-bind="attrs" v-on="on">
              Szabályzat
            </v-btn>
            <v-btn :style="`color: ${saveBtn.tcolor};`" :disabled="saveBtn.disabled" :color="saveBtn.color" @click="save">
              {{ saveBtn.text }}
            </v-btn>
            <v-btn :style="`color: ${submitBtn.tcolor};`" :disabled="submitBtn.disabled" :color="submitBtn.color" @click="submit">
              {{ submitBtn.text }}
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
    </v-form>
    <div v-else>
      <h1>Fanart feltöltéshez be kell jelentkezned!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FanArtUpload',
  data () {
    const title = {
      maxLength: 30,
      default: 'Cím',
      content: ''
    }
    const desc = {
      maxLength: 300,
      default: 'Leírás',
      content: ''
    }
    return {
      saveBtn: {
        text: 'Mentés',
        color: 'green',
        tcolor: 'white',
        disabled: false
      },
      submitBtn: {
        text: 'Beküldés',
        color: 'green',
        tcolor: 'white',
        disabled: false
      },
      isForComp: false,
      rulesDialog: false,
      rules: this.$store.state.fanartRules,
      title,
      desc,
      image: null,
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
  async created () {
    const article = this.$store.state.fanartRules
    // console.log(article)
    this.rules = article
    this.rulesLoading = false
    const db = this.$fire.firestore
    const user = this.$fire.auth.currentUser
    if (user) {
      const artref = db.collection('waik/website/fanarts').doc(user.uid)
      const doc = await artref.get()
      if (doc.data().title) { this.title.content = doc.data().title }
      if (doc.data().desc) { this.desc.content = doc.data().desc }
      if (doc.data().forComp) { this.isForComp = doc.data().forComp }
      if (doc.data().gsURL) {
        const url = await this.$fire.storage.ref(doc.data().gsURL).getDownloadURL()
        this.image = url
      }
    }
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
      const perf = this.$fire.performance
      const trace = perf.trace('fanart_save')
      trace.start()
      // eslint-disable-next-line require-await
      ref.put(e).on('state_changed', async (snap) => {
        trace.incrementMetric('size', e.size)
        const uploadPrecentage = (snap.bytesTransferred / snap.totalBytes) * 100
        this.uploadProgress = uploadPrecentage
        if (uploadPrecentage === 100) {
          const db = this.$fire.firestore
          const user = this.$fire.auth.currentUser
          const artref = db.collection('waik/website/fanarts').doc(user.uid)
          this.image = await this.$fire.storage.ref(`/waik/fanarts/temp/${user.uid}/${e.name}`).getDownloadURL()
          await artref.set({
            gsURL: `/waik/fanarts/temp/${user.uid}/${e.name}`
          }, { merge: true })
          trace.stop()
        }
      })
    },
    async save () {
      const db = this.$fire.firestore
      const user = this.$fire.auth.currentUser
      const perf = this.$fire.performance
      const artref = db.collection('waik/website/fanarts').doc(user.uid)
      this.saveBtn.text = 'Mentés...'
      this.saveBtn.color = 'yellow'
      this.saveBtn.tcolor = 'black'
      this.saveBtn.disabled = true
      const trace = perf.trace('fanart_save')
      trace.start()
      await artref.set({
        desc: this.desc.content ? this.desc.content : null,
        title: this.desc.title ? this.desc.title : null
      }, { merge: true }).then(() => {
        this.saveBtn.text = 'Sikeres mentés!'
        this.saveBtn.color = 'green'
        this.saveBtn.tcolor = 'white'
        setTimeout(() => {
          this.saveBtn.text = 'Mentés'
          this.saveBtn.color = 'green'
          this.saveBtn.tcolor = 'white'
          this.saveBtn.disabled = false
        }, 5000)
      })
      trace.stop()
    },
    submit () {
      console.log('asd')
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
