<template>
  <div>
    <article>
      <h2>{{ article.title }}</h2>
      <h1>{{ article.description }}</h1>
      <br>
      <nuxt-content class="document" :document="article" />
      <p class="updated">
        Frissítve: {{ formatDate(article.updatedAt) }}
      </p>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, i18n }) {
    const article = await $content(`${i18n.localeProperties.code}/infos`, params.info).fetch()
    return { article }
  },
  head () {
    const meta = [
      {
        name: 'description',
        content: this.article.description
      },
      {
        name: 'og:description',
        content: this.article.description
      },
      {
        name: 'og:title',
        content: `Waik | ${this.article.title}`
      },
      {
        name: 'og:image',
        content: `${this.article.img}`
      },
      {
        name: 'og:image:alt',
        content: `${this.article.alt}`
      },
      {
        name: 'theme-color',
        content: `#${this.article.colorTheme}`
      },
      {
        name: 'article:modified_time',
        content: new Date(this.article.updatedAt).getTime()
      },
      {
        name: 'og:modified_time',
        content: new Date(this.article.updatedAt).getTime()
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:title',
        content: `Waik | ${this.article.title}`
      },
      {
        name: 'twitter:description',
        content: this.article.description
      },
      {
        name: 'twitter:image',
        content: this.article.img
      },
      {
        name: 'twitter:image:alt',
        content: this.article.alt
      }
    ]
    return {
      title: `Waik | ${this.article.title}`,
      meta
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-weight: bold;
  font-size: 28px;
}
h3 {
  font-weight: bold;
  font-size: 22px;
}
p {
  margin-bottom: 20px;
}
li {
  margin-top: 20px;
}
.updated {
  margin-top: 40px;
}
</style>
