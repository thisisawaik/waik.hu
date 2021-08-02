/* eslint-disable no-console */

export default ({ app, store }, inject) => {
  let socket = app.$nuxtSocket({
    channel: '/',
    reconnection: true
  })

  function reconnect (t) {
    const time = t || 3000
    let connected = false
    socket = null
    socket = app.$nuxtSocket({
      channel: '/',
      reconnection: true
    })
    socket.once('connect', () => {
      console.log('reconnected')
      store.commit('changeWsStatus', 'connected')
      connected = true
    })

    setTimeout(() => {
      if (!connected) {
        reconnect()
      }
    }, time)
  }

  const auth = app.$fire.auth

  socket.on('disconnect', (reason) => {
    console.log('disconnected', reason)
    store.commit('changeWsStatus', 'disconnected')
    if (reason === 'transport error') {
      console.log('asd')
      reconnect()
    }
  })

  socket.on('connect', () => {
    console.log('connected')
    store.commit('changeWsStatus', 'connected')
  })

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken(true)
      socket.emit('userStateUpdate', token)
    } else {
      socket.emit('userStateUpdate', null)
    }
  })

  inject('mainSocket', socket)
}
