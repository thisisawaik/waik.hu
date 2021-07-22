<template>
  <p>Loading... ({{ id }})</p>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const db = app.$fire.firestore
    const id = params.id
    const ref = db.collection('waik/website/shares').doc(id)
    const doc = await ref.get()
    return {
      title: doc.data().title,
      desc: doc.data().desc,
      image: doc.data().image,
      color: doc.data().color,
      id: params.id
    }
  },
  data () {
    return {
      id: 'Loading...',
      title: 'Loading...',
      desc: 'loading...',
      image: 'Loading...',
      color: 'Loading...'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          name: 'og:title',
          content: this.title
        },
        {
          name: 'og:desc',
          content: this.desc
        },
        {
          name: 'og:image',
          content: this.image
        },
        {
          name: 'theme-color',
          content: this.color
        },
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
