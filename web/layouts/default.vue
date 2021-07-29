<template>
  <v-app dark>
    <v-app-bar
      v-if="!maintenance && !isFromPhone"
      :clipped-left="clipped"
      style="height: 60px"
      fixed
      app
      color="primary"
    >
      <NuxtLink
        class="nav-bar-button"
        :to="localePath('/')"
      >
        <img
          width="40"
          alt="Waik Logo"
          src="~/assets/waik_big_icon.png"
          style="cursor: pointer"
        >
      </NuxtLink>
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        class="nav-bar-button"
        :to="localePath(item.to)"
      >
        <v-btn v-if="item.show" color="primary" depressed>
          {{ $t(item.name) }}
        </v-btn>
      </NuxtLink>
      <!--
      <NuxtLink
        v-if="show_streams"
        class="nav-bar-button"
        :to="localePath('/streams')"
      >
        <v-btn color="primary" depressed>
          {{ $t('streams') }}
        </v-btn>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        :to="localePath('/downloads')"
      >
        <v-btn color="primary" depressed>
          {{ $t('downloads') }}
        </v-btn>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-button"
        :to="localePath('/fanarts')"
      >
        <v-btn color="primary" depressed>
          {{ $t('fanarts') }}
        </v-btn>
      </NuxtLink>
      <NuxtLink
        v-if="isAdmin"
        class="nav-bar-button"
        :to="localePath('/admin')"
      >
        <v-btn color="primary" depressed>
          Admin
        </v-btn>
      </NuxtLink>
      -->
      <v-spacer />
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/profiles/norticus')"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/norticus.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/profiles/walrusz')"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/walrusz.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/profiles/isti')"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/isti.webp">
        </v-avatar>
      </NuxtLink>
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/profiles/geiszla')"
      >
        <v-avatar
          size="40"
        >
          <img height="40" src="~/assets/avatars/geiszla.webp">
        </v-avatar>
      </NuxtLink>
      <v-divider class="nav-bar-avatar" vertical />
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/login')"
      >
        <v-avatar
          size="40"
        >
          <img
            height="40"
            :src="
              avatar
                ? avatar
                : 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c'
            "
          >
        </v-avatar>
      </NuxtLink>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
      <v-spacer />
      <nuxt-link v-if="$i18n.locale !== 'en' " style="color: #fff" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-if="$i18n.locale !== 'hu'" style="color: #fff" :to="switchLocalePath('hu')">
        Magyar
      </nuxt-link>
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
      drawer: false,
      group: null,
      clipped: true,
      navItems: [
        {
          name: 'homepage',
          to: '/',
          show: true
        },
        {
          name: 'streams',
          to: '/streams',
          show: false
        },
        {
          name: 'downloads',
          to: '/downloads',
          show: true
        },
        {
          name: 'fanarts',
          to: '/fanarts',
          show: true
        },
        {
          name: 'admin',
          to: '/admin',
          show: false
        }
      ],
      fixed: false,
      isAdmin: false,
      maintenance: false,
      zalname: 'zal1000#0497',
      show_streams: false,
      isFromPhone: this.$device.isMobileOrTablet
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
    // this.fetchRemoteConfig()
    const auth = this.$fire.auth
    auth.onAuthStateChanged(async (user) => {
      // this.user = user
      if (user) {
        this.avatar = user.photoURL
        const token = await user.getIdTokenResult(true)
        if (token.claims.waikAdmin) {
          this.isAdmin = true
          this.navItems.find(e => e.name === 'admin').show = true
        } else {
          this.isAdmin = false
          this.navItems.find(e => e.name === 'admin').show = false
        }
      } else {
        this.isAdmin = false
        this.avatar = null
        this.navItems.find(e => e.name === 'admin').show = false
      }
    })
    const db = this.$fire.firestore
    const zalref = db.collection('dcusers').doc('423925286350880779')
    const zaldoc = await zalref.get()
    this.zalname = zaldoc.data().tag
    if (process.client) {
      this.fetchRemoteConfig()
    }
  },
  methods: {
    async fetchRemoteConfig () {
      try {
        const remoteConfig = this.$fire.remoteConfig
        await remoteConfig.fetchAndActivate()
        const exampleMessage = await remoteConfig.getValue('waik_show_streams')
        this.navItems.find(e => e.name === 'streams').show = exampleMessage._value.show || false
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
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
