<template>
  <div>
    <p class="text-h6 lighten-2">
      Email
    </p>
    <p>
      Jelenlegi email cím: {{ user.email }}
    </p>
    <p v-if="user.emailVerified" style="color: var(--green);">
      Email cím hitelesítve!
    </p>
    <p v-else-if="sendingEmail" style="color: var(--yellow);">
      Hitelesítő email elküldése...
    </p>
    <p v-else-if="verificationError" style="color: var(--red);">
      Hiba történt! {{ verificationError }}
    </p>
    <p v-else-if="emailSent" style="color: var(--green);">
      Email sikeresen elküldve!
    </p>
    <a v-else style="color: var(--red);" @click="sendVerificationEmail">
      Email cím nincs hitelesítve! Kattitnts ide a hitelesítéshez
    </a>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['user'],
  data () {
    return {
      sendingEmail: false,
      pendingVerification: false,
      emailSent: false,
      verificationError: null
    }
  },
  created () {
    // console.log(this.user)
  },
  methods: {
    sendVerificationEmail () {
      const auth = this.$fire.auth
      if (!this.sendingEmail) {
        this.sendingEmail = true
        auth.currentUser.sendEmailVerification().then(() => {
          this.sendingEmail = false
          this.emailSent = true
        }).catch((e) => {
          console.error(e)
          this.verificationError = e.message
        })
      }
    }
  }
}
</script>
