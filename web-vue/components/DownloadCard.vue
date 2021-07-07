<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-card-title>{{ title }}</v-card-title>
    <v-img v-if="imageurl" height="250" :src="imageurl"></v-img>
    <v-card-text>
      <div>{{ desc }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar v-if="loading || authorAvatar" color="primary">
          <v-img
            v-if="authorAvatar"
            class="elevation-6"
            alt=""
            :src="authorAvatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content v-if="loading || authorName">
          <v-list-item-title>{{
            authorName === 'Loading...' ? ' ' : authorName
          }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1"> mdi-download </v-icon>
          <span class="mr-1">·</span>
          <v-icon class="mr-1"> mdi-share-variant </v-icon>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  data() {
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
    }
  },
  async created() {
    const db = this.$fire.firestore
    // const storage = this.$fire.storage
    const ref = db.collection('waik/website/downloads').doc(this.id)
    try {
      const doc = await ref.get()
      this.title = doc.data().name
      this.desc = doc.data().desc
      if (doc.data().imageurl) {
        // const sref = storage.ref(doc.data().gsURL)
        // this.imageurl = await sref.getDownloadURL()
        this.imageurl = doc.data().imageurl
      }
      if (doc.data().author) {
        const dcRef = db.collection('dcusers').doc(doc.data().author)
        const dcDoc = await dcRef.get()
        this.authorAvatar = dcDoc.data().pp
        this.authorName = dcDoc.data().tag
      }
      this.loading = false
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.loading = false
    }
  },
  methods: {
    copyShareUrl() {},
    download() {},
    openGithub() {},
    async copySomething(text) {
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