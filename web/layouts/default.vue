<template>
  <v-app dark>
    <v-app-bar
      v-if="!maintenance"
      :clipped-left="clipped"
      style="height: 60px"
      fixed
      app
      color="primary"
    >
      <NuxtLink
        class="nav-bar-button"
        to="/"
      >
        <img
          width="40"
          alt="Waik Logo"
          src="~/assets/waik_big_icon.png"
          style="cursor: pointer"
        >
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        to="/"
      >
        <v-btn color="primary" depressed>
          Főoldal
        </v-btn>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        to="/streams"
      >
        <v-btn color="primary" depressed>
          Streamek
        </v-btn>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        to="/downloads"
      >
        <v-btn color="primary" depressed>
          Letöltések
        </v-btn>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        to="/fanarts"
      >
        <v-btn color="primary" depressed>
          Fanartok
        </v-btn>
      </NuxtLink>
      <NuxtLink
        v-if="isAdmin"
        class="nav-bar-button"
        to="/admin"
      >
        <v-btn color="primary" depressed>
          Admin
        </v-btn>
      </NuxtLink>
      <v-spacer />
      <NuxtLink
        class="nav-bar-avatar"
        to="/profiles/norticus"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/norticus.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        to="/profiles/walrusz"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/walrusz.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        to="/profiles/isti"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/isti.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        to="/profiles/geiszla"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/geiszla.webp">
        </v-avatar>
      </NuxtLink>
      <v-divider class="nav-bar-avatar" vertical />
      <account-dialog />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; 2021 | {{ zalname }} |
        <a
          style="color: #fff"
          href="https://github.com/thisisawaik/waik.hu"
          target="_blank"
        >GitHub</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const db = app.$fire.firestore
    const zalref = db.collection('dcusers').doc('423925286350880779')
    const zaldoc = await zalref.get()
    return {
      zalname: zaldoc.data().tag
    }
  },
  data () {
    return {
      avatar: null,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      isAdmin: false,
      maintenance: false,
      zalname: 'zal1000#1001'
    }
  },
  watch: {
    $route () {
      // console.log('route changed', this.$route.path)
      if (this.$route.path === '/maintenance') {
        this.maintenance = true
      } else {
        this.maintenance = false
      }
    }
  },
  async created () {
    if (this.$nuxt.$route.path === '/maintenance') {
      this.maintenance = true
    }
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
    const zalref = db.collection('dcusers').doc('423925286350880779')
    const zaldoc = await zalref.get()
    this.zalname = zaldoc.data().tag
  }
}
</script>

<style>
.nav-bar-button {
  margin-right: 15px;
}

.nav-bar-avatar {
  margin-left: 20px;
}

:host {
  font-family: roboto;
}
</style>
