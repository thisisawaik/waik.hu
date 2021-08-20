<template>
  <div>
    <v-form v-if="!!auth.currentUser" v-model="valid">
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
          truncate-length="15"
          @change="upload"
        />
        <v-dialog v-model="infosDialog" width="500">
          <template #activator="{ on, attrs }">
            <div>
              <p class="imghint">
                Megengedett formátumok: JPEG, PNG, GIF
              </p>
              <p class="imghint">
                Javasolt szélesség: 374px
              </p>
              <p class="imghint">
                Javasolt maximum magasság: 1000px
              </p>
              <a class="imghint" v-bind="attrs" v-on="on">További információk</a>
            </div>
          </template>

          <v-card>
            <v-card-title class="infosTitle">
              {{ $store.state.fanartInfos.title }}
            </v-card-title>
            <nuxt-content class="infosContent" :document="$store.state.fanartInfos" />
            <v-card-actions>
              <p class="updated">
                Frissítve: {{ formatDate($store.state.fanartInfos.updatedAt) }}
              </p>
              <v-spacer />
              <v-btn color="primary" text @click="rulesDialog = false">
                Bezárás
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
        <p>*A kép a maximum 374px széles és 1000px magas módon fog megjelenni</p>
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
      <h1>Fanart feltöltéshez be kell jelentkezned!</h1> <NuxtLink
        class="nav-bar-button"
        :to="localePath('auth')"
      >
        <h1>Kattints ide a bejelentkezéshez</h1>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getPerformance, trace } from 'firebase/performance'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
