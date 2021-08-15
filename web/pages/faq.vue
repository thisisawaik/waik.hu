<template>
  <v-flex>
    <v-container>
      <div v-for="(category, rootIndex) of contents" :key="category.key">
        <v-expansion-panels>
          <v-expansion-panel v-if="contentNames[rootIndex] !== '[DEFAULT]'" :readonly="true">
            <v-expansion-panel-header>
              {{ contentNames[rootIndex] }}
              <template #actions>
                <v-icon />
              </template>
            </v-expansion-panel-header>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="(item, index) in category"
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
        <br>
        <br>
      </div>
    </v-container>
  </v-flex>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ app }) {
    const faq = await app.$content(`${app.i18n.localeProperties.code}/infos/faq`).where({ show: true }).sortBy('index').fetch()
    const config = await app.$content(`${app.i18n.localeProperties.code}/infos/faq`, 'config').fetch()
    const contents = []
    const contentNames = []
    for (const category of config.categorys) {
      console.log(category)
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
      console.log(a)
      contents.push(a)
    }
    console.log(config)
    // console.log(faq)
    console.log(contents)
    return {
      contents,
      categorys: config.categorys,
      contentNames,
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
