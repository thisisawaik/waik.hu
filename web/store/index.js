export const state = () => ({
  fanartRules: null,
  fanartInfos: null,
  mdtest: '# Hello world'
})

export const mutations = {
  setFanartRules (state, rules) {
    state.fanartRules = rules
  },
  setFanartInfos (state, infos) {
    state.fanartInfos = infos
  }
}
