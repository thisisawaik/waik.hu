<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>
      <v-card-title class="white--text mt-8">
        <v-avatar size="56">
          <img alt="user" :src="profile.image">
        </v-avatar>

        <v-card-title>{{ profile.name }}</v-card-title>
      </v-card-title>

      <v-card-text>
        <nuxt-content class="document" :document="profile" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['profile'],
  data () {
    return {
      loading: false
    }
  }
}
</script>
