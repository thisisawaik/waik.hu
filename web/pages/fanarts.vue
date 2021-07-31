<template>
  <v-card>
    <v-tabs v-model="tab" fixed-tabs flat background-color="primary" dark>
      <v-tab>{{ $t('fanarts') }}</v-tab>
      <v-tab>{{ $t('upload') }}</v-tab>
      <v-tab v-if="isAdmin">
        Admin
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tabs-item v-if="tab === 0">
        <v-flex class="flexContainer">
          <v-container fill-height fluid>
            <div style="margin-top: 30px; padding 10px" />
            <fan-art-card v-for="i in items" :id="i.id" :key="i.id" />
          </v-container>
        </v-flex>
      </v-tabs-item>
      <v-tabs-item v-else-if="tab === 1">
        <v-container>
          <fan-art-upload />
        </v-container>
      </v-tabs-item>
      <v-tabs-item v-else-if="tab === 2">
        <v-container>
          <fan-art-admin />
        </v-container>
      </v-tabs-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import FanArtAdmin from '../components/FanArtAdmin.vue'
import FanArtCard from '../components/FanArtCard.vue'
import FanArtUpload from '../components/FanArtUpload.vue'

export default {
  components: {
    FanArtCard,
    FanArtUpload,
    FanArtAdmin
  },
  async asyncData ({ $content, store }) {
    const article = await $content('hu/rules', 'fanart').fetch()
    store.commit('setFanartRules', article)
    const infos = await $content('hu/infos', 'fanart_comp').fetch()
    store.commit('setFanartInfos', infos)
    return { article }
  },
  data () {
    return {
      tab: 0,
      items: [],
      isAdmin: false
    }
  },
  head () {
    return {
      title: `Waik | ${this.$t('fanarts')}`,
      meta: [
        {
          name: 'og:title',
          content: `Waik | ${this.$t('fanarts')}`
        },
        {
          name: 'og:description',
          content: 'Itt találhatod meg a waik csapatról készult fanartokat'
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
    const auth = this.$fire.auth
    auth.onAuthStateChanged(async (user) => {
      // this.user = user
      if (user) {
        const token = await user.getIdTokenResult(true)
        if (token.claims.waikAdmin) {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      } else {
        this.isAdmin = false
      }
    })
    const db = this.$fire.firestore
    const query = db
      .collection('waik/website/fanarts')
      .where('status', '==', 'PUBLIC')
    const queryres = await query.get()
    let a = []
    a = queryres.docs
    this.items = a
  }
}
</script>

<style lang="scss" scoped>
.flexContainer {
    overflow: auto;
}
</style>
