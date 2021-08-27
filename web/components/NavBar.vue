/* eslint-disable vue/no-use-v-if-with-v-for */
<i18n lang="yaml">
hu:
  faq: 'Gyakori kérdések'
  homepage: 'Főoldal'
  streams: 'Streamek'
  downloads: 'Letöltések'
  fanarts: 'Fanartok'
  admin: 'Admin'
en:
  faq: 'FAQ'
  homepage: 'Homepage'
  streams: 'Streams'
  downloads: 'Downloads'
  fanarts: 'Fanarts'
  admin: 'Admin'
</i18n>

<template>
  <div class="main-nav-bar">
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8"
                  src="~/assets/waik_big_icon.png"
                  alt="Workflow logo"
                >
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline">
                  <div v-for="(item, index) in navItems" :key="index">
                    <NuxtLink
                      v-if="item.show"
                      :to="item.to"
                      :class="`${ item.current ? 'px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none' : 'ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none'} focus:text-white focus:bg-gray-700`"
                    >
                      {{ $t(item.name) }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <button
                  class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  aria-label="Notifications"
                >
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <NuxtLink
                      class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      aria-label="User menu"
                      aria-haspopup="true"
                      to="/auth"
                      @click="isOpen = !isOpen"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="avatar"
                      >
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                @click="isOpen = !isOpen"
              >
                <svg
                  :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
          <div class="px-2 pt-2 pb-3 sm:px-3">
            <div v-for="(item, index) in navItems" :key="index">
              <NuxtLink v-if="item.show" :to="item.to" :class="`${ item.current ? 'block px-3 py-2 rounded-md text-base font-medium text-white color-white bg-gray-900' : 'mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'} focus:outline-none focus:text-white focus:bg-gray-700`">
                {{ $t(item.name) }}
              </NuxtLink>
            </div>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="avatar"
                  alt
                >
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user ? user.displayName : 'Logged out' }}
                </div>
                <div class="mt-1 text-sm font-medium leading-none text-gray-400">
                  {{ user ? user.email : 'Logged out' }}
                </div>
              </div>
            </div>
            <div class="mt-3 px-2">
              <NuxtLink
                to="/auth"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                {{ user ? 'Your Account' : 'Sign in' }}
              </NuxtLink>
              <a
                v-if="user"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                @click="signOut"
              >Sign out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import Vue from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default Vue.extend({
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      isOpen: false,
      defaultAvatar: '/default.png',
      avatar: this.defaultAvatar,
      auth: getAuth(),
      user: null,
    }
  },
  created () {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user
      if (user) {
        this.avatar = user.photoURL ? user.photoURL : this.defaultAvatar
      } else {
        this.avatar = this.defaultAvatar
      }
    })
  },
  methods: {
    signOut () {
      signOut(this.auth)
    },
  },
})
</script>

<style lang="scss" scoped>
.main-nav-bar {
  color: white;
}
</style>
