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
      name: 'Walrusz',
      imageurl:
        'https://yt3.ggpht.com/ytc/AAUvwniseLALwR5fmrqhrt2YDGgh1VJSCviENV2MkukhUg=s68-c-k-c0x00ffffff-no-rj',
      dctag: 'Norticus36#1019',
      color: '#7f5b26',
      desc: `Üdvözöllek! Walrusz vagyok és úgy hiszem, bármiről lehet érdekes, kreatív és szórakoztató videót készíteni, hogyha az ember elegendő munkát fektet bele. Mesterségem elsősorban a szórakoztató ismeretterjesztő tartalmak gyártása, de emellett sok más mindent is találhatsz a csatornámon. Szeretek nagy hangsúlyt fektetni a videók vágására, az utómunkára és hiszek abban, hogy a minőségi szórakoztatás kulcsa a kreativitásban rejlik. Bátran nézz szét a csatornámon, háthatalálsz valamit, ami tetszik :)`,
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