<template>
  <div>
    <social-bar user="isti"></social-bar>
    <description-card style="margin-top: 30px;" :desc="desc" :imageurl="imageurl" :name="name"></description-card>
  </div>
</template>

<script>
import DescriptionCard from '../../components/DescriptionCard.vue'
import SocialBar from '../../components/SocialBar.vue'
export default {
  components: { SocialBar, DescriptionCard },
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