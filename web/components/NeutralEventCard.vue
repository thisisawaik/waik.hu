<template>
  <div class="card">
    <div class="max-w-2xl bg-grey-800 border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
      <div id="header" class="flex">
        <div id="body" class="flex flex-col ml-5">
          <h4 v-if="title" class="text-xl font-semibold mb-2">
            {{ title }}
          </h4>
          <div v-if="html" class="mt-2" v-html="html" />
          <div v-if="markdown" class="mt-2" v-html="$md.render(markdown)" />
        </div>
      </div>
    </div>
  </div>

  <!-- End of component -->
<!--
  <v-card
    outlined
    max-width="390"
    elevation="2"
    style="padding: 8px"
  >
    <h1 v-if="title">
      {{ title }}
    </h1>
    <p v-if="description">
      {{ description }}
    </p>
    <br>
    <div v-if="html" v-html="html" />
    <div v-if="markdown" v-html="$md.render(markdown)" />
  </v-card>
  -->
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'description', 'html', 'markdown'],
}
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  }

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }
</style>
