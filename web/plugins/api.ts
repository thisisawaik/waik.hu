import { Plugin } from '@nuxt/types';

const api: Plugin = async (context, inject) => {
  const auth = context.$fire.auth
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken(true)
      context.$axios.setHeader('Auth-Token', token)
    } else {
      context.$axios.setHeader('Auth-Token', 'unauthenticated')
    }
  })
  await context.$axios.get('/warmup').then(() => {
    console.log('API warmup complete')
  }).catch((error) => {
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

export default api
