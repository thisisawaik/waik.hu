<template>
    <v-container >
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="white--text mt-8">
        <v-avatar size="56"> <img alt="user" :src="imageurl" /></v-avatar>

        <v-card-title>{{ name }}</v-card-title>
      </v-card-title>

      <v-card-text>
        <div>
          {{ desc }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['imageurl', 'desc', 'name'],
  data() {
    return {
      loading: false,
    }
  },
}
</script>