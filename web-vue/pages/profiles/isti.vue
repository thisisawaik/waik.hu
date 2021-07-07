<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="white--text mt-8">
        <v-avatar size="56"> <img alt="user" :src="imageurl" /></v-avatar>

        <v-card-title>{{ name }}</v-card-title>
      </v-card-title>

      <v-card-text>
        <div>
          {{ desc }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: 'Isti',
      imageurl:
        'https://cdn.discordapp.com/avatars/174980450543075330/68bd161e38aaaff31a57ed05bf4ea971.webp',
      dctag: 'Norticus36#7832',
      color: '#a1f0f5',
      desc: `Sziasztok! :) Isti115 vagyok, a WAIK csapat tagja, jelenleg PhD hallgató az ELTE Informatikai Karán. Nagyon szeretek megérteni és elmagyarázni dolgokat, úgyhogy nyugodtan kérdezzetek, igyekszem minél jobban válaszolni! ;)`,
      loading: false,
    }
  },
  head() {
    return {
      title: `Waik | ${this.name}`,
      meta: [
        {
          name: 'og:title',
          content: `Waik | ${this.name}`,
        },
        {
          name: 'description',
          content: this.desc,
        },
        {
          name: 'og:description',
          content: this.desc,
        },
        {
          name: 'og:image',
          content: this.imageurl,
        },
        {
          name: 'theme-color',
          content: this.color,
        },
      ],
    }
  },
}
</script>

<style>
</style>