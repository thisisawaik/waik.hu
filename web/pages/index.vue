<template>
  <div>
    <v-flex class="flexContainer">
      <v-container fill-height fluid>
        <div style="margin-top: 30px; padding 10px" />
        <current-evet-card
          v-for="content of currentContent"
          :key="content.title"
          :title="content.title"
          :description="content.description"
          :html="content.html"
          :markdown="content.markdown"
          class="eventCart"
        />
        <past-event-card
          v-for="content of pastContent"
          :key="content.title"
          :title="content.title"
          :description="content.description"
          :html="content.html"
          :markdown="content.markdown"
          class="eventCart"
        />
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import CurrentEvetCard from '../components/CurrentEvetCard.vue'
import PastEventCard from '../components/PastEventCard.vue'

export default {
  components: { CurrentEvetCard, PastEventCard },
  data () {
    return {
      loading: true,
      currentContent: [],
      pastContent: [],
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
    }
  },
  head () {
    return {
      title: `Waik | ${this.$t('homepage')}`,
      meta: [
        {
          name: 'keywords',
          content: 'Waik, Walrusz, Norticus, Isti115, Minecraft',
        },
        {
          name: 'og:title',
          content: `Waik | ${this.$t('homepage')}`,
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
  },
  async created () {
    const db = this.$fire.firestore
    const ref = db.collection('waik/website/content').where('visible', '==', true)
    const docs = await ref.get()
    const current = []
    const past = []
    for (const doc of docs.docs) {
      if (doc.data().when === 'current') { current.push(doc.data()) }
      if (doc.data().when === 'past') { past.push(doc.data()) }
    }
    this.currentContent = current
    this.pastContent = past
    this.loading = false
  },
}
</script>

<style lang="scss" scoped>
.flexContainer {
    overflow: auto;
}

.eventCart {
  margin: 15px;
}
</style>
