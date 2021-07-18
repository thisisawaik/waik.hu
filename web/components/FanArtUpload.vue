<template>
  <p>asd {{ counter }}</p>
</template>

<script>
export default {
    data() {
        return {
            counter: this.$store.state.counter,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>