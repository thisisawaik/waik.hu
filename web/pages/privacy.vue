<template>
  <article>
    <h1>Waik.hu privacy policy</h1>
    <nuxt-content class="document" :document="article" />
    <p class="updated">
      Frissítve: {{ formatDate(article.updatedAt) }}
    </p>
  </article>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content, i18n }) {
    const article = await $content(`${i18n.localeProperties.code}/legal`, 'privacy').fetch()
    return { article }
  },
  head () {
    return {
      title: 'waik.hu privacy policy',
      meta: [
        {
          name: 'description',
          content: 'waik.hu privacy policy',
        },
        {
          name: 'og:description',
          content: 'waik.hu privacy policy',
        },
        {
          name: 'og:title',
          content: 'waik.hu privacy policy',
        },
        {
          name: 'theme-color',
          content: `#${this.article.colorTheme}`,
        },
        {
          name: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          name: 'og:modified_time',
          content: this.article.updatedAt,
        },
      ],
    }
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString('hu', { year: 'numeric', month: 'long', day: 'numeric' })
    },
  },
})
</script>

<style lang="scss" scoped>
.document h2 {
  font-weight: bold;
  font-size: 28px;
}
.document h3 {
  font-weight: bold;
  font-size: 22px;
}
.document p {
  margin-bottom: 20px;
}
.document li {
  margin-top: 20px;
}
.updated {
  margin-top: 40px;
}
</style>
