<template lang="pug">
  div
    v-flex(class="flexContainer")
      v-container(fill-height fluid)
        div(style="margin-top: 30px; padding 10px")
        div(v-for="content of allContent" :key="content.title")
          CurrentEventCard(
            v-if="content.when === 'current'"
            :title="content.title"
            :description="content.description"
            :html="content.html"
            :markdown="content.markdown"
            class="eventCart"
          )
          PastEventCard(
            v-else-if="content.when === 'past'"
            :title="content.title"
            :description="content.description"
            :html="content.html"
            :markdown="content.markdown"
            class="eventCart"
          )
          NeutralEventCard(
            v-else
            :title="content.title"
            :description="content.description"
            :html="content.html"
            :markdown="content.markdown"
            class="eventCart"
          )
</template>

<script>
import Vue from 'vue'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

export default Vue.extend({
  data () {
    return {
      loading: true,
      currentContent: [],
      pastContent: [],
      neutralContent: [],
      allContent: [],
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000,
      db: getFirestore(),
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
    const ref = query(collection(this.db, 'waik/website/content'), where('visible', '==', true)) // db.collection('waik/website/content').where('visible', '==', true)
    const docs = await getDocs(ref)
    const current = []
    const past = []
    const neutral = []
    const all = []
    for (const doc of docs.docs) {
      all.push(doc.data())
      if (doc.data().when === 'current') { current.push(doc.data()) } else if (doc.data().when === 'past') { past.push(doc.data()) } else { neutral.push(doc.data()) }
    }
    this.currentContent = current
    this.pastContent = past
    this.neutralContent = neutral
    this.allContent = all
    this.loading = false
  },
})
</script>

<style lang="scss" scoped>
.flexContainer {
    overflow: auto;
}

.eventCart {
  margin: 15px;
}
</style>
