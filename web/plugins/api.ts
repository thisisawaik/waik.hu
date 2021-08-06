import { Plugin } from '@nuxt/types';
declare module 'vue/types/vue' {
  interface Vue {
    $myInjectedFunction(message: string): void
  }
};
declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $myInjectedFunction(message: string): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $myInjectedFunction(message: string): void
  }
};

const api: Plugin = async (context, inject) => {
  const auth = context.$fire.auth;
  auth.onAuthStateChanged(async user => {
    if (user) {
      const token = await user.getIdToken();
      context.$axios.setHeader('Auth-Token', token);
    } else {
      context.$axios.setHeader('Auth-Token', 'unauthenticated');
    }
    context.$axios.get('discord/users/423925286350880779/get').then(res => {
      console.log(res.data);
    })
  });
  // inject('api', api);
}

export default api