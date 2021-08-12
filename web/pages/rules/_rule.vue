<template>
  <article>
    <h1>{{ article.title }}</h1>
    <nuxt-content class="document" :document="article" />
    <p class="updated">
      Frissítve: {{ formatDate(article.updatedAt) }}
    </p>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData ({ $content, params, i18n }) {
    const article = await $content(`${i18n.localeProperties.code}/rules`, params.rule).fetch()
    return { article }
  },
  head () {
    return {
      title: `Waik | ${this.article.title}`,
      meta: [
        {
          name: 'description',
          content: this.article.description,
        },
        {
          name: 'og:description',
          content: this.article.description,
        },
        {
          name: 'og:title',
          content: `Waik | ${this.article.title}`,
        },
        {
          name: 'og:image',
          content: `${this.article.img}`,
        },
        {
          name: 'og:image:alt',
          content: `${this.article.alt}`,
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
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
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
