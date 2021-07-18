<template>
  <article>
    <h1>{{ article.title }}</h1>
    <nuxt-content class="document" :document="article" />
    <p class="updated">Frissítve: {{ formatDate(article.updatedAt) }}</p>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('rules', params.rule).fetch()
    return { article }
  },
  head() {
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
          content: `${this.article.image}`,
        },
        {
          name: 'og:image:alt',
          content: `${this.article.alt}`,
        },
        {
          name: 'color-theme',
          content: `#${this.article.colorTheme}`,
        },
      ],
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
    },
  },
}
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

