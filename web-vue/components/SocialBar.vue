<template>
  <v-app-bar style="margin-top: 60px; height: 70px" fixed app color="#1e1e1e">
    <div v-if="user === 'norticus'" class="center">
      <a href="https://www.twitch.tv/norticus36" target="_blank"><img height="40" src="~/assets/svgs/twitch_logo.svg" /></a>
      <a href="https://www.youtube.com/user/NorticusGaming" target="_blank"><img height="40" src="~/assets/svgs/yt_logo.svg" /></a>
      <a href="https://github.com/norticus36/" target="_blank"><img height="40" src="~/assets/svgs/github_logo.svg" /></a>
      <a><img height="40" class="avatar" src="~/assets/avatars/norticus.webp" /></a>
    </div>
  </v-app-bar>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props: ['user'],
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.center {
  margin: auto;
  border: 3px solid green;
  padding: 10px;
  img {
      margin-left: 5px;
      margin-right: 5px;
  }
  .avatar {
      border-radius: 50%;
  }
}
</style>
