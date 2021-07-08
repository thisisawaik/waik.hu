<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <NuxtLink class="nav-bar-button" to="/"><img width="40" alt="Waik Logo" src="~/assets/waik_big_icon.png" style="cursor: pointer;"/></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/"><v-btn color="primary" depressed>Főoldal</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/streams"><v-btn color="primary" depressed>Streamek</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/downloads"><v-btn color="primary" depressed>Letöltések</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/fanarts"><v-btn color="primary" depressed>Fanartok</v-btn></NuxtLink>
      <NuxtLink class="nav-bar-button" to="/admin"><v-btn color="primary" depressed>Admin</v-btn></NuxtLink>
      <v-spacer />
      <NuxtLink class="nav-bar-avatar" to="/profiles/norticus"><v-avatar size="40"><img height="40" src="~/assets/avatars/norticus.webp"></v-avatar></NuxtLink>
      <NuxtLink class="nav-bar-avatar" to="/profiles/walrusz"><v-avatar size="40"><img height="40" src="~/assets/avatars/walrusz.webp"></v-avatar></NuxtLink>
      <NuxtLink class="nav-bar-avatar" to="/profiles/isti"><v-avatar size="40"><img height="40" src="~/assets/avatars/isti.webp"></v-avatar></NuxtLink>
      <NuxtLink class="nav-bar-avatar" to="/profiles/geiszla"><v-avatar size="40"><img height="40" src="~/assets/avatars/geiszla.webp"></v-avatar></NuxtLink>
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

  .nav-bar-avatar {
    margin-left: 20px;
  }

  :host {
    font-family: roboto;
  }
</style>