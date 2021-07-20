<template>
  <div>
		<template slot="progress">
      <v-progress-linear
      :color="`#${article.colorTheme}`"
      value="100"
      ></v-progress-linear>
    </template>
		{{ article.colorTheme }}
    <article>
      <h1>{{ article.title }}</h1>
      <nuxt-content class="document" :document="article" />
      <p class="updated">Frissítve: {{ formatDate(article.updatedAt) }}</p>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('infos', params.info).fetch()
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
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: `Waik | ${this.article.title}`,
        },
        {
          name: 'twitter:description',
          content: this.article.description,
        },
        {
          name: 'twitter:image',
          content: this.article.img,
        },
        {	
          name: 'twitter:image:alt',
          content: this.article.alt,
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

