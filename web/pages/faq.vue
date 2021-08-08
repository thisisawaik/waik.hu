<template>
  <v-flex>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in questions"
          :key="index"
        >
          <v-expansion-panel-header>
            {{ item.question }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ item.answer }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  async asyncData ({ $content, i18n }) {
    const faq = await $content(`${i18n.localeProperties.code}/infos`, 'faq').fetch()
    return {
      faq,
      questions: faq.questions,
    }
  },
  data () {
    return {
      loading: false,
    }
  },
  head () {
    return {
      title: 'Waik | GYIK',
      meta: [
        {
          name: 'og:title',
          content: 'Waik | GYIK',
        },
      ],
    }
  },
}
</script>

<style>
</style>
