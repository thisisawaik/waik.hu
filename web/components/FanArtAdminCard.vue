<template>
  <v-card :loading="loading" class="mx-auto my-12" elevation="15" :max-width="isFromPhone ? '90vw' : '374'">
    <template slot="progress">
      <v-progress-linear
        :color="loadcolor"
        height="10"
        :indeterminate="loadindeterminate"
        :value="loadvalue"
      />
    </template>
    <v-card-title>{{ title }}</v-card-title>
    <v-img v-if="imageurl" :src="imageurl" />
    <v-card-text>
      <div>{{ desc }}</div>
    </v-card-text>

    <v-divider />
    <v-card-text>
      Versenyre: {{ `${typeof isForComp === "undefined" ? 'unknown' : isForComp}` }}
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
          <v-icon class="mr-1" @click="approve()">
            mdi-check
          </v-icon>
          <span class="mr-1">·</span>
          <v-icon class="mr-1" @click="deny()">
            mdi-close
          </v-icon>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
export default Vue.extend({
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data () {
    return {
      db: getFirestore(),
      storage: getStorage(),
      loading: true,
      loadcolor: 'deep-purple',
      loadindeterminate: true,
      loadvalue: 0,
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
      isForComp: false,
      user: null,
    }
  },
  async created () {
    // const storage = this.$fire.storage
    const dref = doc(collection(this.db, 'waik/website/fanarts'), this.id)
    try {
      const res = await getDoc(dref)
      this.title = res.data().title
      this.desc = res.data().desc
      if (res.data().getFromGS) {
        const sref = ref(this.storage, res.data().gsURL)
        this.imageurl = await getDownloadURL(sref)
      } else {
        this.imageurl = res.data().downloadurl
      }

      if (res.data().author) {
        const dcRef = doc(collection(this.db, 'dcusers'), res.data().author)
        const dcDoc = await getDoc(dcRef)
        this.authorAvatar = dcDoc.data().pp
        this.authorName = dcDoc.data().tag
      }

      this.isForComp = res.data().forComp

      this.loading = false
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.loading = false
    }
  },
  methods: {
    async approve () {
      const functions = this.$fire.functions
      await functions.httpsCallable('waikFanartApprove')({
        postId: this.id,
      }).then(() => {
      }).catch((e) => {
        // eslint-disable-next-line no-console
        this.loadcolor = 'red'
        console.log(e)
      })
    },
    async deny () {
      const functions = this.$fire.functions
      await functions.httpsCallable('waikFanartDeny')({
        postId: this.id,
      }).then(() => {
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
        this.isLiked = true
        this.likes = this.likes + 1
      })
    },
  },
})
</script>
