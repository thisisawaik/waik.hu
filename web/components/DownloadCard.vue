<template>
  <v-card :loading="loading" class="mx-auto my-12" :max-width="isFromPhone ? '90vw' : '374'">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      />
    </template>
    <v-card-title>{{ title }}</v-card-title>
    <v-img v-if="imageurl" height="250" :src="imageurl" />
    <v-card-text>
      <div>{{ desc }}</div>
    </v-card-text>

    <v-divider class="mx-4" />

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
          <v-icon v-if="githuburl" class="mr-1" @click="openGithub">
            mdi-github
          </v-icon>
          <span v-if="githuburl && downloadurl" class="mr-1">·</span>
          <v-icon v-if="downloadurl" class="mr-1" @click="download">
            mdi-download
          </v-icon>
          <span v-if="shareId && downloadurl || shareId && githuburl" class="mr-1">·</span>
          <v-icon v-if="shareId" class="mr-1" @click="copyShareUrl">
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
      shareId: null,

    }
  },
  async created () {
    const storage = this.$fire.storage
    try {
      const req = await this.$axios.get(`/downloads/download/${this.id}`)
      const data = req.data

      this.title = data.name
      this.desc = data.desc
      if (data.imageurl) {
        // const sref = storage.ref(data.gsURL)
        // this.imageurl = await sref.getDownloadURL()
        this.imageurl = data.imageurl
      }
      if (data.author) {
        const author = await this.$axios.get(`/discord/users/${data.author}/get`)
        this.authorAvatar = author.data.pp
        this.authorName = author.data.tag
      }
      if (data.githuburl) {
        this.githuburl = data.githuburl
      }
      if (data.shareid) {
        this.shareId = data.shareid
      }
      if (data.downloadgs) {
        const sref = storage.refFromURL(data.downloadgs)
        this.downloadurl = await sref.getDownloadURL()
      } else {
        this.downloadurl = data.downloadurl
      }
      this.loading = false
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.loading = false
    }
  },
  methods: {
    copyShareUrl () {
      if (this.shareId) {
        const url = `https://waik.hu/share/${this.shareId}`
        this.copySomething(url)
      }
    },
    download () {
      if (this.downloadurl) {
        open(this.downloadurl)
      }
    },
    openGithub () {
      if (this.githuburl) {
        open(this.githuburl)
      }
    },
    async copySomething (text) {
      try {
        await this.$copyText(text)
      } catch (e) {
        // console.error(e);
      }
    },
  },
}
</script>

<style>
</style>
