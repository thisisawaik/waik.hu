export const state = () => ({
  fanartRules: null,
  mdtest: '# Hello world'
})

export const mutations = {
  setFanartRules (state, rules) {
    state.fanartRules = rules
  }
}
