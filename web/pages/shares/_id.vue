<template>
  <p>Loading... ({{ id }})</p>
</template>

<script>
/* eslint-disable prefer-const */

export default {
  async asyncData ({ app, params }) {
    const db = app.$fire.firestore
    const storage = app.$fire.storage
    const id = params.id
    const ref = db.collection('waik/website/shares').doc(id)
    const doc = await ref.get()
    let title = doc.data().title
    let desc = doc.data().title
    let image = doc.data().title
    let color = doc.data().title

    if (doc.data().type === 'fanart') {
      const artref = db.collection('waik/website/fanarts').doc(doc.data().id)
      const doc2 = await artref.get()
      // console.log(doc2.data())
      if (doc2.data().getFromGS) {
        const sref = storage.ref(doc2.data().gsURL)
        const url = await sref.getDownloadURL()
        image = url
      } else {
        image = doc2.data().downloadurl
      }
      title = doc2.data().title
      desc = doc2.data().desc
      color = doc2.data().color || '#ffffff'
    }
    return {
      title,
      desc,
      image,
      color,
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
          name: 'og:descriprion',
          content: this.desc
        },
        {
          name: 'descriprion',
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
