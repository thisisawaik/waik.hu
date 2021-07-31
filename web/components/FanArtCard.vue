<template>
  <v-card :loading="loading" class="mx-auto my-12" elevation="15" :max-width="isFromPhone ? '90vw' : '374'">
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
          <v-list-item-title>
            {{
              authorName === 'Loading...' ? ' ' : authorName
            }}
          </v-list-item-title>
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
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data () {
    return {
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
      user: null
    }
  },
  async created () {
    const db = this.$fire.firestore
    const database = this.$fire.database
    // const storage = this.$fire.storage
    const ref = db.collection('waik/website/fanarts').doc(this.id)
    try {
      const doc = await ref.get()
      this.title = doc.data().title
      this.desc = doc.data().desc
      if (doc.data().getFromGS) {
        const storage = this.$fire.storage
        const sref = storage.ref(doc.data().gsURL)
        this.imageurl = await sref.getDownloadURL()
      } else {
        this.imageurl = doc.data().downloadurl
      }

      if (doc.data().author) {
        const dcRef = db.collection('dcusers').doc(doc.data().author)
        const dcDoc = await dcRef.get()
        this.authorAvatar = dcDoc.data().pp
        this.authorName = dcDoc.data().tag
      }

      if (doc.data().shareid) {
        this.shareId = doc.data().shareid
      }

      this.$fire.auth.onAuthStateChanged(async (user) => {
        this.user = user
        if (user) {
          const userLikeRef = db.doc(`waik/website/fanarts/${this.id}/likes/${user.uid}`)
          await userLikeRef.get().then((doc) => {
            this.isLiked = doc.exists
          })
        }
      })

      const likesref = database.ref(`fanarts/${this.id}`)
      // eslint-disable-next-line require-await
      this.likesListener = likesref.on('value', async (snap) => {
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
    },
    changeLikeStatus () {
      if (this.user) {
        if (this.isLiked) {
          this.remove_like()
        } else {
          this.like()
        }
      } else {
        this.$router.push('/auth')
      }
    },
    async like () {
      const functions = this.$fire.functions
      this.isLiked = true
      this.likes = this.likes + 1
      await functions.httpsCallable('waikFanartAddLike')({
        postId: this.id
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        this.isLiked = false
        this.likes = this.likes - 1
      })
    },
    async remove_like () {
      const functions = this.$fire.functions
      this.isLiked = false
      this.likes = this.likes - 1
      await functions.httpsCallable('waikFanartLikeRemove')({
        postId: this.id
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
    }
  }
}
</script>
