<template>
  <v-card
    outlined
    max-width="390"
    elevation="2"
    style="border-color: var(--red); padding: 8px"
  >
    <h1 v-if="title">
      {{ title }}
    </h1>
    <p v-if="description">
      {{ description }}
    </p>
    <br>
    <div v-if="html" v-html="html" />
    <div v-if="markdown" v-html="$md.render(markdown)" />
  </v-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'description', 'html', 'markdown'],
}
</script>
