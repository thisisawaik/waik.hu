<template>
  <v-app-bar style="margin-top: 60px; height: 70px" fixed app color="#1e1e1e">
    <div v-if="user === 'norticus'" class="center">
      <a href="https://www.twitch.tv/norticus36" target="_blank"
        ><img height="40" src="~/assets/svgs/twitch_logo.svg"
      /></a>
      <a href="https://www.youtube.com/user/NorticusGaming" target="_blank"
        ><img height="40" src="~/assets/svgs/yt_logo.svg"
      /></a>
      <a href="https://github.com/norticus36/" target="_blank"
        ><img height="40" src="~/assets/svgs/github_logo.svg"
      /></a>
      <a
        ><img height="40" class="avatar" src="~/assets/avatars/norticus.webp"
      /></a>
    </div>
    <div v-if="user === 'isti'" class="center">
      <a href="https://www.twitch.tv/Isti115" target="_blank"
        ><img height="40" src="~/assets/svgs/twitch_logo.svg"
      /></a>
      <a href="https://twitter.com/Isti115/" target="_blank"
        ><img height="40" src="~/assets/svgs/twitter_logo.svg"
      /></a>
      <a href="https://www.youtube.com/user/Isti115/" target="_blank"
        ><img height="40" src="~/assets/svgs/yt_logo.svg"
      /></a>
      <a href="https://github.com/Isti115/" target="_blank"
        ><img height="40" src="~/assets/svgs/github_logo.svg"
      /></a>
      <a
        ><img height="40" class="avatar" src="~/assets/avatars/isti.webp"
      /></a>
    </div>
        <div v-if="user === 'walrusz'" class="center">
          <a href="https://www.youtube.com/user/WalruszMester/" target="_blank"
        ><img height="40" src="~/assets/svgs/yt_logo.svg"
      /></a>
      <a href="https://twitter.com/walruszmester/" target="_blank"
        ><img height="40" src="~/assets/svgs/twitter_logo.svg"
      /></a>
      
      <a href="https://instagram.com/walrusz/" target="_blank"
        ><img height="40" src="~/assets/svgs/instagram_logo.svg"
      /></a>
      <a
        ><img height="40" class="avatar" src="~/assets/avatars/walrusz.webp"
      /></a>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['user'],
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.center {
  margin: auto;
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
