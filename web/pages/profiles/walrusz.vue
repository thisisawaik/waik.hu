<template>
  <div>
    <social-bar user="walrusz"></social-bar>
    <description-card style="margin-top: 30px;" :desc="desc" :imageurl="imageurl" :name="name"></description-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Walrusz',
      imageurl:
        'https://cdn.discordapp.com/avatars/183302720030113792/4fecad104687bc2c889bda7043276a6c.webp',
      dctag: 'Walrusz#1019',
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