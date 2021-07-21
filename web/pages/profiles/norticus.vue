
<template>
  <div>
    <social-bar :profile="profile"></social-bar>
    <description-card style="margin-top: 30px;" :profile="profile"></description-card>
  </div>
</template>

<script>
import SocialBar from '../../components/SocialBar.vue'
import DescriptionCard from '../../components/DescriptionCard.vue'
export default {
  components: { SocialBar, DescriptionCard },
  async asyncData({ $content }) {
    const profile = await $content('profiles', 'norticus').fetch()
    console.log(profile.body)
    return { profile }
  },
  data() {
    return {
      desc: 'Sziasztok! Norticus (Todi) vagyok, főként számítógépes játékokkal és az informatikával foglalkozom. Néha talán túlságosan is versengő vagyok a mentális jólétemnek. Ha játékokról vagy animékről van szó, szívesen elbeszélgetek róluk. Jelenleg informatikushallgató vagyok, de igyekszem időt szánni magamra és a streamelésre is. A waik csapat egyik alapító tagja vagyok (fun fact, az eredeti waik figurához egyedül én nem rajzoltam hozzá, mire odaértem már véglegesítve lett), a szervereket amin a csapat játszik legtöbbször én hosztolom. Igyekszem élőben is közvetíteni a történéseket, ha új sorozat készül éppen, akkor én (és néha Isti) streameljük élőben, de szoktam egyedül is streamelni, akár angolul is.',
      loading: false,
    }
  },
  head() {
    return {
      title: `Waik | ${this.profile.name}`,
      meta: [
        {
          name: 'og:title',
          content: `Waik | ${this.profile.name}`,
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
          content: this.profile.image,
        },
        {
          name: 'og:image:secure_ur',
          content: this.profile.image,
        },
        {
          name: 'og:image:alt',
          content: this.profile.name,
        },
        {
          name: 'theme-color',
          content: `#${this.profile.color}`,
        },
      ],
    }
  },
}
</script>

<style>
</style>