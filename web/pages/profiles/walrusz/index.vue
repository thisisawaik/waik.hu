<template src="./index.pug" />

<script>
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content, i18n }) {
    const profile = await $content(`${i18n.localeProperties.code}/profiles`, 'walrusz').fetch()
    return {
      profile,
      desc: profile.body.children[0].children[0].value,
    }
  },
  data () {
    return {
      loading: false,
    }
  },
  head () {
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
          content: this.profile.imageurl,
        },
        {
          name: 'theme-color',
          content: `#${this.profile.color}`,
        },
      ],
    }
  },
})
</script>

<style>
</style>
