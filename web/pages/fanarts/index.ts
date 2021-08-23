import { getAuth, getIdTokenResult, onAuthStateChanged } from 'firebase/auth'
import Vue from 'vue'
import Component from 'vue-class-component'

Component.registerHooks([
  'asyncData',
])

@Component({
  head: {
    title: 'Waik | Fanartok',
    meta: [
      {
        name: 'og:title',
        content: 'Waik | Fanartok',
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
  },
  async asyncData ({ app, store }) {
    const article = await app.$content('hu/rules', 'fanart').fetch()
    store.commit('setFanartRules', article)
    const infos = await app.$content('hu/infos', 'fanart_comp').fetch()
    store.commit('setFanartInfos', infos)
  },
})
export default class FanartsPage extends Vue {
    tab = 0;
    items = []
    isAdmin = false;
    auth = getAuth()

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
          const clist = localStorage.getItem('cache.fanartList')
          if (typeof clist === 'string') {
            const list = JSON.parse(clist)
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
    }
}
