<template>
  <div>
    <v-form v-if="!!$fire.auth.currentUser" v-model="valid">
      <v-container style="max-width: 400px">
        <v-text-field
          v-model="titletext"
          :rules="titleRules"
          :counter="title.maxLength"
          :label="title.default"
          required
        />

        <v-text-field
          v-model="desctext"
          :rules="descRules"
          :counter="desc.maxLength"
          :label="desc.default"
          required
        />

        <v-file-input
          :label="$t('file')"
          :message="['Megengedett formátumok: JPEG, PNG, GIF']"
          truncate-length="15"
          @change="upload"
        />
        <v-progress-linear style="margin-bottom: 20px;" :value="uploadProgress || 0" />
        <v-checkbox
          v-model="isForComp"
          label="Beküldés versenyre"
        />
        <v-img
          max-width="486"
          :aspect-ratio="1/1"
          :src="image ? image : 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Ffanarts%2Ftemp%2FWQxQFpK5L3WKfsxb3Ficb4fa90J2%2F11-500x300.png?alt=media&token=0fe24064-fe58-4b5e-bd3b-14155e392f87'"
          lazy-src="https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Ffanarts%2Ftemp%2FWQxQFpK5L3WKfsxb3Ficb4fa90J2%2F11-500x300.png?alt=media&token=0fe24064-fe58-4b5e-bd3b-14155e392f87"
        />
        <p>*A kép a teljes méretében fog megjelenni</p>
      </v-container>
      <v-dialog v-model="rulesDialog" width="500">
        <template #activator="{ on, attrs }">
          <div>
            <v-spacer />
            <v-btn color="center" dark v-bind="attrs" v-on="on">
              Szabályzat
            </v-btn>
            <v-btn :style="`color: ${saveBtn.tcolor};`" :color="saveBtn.color" @click="save">
              {{ saveBtn.text }}
            </v-btn>
            <v-btn :style="`color: ${submitBtn.tcolor};`" :color="submitBtn.color" @click="submit">
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
      default: `${this.$t('title')}${this.$i18n.locale !== 'hu' ? ' (We recommend writing this in Hungarian)' : ''}`,
      content: ''
    }
    const desc = {
      maxLength: 300,
      default: `${this.$t('description')}${this.$i18n.locale !== 'hu' ? ' (We recommend writing this in Hungarian)' : ''}`,
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
      titletext: '',
      desctext: '',
      image: null,
      valid: false,
      firstname: '',
      lastname: '',
      titleRules: [
        v => !!v || 'Cím megadása kötelező',
        v =>
          v.length <= title.maxLength ||
          `Nem lehet több mint ${title.maxLength} karakter`
      ],
      descRules: [
        v =>
          v.length <= desc.maxLength ||
          `Nem lehet több mint ${desc.maxLength} karakter`
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
      console.log(doc.data())
      if (doc.data().title) { this.titletext = doc.data().title }
      if (doc.data().desc) { this.desctext = doc.data().desc }
      if (doc.data().forComp) { this.isForComp = doc.data().forComp }
      if (doc.data().gsURL) {
        const url = await this.$fire.storage.ref(doc.data().gsURL).getDownloadURL()
        this.image = url
      }
    }
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString('hu', { year: 'numeric', month: 'long', day: 'numeric' })
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
      if (this.saveBtn.disabled === true) { return }
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
        desc: this.desc.titletext ? null : this.titletext,
        title: this.desc.desctext ? null : this.desctext,
        forComp: this.isForComp || false
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
      }).catch((e) => {
        console.error(e)
      })
      trace.stop()
      return true
    },
    async submit () {
      if (this.submitBtn.disabled === true) { return }
      await this.save()
      console.log('asd')
      const functions = this.$fire.functions
      this.submitBtn.text = 'Beküldés...'
      this.submitBtn.color = 'yellow'
      this.submitBtn.tcolor = 'black'
      this.submitBtn.disabled = true
      await functions.httpsCallable('waikFanartSubmit')({
        postId: this.$fire.auth.currentUser.uid
      }).then((res) => {
        console.log(res)
        this.submitBtn.text = 'Sikeres beküldés'
        this.submitBtn.color = 'green'
        this.submitBtn.tcolor = 'white'
        this.submitBtn.disabled = true
        setTimeout(() => {
          this.submitBtn.text = 'Beküldés'
          this.submitBtn.color = 'green'
          this.submitBtn.tcolor = 'white'
          this.submitBtn.disabled = false
        }, 5000)
      }).catch((e) => {
        console.error(e)
        this.submitBtn.text = 'Hiba történt beküldés közben! Próbáld újra később!'
        this.submitBtn.color = 'red'
        this.submitBtn.tcolor = 'white'
        this.submitBtn.disabled = true
        setTimeout(() => {
          this.submitBtn.text = 'Beküldés'
          this.submitBtn.color = 'green'
          this.submitBtn.tcolor = 'white'
          this.submitBtn.disabled = false
        }, 5000)
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
