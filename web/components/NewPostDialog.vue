<template>
  <div>
    <MarkdownEditor v-model="markdown" />
  </div>
</template>

<script>
import MarkdownEditor from '@voraciousdev/vue-markdown-editor'

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      markdown: this.$store.state.mde
    }
  },
}

</script>

<style>

</style>