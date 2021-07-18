<template>
  <article>
		<h1>{{ article.title }}</h1>
    <nuxt-content class="nuxt-content" :document="article" />
    <p>Frissítve: {{ formatDate(article.updatedAt) }}</p>
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
					content:this.article.description,
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
					content: this.article.colorTheme,
				}
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

<style scoped>
  .nuxt-content h2 {
    font-weight: bold;
    font-size: 28px;
  }
  .nuxt-content h3 {
    font-weight: bold;
    font-size: 22px;
  }
  .nuxt-content p {
    margin-bottom: 20px;
  }
	.nuxt-content li {
		margin-top: 20px;
		color: green;
	}
</style>

