export const state = () => ({
  fanartRules: null,
  fanartInfos: null,
  email: {
    status: null,
    error: null
  }

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
  }
}
