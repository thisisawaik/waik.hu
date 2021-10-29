<template>
  <div>
    <p>Twitch working</p>
    <iframe
      src="https://player.twitch.tv/?channel=norticus36&parent=localhost"
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="378"
      width="620"
    />
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
}
</script>

<style>

</style>
