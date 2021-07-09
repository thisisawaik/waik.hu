<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-avatar v-bind="attrs" class="nav-bar-avatar" size="40" v-on="on"
          ><img
            :src="
              avatar
                ? avatar
                : 'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c'
            "
        /></v-avatar>
      </template>

      <v-card>
        <v-card-title class="text-h5 lighten-2"> Fiók </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="text-h6 lighten-2">Google</p>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-text>
          <p class="text-h6 lighten-2">Discord</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <p class="text-h6 lighten-2">Profilkép</p>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      avatar: null,
    }
  },
  created() {
    const auth = this.$fire.auth
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.avatar = user.photoURL
      } else {
        this.avatar = null
      }
    })
  },
}
</script>

<style lang="scss" scoped>
</style>