export default Vue.extend({
  name: 'FanArtUpload',
  data () {
    const title = {
      maxLength: 30,
      default: `${this.$t('title')}${this.$i18n.locale !== 'hu' ? ' (We recommend writing this in Hungarian)' : ''}`,
      content: '',
    }
    const desc = {
      maxLength: 256,
      default: `${this.$t('description')}${this.$i18n.locale !== 'hu' ? ' (We recommend writing this in Hungarian)' : ''}`,
      content: '',
    }
    return {
      db: getFirestore(),
      auth: getAuth(),
      performance: getPerformance(),
      storage: getStorage(),
      analytics: getAnalytics(),
      saveBtn: {
        text: 'Mentés',
        color: 'green',
        tcolor: 'white',
        disabled: false,
      },
      submitBtn: {
        text: 'Beküldés',
        color: 'green',
        tcolor: 'white',
        disabled: false,
      },
      isForComp: false,
      rulesDialog: false,
      infosDialog: false,
      rules: this.$store.state.fanartRules,
      title,
      desc,
      titletext: '',
      desctext: '',
      image: null,
      valid: false,
      firstname: '',
      lastname: '',
      dcid: null,
      titleRules: [
        v => !!v || 'Cím megadása kötelező',
        v =>
          v.length <= title.maxLength ||
          `Nem lehet több mint ${title.maxLength} karakter`,
      ],
      descRules: [
        v =>
          v.length <= desc.maxLength ||
          `Nem lehet több mint ${desc.maxLength} karakter`,
      ],
      uploadProgress: null,
    }
  },
  async created () {
    const article = this.$store.state.fanartRules
    // console.log(article)
    this.rules = article
    this.rulesLoading = false
    const user = this.auth.currentUser
    if (user) {
      const artref = doc(collection(this.db, 'waik/website/fanarts'), user.uid)
      try {
        const res = await getDoc(artref)
        if (res.exists()) {
          if (res.data().title) { this.titletext = res.data().title }
          if (res.data().desc) { this.desctext = res.data().desc }
          if (res.data().forComp) { this.isForComp = res.data().forComp }
          if (res.data().gsURL) {
            const url = await getDownloadURL(ref(this.storage, res.data().gsURL))
            this.image = url
          }
        } else {
          console.log(this.dcid)
          if (!this.dcid) {
            const userref = doc(collection(this.db, 'users'), user.uid)
            const res = await getDoc(userref)
            if (res.data().dcid) {
              this.dcid = res.data().dcid
            } else {
              this.dcid = null
            }
          }
          setDoc(artref, {
            author: this.dcid,
          }, { merge: true })
        }
        const userref = doc(collection(this.db, 'users'), user.uid)
        const userdoc = await getDoc(userref)
        this.dcid = userdoc.data().dcid || null
      } catch (error) {
        console.log(this.dcid)
        setDoc(artref, {
          author: this.dcid,
        }, { merge: true })
      }
    }
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString('hu', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    upload (e) {
      const user = this.auth.currentUser
      const sref = ref(this.storage, `/waik/fanarts/${user.uid}/${e.name}`)
      const strace = trace(this.performance, 'fanart_save')
      strace.start()
      // eslint-disable-next-line require-await
      uploadBytesResumable(sref, e).on('state_changed', async (snap) => {
        strace.incrementMetric('size', e.size)
        const uploadPrecentage = (snap.bytesTransferred / snap.totalBytes) * 100
        this.uploadProgress = uploadPrecentage
        if (uploadPrecentage === 100) {
          const user = this.auth.currentUser
          const artref = doc(collection(this.db, 'waik/website/fanarts'), user.uid)
          this.image = await getDownloadURL(ref(this.storage, `/waik/fanarts/${user.uid}/${e.name}`))
          await setDoc(artref, {
            gsURL: `/waik/fanarts/${user.uid}/${e.name}`,
          }, { merge: true })
          strace.stop()
        }
      })
    },
    async save () {
      if (this.saveBtn.disabled === true) { return }
      const user = this.auth.currentUser
      const artref = doc(collection(this.db, 'waik/website/fanarts'), user.uid)
      this.saveBtn.text = 'Mentés...'
      this.saveBtn.color = 'yellow'
      this.saveBtn.tcolor = 'black'
      this.saveBtn.disabled = true
      const strace = trace(this.performance, 'fanart_save')
      strace.start()
      if (!this.dcid) {
        const userref = doc(collection(this.db, 'users'), user.uid)
        const res = await getDoc(userref)
        console.log(res.data())
        if (res.data().dcid) {
          this.dcid = res.data().dcid
        } else {
          this.dcid = null
        }
      }
      await setDoc(artref, {
        desc: this.desc.titletext ? null : this.titletext,
        title: this.desc.desctext ? null : this.desctext,
        forComp: this.isForComp,
        author: this.dcid,
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
        // eslint-disable-next-line no-console
        console.error(e)
      })
      strace.stop()
      return true
    },
    async submit () {
      if (this.submitBtn.disabled === true) { return }
      await this.save()
      this.submitBtn.text = 'Beküldés...'
      this.submitBtn.color = 'yellow'
      this.submitBtn.tcolor = 'black'
      this.submitBtn.disabled = true
      // TODO: replace with a real API call
      await this.$axios.post('/fanart/submit', {
        id: this.auth.currentUser.uid,
      }).then(() => {
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
        // eslint-disable-next-line no-console
        console.error(e)
        if (e.code === 'mt3') {
          this.submitBtn.text = 'Már beküldtél 3 alkotást a versenyre!'
        } else {
          this.submitBtn.text = 'Hiba történt beküldés közben! Próbáld újra később!'
        }
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
      /*
      await functions.httpsCallable('waikFanartSubmit')({
        postId: this.$fire.auth.currentUser.uid,
      }).then(() => {
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
        // eslint-disable-next-line no-console
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
      */
    },
  },
})
</script>

<style lang="scss" scoped>
.btns {
  position: relative;
  left: 100%;
}

.imghint {
  margin-bottom: 0px;
  font-size: 13px;
}

.infosContent {
  margin-left: 10px;
  margin-bottom: 20px;
}

.infosTitle {
  margin-bottom: 10px;
}
</style>
