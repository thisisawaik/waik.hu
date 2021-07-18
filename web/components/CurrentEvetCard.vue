<template>
  <v-card max-width="374" elevation="2">
    <div  v-html="$md.render(model)"></div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      model: this.$store.state.mdtest,
    }
  },
}
</script>