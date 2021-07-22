<template>
  <v-container>
    <div style="margin-top: 30px; padding 10px" />
    <download-card v-for="item in items" :id="item.id" :key="item.id" />
  </v-container>
</template>

<script>
import DownloadCard from '../components/DownloadCard.vue'

export default {
  components: {
    DownloadCard
  },
  data () {
    return {
      items: []
    }
  },
  head () {
    return {
      title: 'Waik | Letoltések',
      meta: [
        {
          name: 'og:title',
          content: 'Waik | Letoltések'
        },
        {
          name: 'og:description',
          content:
            'Itt találhatod meg a waik csapattal kapcsolatos letoltheto dolgokat'
        },
        {
          name: 'og:image',
          content:
            'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2'
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
    const query = db
      .collection('waik/website/downloads')
      .where('visible', '==', true)
      .orderBy('timestamp')
    const queryres = await query.get()
    let a = []
    a = queryres.docs
    this.items = a.reverse()
  }
}
</script>
