import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAnalytics, setUserId } from 'firebase/analytics'
const asd = async (context, inject) => {
  const app = initializeApp({
    apiKey: 'AIzaSyApGQEdqVHknPeq7FBR3ZlFSXzOWeOXxvk',
    authDomain: 'waik-main-adc8f.firebaseapp.com',
    databaseURL: 'https://waik-main-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'waik-main',
    storageBucket: 'waik-main.appspot.com',
    messagingSenderId: '473640548210',
    appId: '1:473640548210:web:ceb07d28f682005b8b8feb',
    measurementId: 'G-EMXCZC46E7',
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
