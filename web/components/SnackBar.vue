<template>
  <v-snackbar v-model="show" :color="color" :class="sclass">
    {{ text }}

    <template #action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="close()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      sclass: '',
      color: 'green',
      timeout: 3000,
      show: false
    }
  },
  created () {

  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
