<template>
  <v-container>
    <current-evet-card />
    <new-post-dialog />
  </v-container>
</template>

<script>
import CurrentEvetCard from '../components/CurrentEvetCard.vue';
import NewPostDialog from '../components/NewPostDialog.vue';

export default {
  components: { CurrentEvetCard, NewPostDialog },
  async asyncData({app}) {
    const db = app.$fire.firestore
    const ref = db.collection('test').doc('test');
    const doc = await ref.get();
    return {
      title: doc.data().title,
      desc: doc.data().desc
    }
    // this.title = doc.data().title
    // this.desc = doc.data().desc
  },
  data() {
    return {
      mde: this.$store.state.mdtest,
      title: 'a',
      desc: 'a',
    }
  },
  head() {
    return {
      title: 'Főoldal | Waik',
      meta: [
        {
          name: "keywords",
          content: "Waik, Walrusz, Norticus, Isti115, Minecraft"
        },
        {
          name: 'og:title',
          content: 'Főoldal | Waik',
        },
        {
          name: 'og:description',
          content: 'A hivatalos waik weboldal',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
    }
  }
}
</script>