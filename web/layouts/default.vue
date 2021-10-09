<i18n lang="yaml">
hu:
  faq: 'Gyakori kérdések'
  homepage: 'Főoldal'
  streams: 'Streamek'
  downloads: 'Letöltések'
  fanarts: 'Fanartok'
  admin: 'Admin'
</i18n>

<template>
  <v-app dark>
    <v-app-bar
      v-if="false"
      :clipped-left="clipped"
      style="height: 60px"
      fixed
      app
      class="bg-gray-800"
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

        no-prefetch
        :to="localePath(item.to)"
      >
        <a
          v-if="item.show"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ $t(item.name) }}
        </a>
      </NuxtLink>
      <v-spacer />
      <NuxtLink
        class="nav-bar-avatar"
        :to="localePath('/profiles/norticus')"
        no-prefetch
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
        no-prefetch
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
        no-prefetch
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
        no-prefetch
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
        :to="localePath('/auth')"
        no-prefetch
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
    <nav-bar :nav-items="navItems" />
    <div v-if="showEngWarn" class="eng-warn">
      <span class="inline"><p>The English version is currently in beta and some features might not be available. We strongly recommend switching to the Hungarian version for now! You can change it in the bottom right corner.</p><a @click="dismissEngWarn">Dismiss</a></span>
    </div>
    <v-main class="bg-gray-900">
      <Nuxt />
    </v-main>
    <notifications-component />
    <v-footer :absolute="!fixed" app color="#1f2937">
      <span>&copy; 2021 | {{ zalname }} |
        <a
          style="color: #fff"
          href="https://github.com/thisisawaik/waik.hu"
          target="_blank"
        >GitHub</a></span>
      <v-spacer />
      <nuxt-link v-if="$i18n.locale !== 'en' " style="color: #fff" :to="switchLocalePath('en')">
        English (Beta)
      </nuxt-link>
      <nuxt-link v-if="$i18n.locale !== 'hu'" style="color: #fff" :to="switchLocalePath('hu')">
        Magyar (Recommended)
      </nuxt-link>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config'
import NotificationsComponent from '../components/NotificationsComponent.vue'
export default Vue.extend({
  components: { NotificationsComponent },
  data () {
    return {
      avatar: null,
      drawer: false,
      group: null,
      clipped: true,
      showEngWarn: false,
      navItems: [
        {
          name: 'homepage',
          to: '/',
          show: true,
          current: true,
        },
        {
          name: 'streams',
          to: '/streams',
          show: false,
          current: false,
        },
        {
          name: 'downloads',
          to: '/downloads',
          show: true,
          current: false,
        },
        {
          name: 'fanarts',
          to: '/fanarts',
          show: true,
          current: false,
        },
        {
          name: 'faq',
          to: '/faq',
          show: true,
          current: false,
        },
        {
          name: 'admin',
          to: '/admin',
          show: false,
          current: false,
        },
      ],
      fixed: false,
      isAdmin: false,
      maintenance: false,
      zalname: 'zal1000#0497',
      show_streams: false,
      isFromPhone: this.$device.isMobileOrTablet,
      wsStatus: 'connecting',
    }
  },
  watch: {
    $route (route) {
      console.log('route changed', route)
      // console.log(route.name.split('_')[0])
      this.checkEngWarn(route)
      this.checkCurrentPage(route)
    },
  },
  async created () {
    const auth = getAuth()
    const db = getFirestore()
    this.checkEngWarn(this.$route)
    onAuthStateChanged(auth, async (user) => {
      // this.user = user
      if (user) {
        this.avatar = user.photoURL
        const token = await user.getIdTokenResult(true)
        if (token.claims.admin) {
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
    const zalref = doc(db, 'dcusers/423925286350880779') // db.collection('dcusers').doc('423925286350880779')
    const zaldoc = await getDoc(zalref)
    this.zalname = zaldoc.data().tag
    if (process.client) {
      this.fetchRemoteConfig()
    }
  },
  methods: {
    checkCurrentPage (route) {
      try {
        this.navItems.forEach((item) => {
          console.log(item.name)
          if (route.name.split('_')[0] === item.name) {
            console.log('fanarts')
            this.navItems.find(e => e.current === true).current = false
            this.navItems.find(e => e.name === item.name).current = true
          }
        })
      } catch (error) {
        console.debug(error)
      }
    },
    dismissEngWarn () {
      if (process.client) {
        console.log('dismissing eng warn')
        localStorage.setItem('engWarnDismissed', true)
        this.checkEngWarn(this.$route)
        this.checkCurrentPage(this.$route)
      }
    },
    checkEngWarn (route) {
      if (process.client) {
        if (route.path.startsWith('/en')) {
          const isDismissed = localStorage.getItem('engWarnDismissed') || false
          if (isDismissed) {
            this.showEngWarn = false
          } else {
            this.showEngWarn = true
          }
        } else {
          this.showEngWarn = false
        }
      }
    },
    async fetchRemoteConfig () {
      try {
        const rc = getRemoteConfig()
        await fetchAndActivate(rc)
        const showWaikStreams = getValue(rc, 'waik_show_streams')
        this.navItems.find((e => e.name === 'streams').show = showWaikStreams.asBoolean() || false)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
  },
})
//                 .
//                .;;:,.
//                 ;iiii;:,.                                   .,:;.
//                 :i;iiiiii:,                            .,:;;iiii.
//                  ;iiiiiiiii;:.                    .,:;;iiiiii;i:
//                   :iiiiiiiiiii:......,,,,,.....,:;iiiiiiiiiiii;
//                    ,iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii:
//                     .:iii;iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii;,
//                       .:;;iiiiiiiiiiiiiiiiiiiiiiiiiii;;ii;,
//                        :iiii;;iiiiiiiiiiiiiii;;iiiiiii;:.
//                       ,iiii;1f:;iiiiiiiiiiii;if;:iiiiiii.
//                      .iiiii:iL..iiiiiiiiiiii;:f: iiiiiiii.
//                      ;iiiiii:.,;iiii;iiiiiiii:..:iiiiiiii:
//                     .i;;;iiiiiiiiii;,,;iiiiiiiiiiii;;iiiii.
//                     ::,,,,:iiiiiiiiiiiiiiiiiiiiii:,,,,:;ii:
//                     ;,,,,,:iiiiiiii;;;;;;;iiiiii;,,,,,,;iii.
//                     ;i;;;;iiiiiiii;:;;;;;:iiiiiii;::::;iiii:
//                     ,iiiiiiiiiiiiii;;;;;;:iiiiiiiiiiiiiiiiii.
//                      .iiiiiiiiiiiiii;;;;;iiiiiiiiiiiiiiiiiii:
//                       .;iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii;
//                        ;iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.
//                       .;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,
</script>

<style lang="scss">
.nav-bar-button {
  margin-right: 15px;
}

.nav-bar-avatar {
  margin-left: 20px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: 10px;
}

.eng-warn {
  p {
    display: inline;
  };
  a {
    display: inline;
    color: white;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 10px
  };
  min-height: 40px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: var(--red);
  text-align: center;
}

:host {
  font-family: roboto;
}
</style>
