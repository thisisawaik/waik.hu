<template>
  <v-flex>
    <v-container>
      <div v-for="(category, rootIndex) of contents" :key="category.key" class="categorys">
        <v-expansion-panels>
          <v-expansion-panel v-if="contentNames[rootIndex] !== '[DEFAULT]'" :readonly="true">
            <v-expansion-panel-header color="#1f2937">
              {{ contentNames[rootIndex] }}
              <template #actions>
                <v-icon />
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="(item, index) in category"
            :key="index"
            @click="log(item.slug)"
          >
            <v-expansion-panel-header color="#1f2937">
              {{ item.q }}
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#1f2937">
              <nuxt-content :document="item" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <br>
        <br>
      </div>
    </v-container>
  </v-flex>
</template>

<script>
import Vue from 'vue'
import { getAnalytics, logEvent } from 'firebase/analytics'
export default Vue.extend({
  async asyncData ({ app }) {
    const faq = await app.$content(`${app.i18n.localeProperties.code}/infos/faq`).where({ show: true }).sortBy('index').fetch()
    const config = await app.$content(`${app.i18n.localeProperties.code}/infos/faq`, 'config').fetch()
    const contents = []
    const contentNames = []
    for (const category of config.categorys) {
      const a = []
      contentNames.push(category.name)
      for (const item of faq) {
        // eslint-disable-next-line no-mixed-operators
        if (!item.category && category.key === 'default') {
          a.push(item)
        } else if (item.category === category.key) {
          a.push(item)
        }
      }
      contents.push(a)
    }
    return {
      contents,
      categorys: config.categorys,
      contentNames,
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
  methods: {
    log (cardName) {
      if (process.client) {
        logEvent(getAnalytics(), `faq_click_${cardName || 'unknown'}`)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
