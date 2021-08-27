<template>
  <v-card :loading="loading" class="mx-auto my-12" elevation="15" :max-width="isFromPhone ? '90vw' : '374'" color="#1f2937">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      />
    </template>
    <v-card-title>{{ title }}</v-card-title>
    <v-img v-if="imageurl" :src="imageurl" />
    <v-card-text>
      <div>{{ desc }}</div>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar v-if="loading || authorAvatar" color="primary">
          <v-img
            v-if="authorAvatar"
            class="elevation-6"
            alt=""
            :src="authorAvatar"
          />
        </v-list-item-avatar>

        <v-list-item-content v-if="loading || authorName">
          <span>
            <p class="badge">
              {{
                authorName === 'Loading...' ? ' ' : authorName
              }}
            </p>
            <v-icon v-if="isVerified" class="mr-1 badge">
              mdi-check-decagram
            </v-icon>
          </span>
        </v-list-item-content>

        <v-row align="center" justify="end">
          {{ likes }}
          <v-icon class="mr-1" @click="changeLikeStatus()">
            {{ isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
          <span class="mr-1">·</span>
          <v-icon class="mr-1" @click="copyShareUrl()">
            mdi-share-variant
          </v-icon>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { getDatabase, onValue, ref as dbref } from 'firebase/database'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getToken } from 'firebase/app-check'
import { getAnalytics, logEvent } from 'firebase/analytics'
export default Vue.extend({
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data () {
    return {
      db: getFirestore(),
      rdb: getDatabase(),
      storage: getStorage(),
      auth: getAuth(),
      analytics: getAnalytics(),
      loading: true,
      title: 'Loading...',
      desc: 'Loading...',
      imageurl: null,
      authorAvatar: null,
      authorName: 'Loading...',
      downloadurl: null,
      githuburl: null,
      showCopyBar: false,
      isFromPhone: this.$device.isMobileOrTablet,
      likes: 0,
      isLiked: false,
      likesListener: null,
      shareId: null,
      user: null,
      isActionClicked: false,
      isVerified: false,
    }
  },
  async created () {
    try {
      const fanart = JSON.parse(localStorage.getItem(`cache.fanarts.${this.id}`))
      if (fanart) {
        this.loading = false
        this.title = fanart.title
        this.desc = fanart.desc
        this.imageurl = fanart.imageurl
      }
    } catch (error) {}
    // const postData = await this.$axios.get(`/fanart/${this.id}/`)
    const docref = doc(this.db, `waik/website/fanarts/${this.id}`) //  db.collection('waik/website/fanarts').doc(this.id)
    try {
      const res = await getDoc(docref)
      this.title = res.data().title
      this.desc = res.data().desc
      localStorage.setItem(`cache.fanarts.${this.id}`, JSON.stringify(res.data()))
      if (res.data().getFromGS) {
        const sref = ref(this.storage, res.data().gsURL)
        this.imageurl = await getDownloadURL(sref)
      } else {
        this.imageurl = res.data().downloadurl
      }

      if (res.data().author) {
        try {
          const user = JSON.parse(localStorage.getItem(`cache.users.${res.data().author}`))
          this.authorAvatar = user.pp
          this.authorName = user.username
          this.isVerified = !!user.badges.find(b => b === 'verified')
          console.log(!!user.badges.find(b => b === 'verified'))
        } catch (error) {}
        try {
          const user = await this.$axios.get(`/discord/users/${res.data().author}/get`)
          if (process.client) {
            const ls = localStorage
            ls.setItem(`cache.users.${res.data().author}`, JSON.stringify(user.data))
          }
          console.log(user.data)
          this.authorAvatar = user.data.pp
          this.authorName = user.data.username
          try {
            this.isVerified = !!user.data.badges.find(b => b === 'verified')
          } catch (error) {}
        } catch (error) {
          console.log(error)
        }

        /*
        const dcRef = db.collection('dcusers').doc(doc.data().author)
        const dcDoc = await dcRef.get()
        this.authorAvatar = dcDoc.data().pp
        this.authorName = dcDoc.data().tag
        */
      }

      if (res.data().shareid) {
        this.shareId = res.data().shareid
      }

      onAuthStateChanged(this.auth, async (user) => {
        this.user = user
        if (user) {
          const userLikeRef = doc(this.db, `waik/website/fanarts/${this.id}/likes/${user.uid}`)
          await getDoc(userLikeRef).then((doc) => {
            this.isLiked = !!doc.exists()
          })
        }
      })

      const likesref = dbref(this.rdb, `fanarts/${this.id}`)
      // eslint-disable-next-line require-await
      this.likesListener = onValue(likesref, async (snap) => {
        if (snap !== undefined) {
          this.likes = snap.val().likes ? snap.val().likes : 0
        }
      })
      this.loading = false
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.loading = false
    }
  },
  destroyed () {
    try {
      this.likesListener()
    } catch (e) {
      try {
        this.likesListener().off()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Detatching listener failed')
      }
    }
  },
  methods: {
    copyShareUrl () {
      const url = `https://waik.hu/share/${this.shareId}`
      this.copySomething(url)
      logEvent(this.analytics, 'share_click')
    },
    changeLikeStatus () {
      if (this.user) {
        if (this.isLiked) {
          this.remove_like()
          logEvent(this.analytics, 'like_remove')
        } else {
          this.like()
          logEvent(this.analytics, 'like_add')
        }
      } else {
        this.$router.push('/auth')
      }
    },
    async like () {
      this.isLiked = true
      this.likes = this.likes + 1
      const appCheckToken = await getToken(this.$appCheck)
      await this.$axios.post(`/fanart/posts/${this.id}/like`, {
        appCheckToken: appCheckToken.token,
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        this.isLiked = false
        this.likes = this.likes - 1
      })
    },
    async remove_like () {
      this.isLiked = false
      this.likes = this.likes - 1
      const appCheckToken = await getToken(this.$appCheck)
      await this.$axios.delete(`/fanart/posts/${this.id}/like`, {
        data: {
          appCheckToken: appCheckToken.token,
          asd: 'asd',
        },

      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        this.isLiked = true
        this.likes = this.likes + 1
      })
    },
    async copySomething (text) {
      try {
        await this.$copyText(text)
      } catch (e) {
        // console.error(e);
      }
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
