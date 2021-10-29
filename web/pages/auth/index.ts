import Vue from 'vue'
import {
  getAuth,
  onAuthStateChanged,
  getIdTokenResult,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  IdTokenResult,
  UserInfo
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Component from 'vue-class-component'

// The @Component decorator indicates the class is a Vue component
@Component
export default class MyComponent extends Vue {
  // Initial data can be declared as instance properties
  auth = getAuth()
  db = getFirestore()
  avatar: string | null = null;
  loading = true
  user: User | null = null
  discordLoading = false
  dcAvatar: string | null = null;
  dcData: any = null;
  googleData: UserInfo | null | undefined;
  token: IdTokenResult | null = null;
  
  declare $i18n: any
  // Component methods can be declared as instance methods

  created () {
    console.log('created')
    onAuthStateChanged(this.auth, async (user) => {
      this.user = user
      if (user) {
        this.googleData = user.providerData.find(
          e => e.providerId === 'google.com',
        )
          ? user.providerData.find(e => e.providerId === 'google.com')
          : null
        console.log(this.googleData)
        this.avatar = user.photoURL
        this.fetchUserData(user.uid)
        this.token = await getIdTokenResult(user, true)
      } else {
        this.avatar = null
      }
      this.loading = false
    })
  }

  asd () {
    console.log('asd')
  }

  head () {
    return {
      title: `Waik | ${this.user ? 'Fiók' : 'Bejelentkezés'}`,
    }
  }

  googleLogin () {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider)
      .then(() => {})
      .catch(() => {})
  }
  discordLogin () {
    location.href = `https://discord.com/api/oauth2/authorize?client_id=827711777495187487&redirect_uri=${window.location.protocol}//${window.location.host}${this.$i18n.locale !== 'hu' ? `/${this.$i18n.locale}` : ''}/auth/discord/callback&response_type=code&scope=identify%20email`
  }

  discordLink () {
    // const token = await this.user.getIdToken()
    // TODO: implement discord link
    location.href = `https://discord.com/api/oauth2/authorize?client_id=827711777495187487&redirect_uri=${window.location.protocol}//${window.location.host}${this.$i18n.locale !== 'hu' ? `/${this.$i18n.locale}` : ''}/auth/discord/callback&response_type=code&scope=identify%20email`
  }
  logOut () {
    signOut(this.auth)
  }
  async fetchUserData (uid: string) {
    this.discordLoading = true
    const ref = doc(this.db, `users/${uid}`) // db.collection('users').doc(uid)
    const res = await getDoc(ref)

    if (res.data()?.dcid) {
      const dcref = doc(this.db, `dcusers/${res.data()?.dcid}`)
      const dcdoc = await getDoc(dcref)
      this.dcData = dcdoc.data() ? dcdoc.data() : null
      this.dcAvatar = dcdoc.data()?.pp ? dcdoc.data()?.pp : null
      this.discordLoading = false
    } else {
      this.dcData = null
      this.discordLoading = false
    }
  }
}

interface GoogleData {
  email: string;
  displayName: string;
  photoURL: string;
  providerId: string;
  phoneNumber: string | null;
  uid: string;
}
/*
export default Vue.extend({
  data () {
    let user: User | null;
    let dcData: any;
    let avatar: string | null = null;
    user = null;
    return {
      auth: getAuth(),
      db: getFirestore(),
      avatar,
      user,
      googleData: '' || null,
      dcData,
      token: '' || null,
      discordLoading: true,
      dcAvatar: '' || null,
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

  },
  methods: {
    googleLogin () {
      const provider = new GoogleAuthProvider()
      signInWithPopup(this.auth, provider)
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
      signOut(this.auth)
    },
    async fetchUserData (uid: string) {
      this.discordLoading = true
      const ref = doc(this.db, `users/${uid}`) // db.collection('users').doc(uid)
      const res = await getDoc(ref)

      if (res.data()?.dcid) {
        const dcref = doc(this.db, `dcusers/${res.data()?.dcid}`)
        const dcdoc = await getDoc(dcref)
        this.dcData = dcdoc.data() ? dcdoc.data() : null
        this.dcAvatar = dcdoc.data()?.pp ? dcdoc.data()?.pp : null
        this.discordLoading = false
      } else {
        this.dcData = null
        this.discordLoading = false
      }
    },
  },
})
*/
