<template>
  <ais-instant-search-ssr class="text-black">
    <ais-search-box delay="300" class="bg-gray-800" />
    <ais-stats class="text-white" />
    <ais-refinement-list attribute="name" />
    <ais-hits>
      <template #item="{ item }">
        <p v-if="item.visible">
          <ais-highlight attribute="name" :hit="item" />
        </p>
        <p v-if="item.visible">
          <ais-highlight attribute="desc" :hit="item" />
        </p>
      </template>
    </ais-hits>
  </ais-instant-search-ssr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  createServerRootMixin,
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'
import _renderToString from 'vue-server-renderer/basic'

function renderToString (app) {
  return new Promise((resolve, reject) => {
    _renderToString(app, (err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  })
}

const searchClient = algoliasearch(
  'LHCK32RLA0',
  '1a8636814d361ab08f587c197701b674',
)

export default {
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'download_waik',
    }),
  ],
  serverPrefetch () {
    return this.instantsearch
      .findResultsState({
        component: this,
        renderToString,
      }).then((algoliaState) => {
        this.$ssrContext.nuxt.algoliaState = algoliaState
      })
  },
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css',
        },
      ],
    }
  },
  beforeMount () {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState

    this.instantsearch.hydrate(results)

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState
    delete window.__NUXT__.algoliaState
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
  },
}
</script>
