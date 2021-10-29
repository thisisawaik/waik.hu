<template>
  <v-row no-gutters>
    <template v-for="n in 4">
      <v-col :key="n">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <iframe
            src="https://player.twitch.tv/?channel=isti115&parent=localhost"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            class="player"
            width="100%"
          />
        </v-card>
      </v-col>
      <v-responsive
        v-if="n === 2"
        :key="`width-${n}`"
        width="100%"
      />
    </template>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head () {
    return {
      title: 'Waik | Streamek',
      meta: [],
    }
  },
})
</script>

<style lang="scss" scoped>
.player {
  height: calc(100vh - 30px);
}
</style>
