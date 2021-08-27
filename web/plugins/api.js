import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAnalytics, setUserId } from 'firebase/analytics'
const asd = async (context, inject) => {
  const app = initializeApp({
    apiKey: 'AIzaSyBmRS5Yy-1ktWXNsYjk9mQ8Rs9RhmQy600',
    authDomain: 'auth.zal1000.com',
    databaseURL: 'https://waik.europe-west1.firebasedatabase.app',
    projectId: 'zal1000',
    storageBucket: 'zal1000.net',
    messagingSenderId: '512279358183',
    appId: '1:512279358183:web:1a091779e0474dba541042',
    measurementId: 'G-W3EFDHYNN1',
  })
  if (process.client) {
    const appcheck = initializeAppCheck(app, {
      isTokenAutoRefreshEnabled: true,
      provider: new ReCaptchaV3Provider(
        '6Lf1PyQbAAAAAD279wMtnMCNlXXh2K-FvRl6vU1B',
      ),
    })

    inject('appCheck', appcheck)
  }
  const auth = getAuth()
  context.$axios.setHeader('api-key', 'waik_public')
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken(true)
      context.$axios.setHeader('Auth-Token', token)
      setUserId(getAnalytics(), user.uid)
    } else {
      context.$axios.setHeader('Auth-Token', 'unauthenticated')
    }
  })
  await context.$axios
    .get('/warmup')
    .then(() => {
      console.log('API warmup complete')
    })
    .catch((error) => {
      console.error('API warmup failed', error)
    })

  const refreshToken = async () => {
    if (auth.currentUser) {
      console.log('Refreshing token')
      const token = await auth.currentUser.getIdToken(true)
      context.$axios.setHeader('Auth-Token', token)
      console.log('Token refreshed')
    }
  }

  setTimeout(() => {
    refreshToken()
  }, 1000 * 60 * 10)
  inject('$refreshAuthToken', refreshToken)
  // inject('api', api);
}

export default asd
