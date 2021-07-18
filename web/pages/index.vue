<template>
  <v-container>
    <current-evet-card />
  </v-container>
</template>

<script>
import CurrentEvetCard from '../components/CurrentEvetCard.vue';

export default {
  components: { CurrentEvetCard },
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
    }
  },
  head() {
    return {
      title: 'Waik | Főoldal',
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