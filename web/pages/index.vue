<template>
  <v-container>
    <div v-for="content of currentContent" :key="content.title">
      <current-evet-card :title="content.title" :description="content.description" :html="content.html" :markdown="content.markdown" />
    </div>
  </v-container>
</template>

<script>
import CurrentEvetCard from '../components/CurrentEvetCard.vue'

export default {
  components: { CurrentEvetCard },
  async asyncData ({ app }) {
    const db = app.$fire.firestore
    const ref = db.collection('test').doc('test')
    const doc = await ref.get()
    return {
      title: doc.data().title,
      desc: doc.data().desc
    }
    // this.title = doc.data().title
    // this.desc = doc.data().desc
  },
  data () {
    return {
      loading: true,
      currentContent: []
    }
  },
  head () {
    return {
      title: `Waik | ${this.$t('homepage')}`,
      meta: [
        {
          name: 'keywords',
          content: 'Waik, Walrusz, Norticus, Isti115, Minecraft'
        },
        {
          name: 'og:title',
          content: `Waik | ${this.$t('homepage')}`
        },
        {
          name: 'og:description',
          content: 'A hivatalos waik weboldal'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        }
      ]
    }
  },
  async created () {
    const db = this.$fire.firestore
    const ref = db.collection('waik/website/content').where('visible', '==', true)
    const docs = await ref.get()
    const current = []
    for (const doc of docs.docs) {
      if (doc.data().when === 'current') { current.push(doc.data()) }
    }
    this.currentContent = current
    this.loading = false
  }
}
</script>
