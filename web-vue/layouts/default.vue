<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app color="black">
      <NuxtLink class="nav-bar-button" to="/"><img width="40" alt="Waik Logo" src="~/assets/waik_big_icon.png" style="cursor: pointer;"/></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/"><v-btn color="primary">Főoldal</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/streams"><v-btn color="primary">Streamek</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/downloads"><v-btn color="primary">Letöltések</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/fanarts"><v-btn color="primary">Fanartok</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/admin"><v-btn color="primary">Admin</v-btn></NuxtLink>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style>
  .nav-bar-button {
    margin-right: 15px;
  }

  :host {
    font-family: roboto;
  }
</style>