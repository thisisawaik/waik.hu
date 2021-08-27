export const state = () => ({
  fanartRules: null,
  fanartInfos: null,
  email: {
    status: null,
    error: null,
  },
  discord: {
    isLinking: false,
    uid: null,
  },
  ws: {
    status: 'connecting',
    color: 'yellow',
  },
})

export const mutations = {
  setFanartRules (state, rules) {
    state.fanartRules = rules
  },
  setFanartInfos (state, infos) {
    state.fanartInfos = infos
  },
  setAuthEmailStatus (state, status) {
    state.email.status = status
  },
  setAuthEmailError (state, error) {
    state.email.status = error
  },
  setAuthDiscordLinkStatus (state, status) {
    state.discord.isLinking = status
  },
  setAuthDiscordUid (state, uid) {
    state.discord.uid = uid
  },
  changeWsStatus (state, status) {
    state.ws.status = status
    if (status === 'connected') {
      state.ws.color = 'green'
    } else if (status === 'error' || status === 'disconnected') {
      state.ws.color = 'red'
    } else {
      state.ws.color = 'yellow'
    }
  },
}
