<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
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
      name: 'Norticus',
      imageurl:
        'https://cdn.discordapp.com/avatars/118466559738904576/6b4610199259efab8493cafb3e049938.webp',
      dctag: 'Norticus36#7832',
      color: '#278003',
      desc: 'Sziasztok! Norticus (Todi) vagyok, főként számítógépes játékokkal és az informatikával foglalkozom. Néha talán túlságosan is versengő vagyok a mentális jólétemnek. Ha játékokról vagy animékről van szó, szívesen elbeszélgetek róluk. Jelenleg informatikushallgató vagyok, de igyekszem időt szánni magamra és a streamelésre is. A waik csapat egyik alapító tagja vagyok (fun fact, az eredeti waik figurához egyedül én nem rajzoltam hozzá, mire odaértem már véglegesítve lett), a szervereket amin a csapat játszik legtöbbször én hosztolom. Igyekszem élőben is közvetíteni a történéseket, ha új sorozat készül éppen, akkor én (és néha Isti) streameljük élőben, de szoktam egyedül is streamelni, akár angolul is.',
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