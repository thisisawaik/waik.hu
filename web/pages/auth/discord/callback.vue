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
            Bejelentkezés fojamatban! Kérem várjon!
          </v-card-title>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" text @click="cancel()">
              Megszakítás
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div class="split right" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: null,
      loading: true,
      canceled: false
    }
  },
  head () {
    return {
      title: `Waik | ${this.user ? 'Fiók' : 'Bejelentkezés'}`
    }
  },
  created () {
    this.canceled = false
    if (this.$nuxt.$route.query.code && !process.server) {
      console.log(`dc token found: ${this.$nuxt.$route.query.code}`)
      this.discordLogin(this.$nuxt.$route.query.code)
    }
  },
  methods: {
    async discordLogin (token) {
      console.log('progress bar true')
      const functions = this.$fire.functions
      const path = window.location.href.split('?')[0]
      this.$router.replace({ query: null })
      console.log('query nulled')
      // console.log(path)
      console.log('sending login request')
      await functions.httpsCallable('waikDcLogin')({
        token,
        source: path
      }).then(async (res) => {
        console.log('login request success')
        await this.$fire.auth.signInWithCustomToken(res.data.token).then((user) => {
          console.log('login success with token: ', res.data.token)
          console.log('user: ', user.uid)
          if (!this.canceled) {
            this.$router.push('/auth')
          }
        })
      })
    },
    cancel () {
      this.canceled = true
      this.$router.push('/auth')
    }
  }
}
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
