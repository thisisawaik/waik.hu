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
    <v-card-text>
      Versenyre: {{ isForComp }}
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
      isForComp: false,
      user: null,
    };
  },
  async created () {
    const db = this.$fire.firestore;
    // const storage = this.$fire.storage
    const ref = db.collection('waik/website/fanarts').doc(this.id);
    try {
      const doc = await ref.get();
      this.title = doc.data().title;
      this.desc = doc.data().desc;
      if (doc.data().getFromGS) {
        const storage = this.$fire.storage;
        const sref = storage.ref(doc.data().gsURL);
        this.imageurl = await sref.getDownloadURL();
      } else {
        this.imageurl = doc.data().downloadurl;
      }

      if (doc.data().author) {
        const dcRef = db.collection('dcusers').doc(doc.data().author);
        const dcDoc = await dcRef.get();
        this.authorAvatar = dcDoc.data().pp;
        this.authorName = dcDoc.data().tag;
      }

      this.isForComp = doc.data().isForComp;

      this.loading = false;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      this.loading = false;
    }
  },
  methods: {
    async approve () {
      const functions = this.$fire.functions;
      await functions.httpsCallable('waikFanartApprove')({
        postId: this.id,
      }).then(() => {
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
    },
    async deny () {
      const functions = this.$fire.functions;
      await functions.httpsCallable('waikFanartDeny')({
        postId: this.id,
      }).then(() => {
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        this.isLiked = true;
        this.likes = this.likes + 1;
      });
    },
  },
};
</script>
