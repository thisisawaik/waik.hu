<template>
  <div class="background">
    <div class="split left">
      <div class="centered">
        <v-card :loading="loading" width="450">
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            />
          </template>
          <v-card-title class="text-h5 lighten-2">
            {{ user ? 'Fiók' : 'Bejelentkezés' }}
          </v-card-title>
          <v-divider />
          <div v-if="user">
            <v-card-text>
              <p class="text-h6 lighten-2">
                Google
              </p>
            </v-card-text>
            <v-card-text>
              <div v-if="googleData">
                <span><v-avatar v-if="googleData.photoURL"><img :src="googleData.photoURL" alt="Accont"></v-avatar>Google fiók összekötve a {{ googleData.email }} fiókkal</span>
              </div>
            </v-card-text>

            <v-divider />
            <v-card-text>
              <p class="text-h6 lighten-2">
                Discord
              </p>
              <v-progress-linear
                v-if="discordLoading"
                indeterminate
                color="primary"
              />
            </v-card-text>
            <div v-if="dcData">
              <v-card-text>
                <span><v-avatar v-if="dcAvatar"><img :src="dcAvatar"></v-avatar>
                  Discord fiók összekapcsolva {{ dcData.tag }} fiókkal</span>
              </v-card-text>
            </div>
            <div v-else>
              <p style="text-decoration: underline; cursor: pointer;" @click="discordLink()">
                Kattints ide a discord fiókod összekapcsolásához
              </p>
            </div>
            <v-divider />
            <v-card-text>
              <account-email :user="user" />
            </v-card-text>
          </div>

          <div v-else>
            <v-divider />
            <v-card-text>
              <v-btn
                elevation="2"
                @click="googleLogin()"
              >
                Bejelentkezés google fiókkal
              </v-btn><br><br>
              <v-btn
                elevation="2"
                @click="discordLogin()"
              >
                Bejelentkezés discord fiókkal
              </v-btn>
            </v-card-text>
          </div>

          <v-divider v-if="user" />

          <v-card-actions>
            <v-btn text color="blue" @click="testToken">
              Token test
            </v-btn>
            <v-spacer />
            <v-btn v-if="user" color="red" text @click="logOut()">
              Kijelentkezés
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div class="split right" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      avatar: null,
      user: null,
      googleData: null,
      dcData: null,
      token: null,
      discordLoading: true,
      dcAvatar: null,
      loading: true,
      dcurl: 'https://discord.com/api/oauth2/authorize?client_id=737849483194269818&redirect_uri=https%3A%2F%2Fdev.waik.hu%2Flogin&response_type=code&scope=identify%20email',
    }
  },
  head () {
    return {
      title: `Waik | ${this.user ? 'Fiók' : 'Bejelentkezés'}`,
    }
  },
  created () {
    const auth = this.$fire.auth
    auth.onAuthStateChanged(async (user) => {
      this.user = user
      if (user) {
        this.googleData = user.providerData.find(
          e => e.providerId === 'google.com',
        )
          ? user.providerData.find(e => e.providerId === 'google.com')
          : null
        this.avatar = user.photoURL
        this.fetchUserData(user.uid)
        this.token = await user.getIdTokenResult(true)
      } else {
        this.avatar = null
      }
      this.loading = false
    })
  },
  methods: {
    googleLogin () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth
        .signInWithPopup(provider)
        .then(() => {})
        .catch(() => {})
    },
    discordLogin () {
      location.href = `https://discord.com/api/oauth2/authorize?client_id=827711777495187487&redirect_uri=${window.location.protocol}//${window.location.host}${this.$i18n.locale !== 'hu' ? `/${this.$i18n.locale}` : ''}/auth/discord/callback&response_type=code&scope=identify%20email`
    },
    testToken () {
      location.href = 'about:neterror?e=corruptedContentErrorv2&u=https%3A//google.com&c=UTF-8&d=The site at http%3A//localhost%3A3000/fanarts has experienced a network protocol violation that cannot be repaired.'
    },
    discordLink () {
      // const token = await this.user.getIdToken()
      // TODO: implement discord link
      location.href = `https://discord.com/api/oauth2/authorize?client_id=827711777495187487&redirect_uri=${window.location.protocol}//${window.location.host}${this.$i18n.locale !== 'hu' ? `/${this.$i18n.locale}` : ''}/auth/discord/callback&response_type=code&scope=identify%20email`
    },
    logOut () {
      this.$fire.auth.signOut()
    },
    async fetchUserData (uid) {
      this.discordLoading = true
      const db = this.$fire.firestore
      const ref = db.collection('users').doc(uid)
      const doc = await ref.get()

      if (doc.data().dcid) {
        const dcref = db.collection('dcusers').doc(doc.data().dcid)
        const dcdoc = await dcref.get()
        this.dcData = dcdoc.data() ? dcdoc.data() : null
        this.dcAvatar = dcdoc.data().pp ? dcdoc.data().pp : null
        this.discordLoading = false
      } else {
        this.dcData = null
        this.discordLoading = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.background {
  background-image: url(https://media.discordapp.net/attachments/603942574054440961/855965324637110292/1.png?width=1193&height=671);
  background-position: center;
  background-size: cover;
  height: calc(100vh - 100px);
}

.split {
  height: calc(100vh - 100px);
  width: 50%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
}

/* Control the right side */
.right {
  right: 0;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
