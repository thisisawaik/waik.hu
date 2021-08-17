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
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
export default {
  // eslint-disable-next-line vue/require-prop-types
  data () {
    return {
      user: null,
      auth: getAuth(),
      sendingEmail: false,
      pendingVerification: false,
      emailSent: false,
      verificationError: null,
    }
  },
  created () {
    this.user = this.auth.currentUser
    onAuthStateChanged(this.auth, (user) => {
      this.user = user
    })
  },
  methods: {
    sendVerificationEmail () {
      if (!this.sendingEmail) {
        this.sendingEmail = true
        sendEmailVerification(this.auth).then(() => {
          this.sendingEmail = false
          this.emailSent = true
        }).catch((e) => {
          console.error(e)
          this.verificationError = e.message
        })
      }
    },
  },
}
</script>
