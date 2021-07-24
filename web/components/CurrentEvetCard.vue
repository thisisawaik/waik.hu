<template>
  <v-card max-width="374" elevation="2">
    <nuxt-content v-if="article" class="document" :document="article" />

    <div v-html="$md.render(model)" />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      model: this.$store.state.mdtest,
      article: null
    }
  },
  async created () {
    const article = await this.$content('hu/rules', 'fanart').fetch()
    this.article = article
  }
}
</script>
