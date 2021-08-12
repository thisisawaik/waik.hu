<template>
  <v-flex>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in faq"
          :key="index"
        >
          <v-expansion-panel-header>
            {{ item.q }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <nuxt-content :document="item" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-flex>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ app }) {
    const faq = await app.$content(`${app.i18n.localeProperties.code}/infos/faq`).fetch()
    // console.log(faq)
    return { faq }
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
        {
          name: 'og:description',
          content: 'Itt találod meg a Waik gyakori kéedéseket',
        },
      ],
    }
  },
})
</script>

<style>
</style>
