const api = async (context, inject) => {
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
  })

  const refreshToken = async () => {
    const token = await auth.currentUser.getIdToken(true)
    context.$axios.setHeader('Auth-Token', token)
  }

  setTimeout(() => {
    refreshToken()
  }, 600000)
  inject('$refreshAuthToken', refreshToken)
  // inject('api', api);
}

export default api
