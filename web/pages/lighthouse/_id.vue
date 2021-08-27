<template>
  <iframe :srcdoc="doc" />
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      doc: '<p>Loading...</p>',
    }
  },
  async created () {
    try {
      const file = this.$route.params.id
      const doc = await this.$axios(`/lighthouse/${file.endsWith('.html') ? file : `${file}.html`}`)
      this.doc = doc.data
    } catch (error) {
      this.doc = `<p>${error.message}</p>`
    }
  },
})
</script>

<style lang="scss" scoped>
iframe {
  width: 100vw;
  height: calc(100vh - 135px);
  border: 0;
  overflow: hidden;
}
</style>
