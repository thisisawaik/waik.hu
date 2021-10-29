<template src="./index.html" />

<script>
import Vue from 'vue'
import { getAuth, onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
export default Vue.extend({
  async asyncData ({ app, store }) {
    const article = await app.$content('hu/rules', 'fanart').fetch()
    store.commit('setFanartRules', article)
    const infos = await app.$content('hu/infos', 'fanart_comp').fetch()
    store.commit('setFanartInfos', infos)
    return { article }
  },
  data () {
    return {
      tab: 0,
      items: [],
      isAdmin: false,
      auth: getAuth(),
    }
  },
  head () {
    return {
      title: `Waik | ${this.$t('fanarts')}`,
      meta: [
        {
          name: 'og:title',
          content: `Waik | ${this.$t('fanarts')}`,
        },
        {
          name: 'og:description',
          content: 'Itt találhatod meg a waik csapatról készult fanartokat',
        },
        {
          name: 'og:image',
          content:
            'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
    }
  },
  async created () {
    onAuthStateChanged(this.auth, async (user) => {
      // this.user = user
      if (user) {
        const token = await getIdTokenResult(user, true)
        if (token.claims.waikAdmin) {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      } else {
        this.isAdmin = false
      }
    })
    try {
      // eslint-disable-next-line no-constant-condition
      if (process.client) {
        const list = JSON.parse(localStorage.getItem('cache.fanartList'))
        if (list) {
          this.items = list
        }
      }
    } catch (error) {}
    const list = await this.$axios.get('/fanart/list')
    if (list.data !== this.items) {
      let a = []
      a = list.data
      this.items = a
      if (process.client) {
        localStorage.setItem('cache.fanartList', JSON.stringify(a))
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.flexContainer {
    overflow: auto;
}
</style>
