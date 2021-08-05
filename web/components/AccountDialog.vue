<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          class="nav-bar-avatar"
          size="40"
          v-on="on"
        >
          <img
            alt="Account"
            :src="
              avatar
                ? avatar
                : 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c'
            "
          >
        </v-avatar>
      </template>

      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Fiók
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
          <v-divider />
          <v-card-text>
            <p class="text-h6 lighten-2">
              Profilkép
            </p>
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
              disabled
              @click="googleLogin()"
            >
              Bejelentkezés discord fiókkal
            </v-btn>
          </v-card-text>
        </div>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="user" color="red" text @click="logOut()">
            Kijelentkezés
          </v-btn>
          <v-btn text @click="dialog = false">
            Bezárás
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      avatar: null,
      user: null,
      googleData: null,
      dcData: null,
      token: null,
      discordLoading: true,
      dcAvatar: null,
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
}
</script>

<style lang="scss" scoped>
</style>
