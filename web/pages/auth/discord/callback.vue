<i18n lang="yaml">
hu:
  login_in_progress: "Bejelentkezés folyamatban! Kérem várjon!"
  cancel: "Megszakítás"
en:
  login_in_progress: "Login in progress! Please wait!"
  cancel: "Cancel"
</i18n>

<template>
  <div class="background">
    <div class="split left">
      <div class="centered">
        <v-card :loading="loading" width="500">
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            />
          </template>
          <v-card-title class="text-h5 lighten-2">
            {{ $t('login_in_progress') }}
          </v-card-title>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="cancel()">
              {{ $t('cancel') }}
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
      token: null,
      loading: true,
      canceled: false,
      error: null,
    }
  },
  head () {
    return {
      title: `Waik | ${this.user ? 'Fiók' : 'Bejelentkezés'}`,
    }
  },
  created () {
    this.canceled = false
    if (this.$nuxt.$route.query.code && process.client) {
      this.discordLogin(this.$nuxt.$route.query.code)
    }
  },
  methods: {
    discordLogin () {
      // const functions = this.$fire.functions
      const source = window.location.href.split('?')[0]
      this.$router.replace({ query: null })
      // TODO: fix this
      this.$axios.post(`/discord/auth/login?token=${this.$nuxt.$route.query.code}&source=${source}`, {
        token: this.$nuxt.$route.query.code,
        source,
      }).then(async (resp) => {
        await this.$fire.auth.signInWithCustomToken(resp.data.token).then(() => {
          if (!this.canceled) {
            this.$router.push('/auth')
          }
        })
      })
      /*
      this.$mainSocket.once('connect', () => {
        console.log('connected')
        setTimeout(async () => {
          console.log('sending-dcdata')
          try {
            this.user.getIdToken().then((token) => {
              socket.emit('discordLink', {
                token,
              })
            })
          } catch (error) {
            socket.emit('discordLogin', {
              token,
              source,
            })
            const discordLoginP = new Promise((resolve, reject) => {
              socket.once('discordLoginSuccess', (data) => {
                resolve(data)
              })
              socket.once('discordLoginError', (data) => {
                reject(data)
              })
            })
            await discordLoginP.then(async (data) => {
              await this.$fire.auth.signInWithCustomToken(data.token).then(() => {
                if (!this.canceled) {
                  this.$router.push('/auth')
                }
              })
            })
          }
        }, 2000)
      })
      */
      /*
      if (localStorage.getItem('authDiscordLinkStatus')) {

        await functions.httpsCallable('waikDcLink')({
          token,
          source: path,
          uid: localStorage.getItem('authDiscordUid') || null
        // eslint-disable-next-line require-await
        }).then(async () => {
          localStorage.setItem('authDiscordLinkStatus', false)
          localStorage.setItem('authDiscordUid', null)
          this.$router.push('/auth')
        }).catch((e) => {
          console.error(e)
          localStorage.setItem('authDiscordLinkStatus', false)
          localStorage.setItem('authDiscordUid', null)
          this.error = e
        })
      } else {
        await functions.httpsCallable('waikDcLogin')({
          token,
          source: path
        }).then(async (res) => {
          await this.$fire.auth.signInWithCustomToken(res.data.token).then(() => {
            if (!this.canceled) {
              this.$router.push('/auth')
            }
          })
        })
      }
      */
    },
    cancel () {
      this.canceled = true
      this.$router.push('/auth')
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
