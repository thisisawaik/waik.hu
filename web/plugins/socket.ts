import { io } from "socket.io-client";
import { Plugin } from '@nuxt/types';
;
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

const myPlugin: Plugin = (context, inject) => {
  const socket = io('/');
  const store = context.store

  function reconnect (t?: number) {
    const time = t || 3000;
    let connected = false;
    socket.connect();
    socket.once('connect', () => {
      console.log('reconnected');
      store.commit('changeWsStatus', 'connected');
      connected = true;
    });

    setTimeout(() => {
      if (!connected) {
        reconnect();
      }
    }, time);
  }

  const auth = context.$fire.auth;

  socket.on('disconnect', (reason) => {
    console.log('disconnected', reason);
    store.commit('changeWsStatus', 'disconnected');
    if (reason === 'transport error') {
      console.log('asd');
      reconnect();
    }
  });

  socket.on('connect', () => {
    console.log('connected');
    store.commit('changeWsStatus', 'connected');
  });

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken(true);
      socket.emit('userStateUpdate', token);
    } else {
      socket.emit('userStateUpdate', null);
    }
  });

  inject('mainSocket', socket);
}

export default myPlugin

/*
export default ({ app, store }: any, inject: (arg0: any, arg1: any) => void) => {
  const socket = io();

  function reconnect (t?: number) {
    const time = t || 3000;
    let connected = false;
    socket.connect();
    socket.once('connect', () => {
      console.log('reconnected');
      store.commit('changeWsStatus', 'connected');
      connected = true;
    });

    setTimeout(() => {
      if (!connected) {
        reconnect();
      }
    }, time);
  }

  const auth = app.$fire.auth;

  socket.on('disconnect', (reason) => {
    console.log('disconnected', reason);
    store.commit('changeWsStatus', 'disconnected');
    if (reason === 'transport error') {
      console.log('asd');
      reconnect();
    }
  });

  socket.on('connect', () => {
    console.log('connected');
    store.commit('changeWsStatus', 'connected');
  });

  auth.onAuthStateChanged(async (user: { getIdToken: (arg0: boolean) => any; }) => {
    if (user) {
      const token = await user.getIdToken(true);
      socket.emit('userStateUpdate', token);
    } else {
      socket.emit('userStateUpdate', null);
    }
  });

  inject('mainSocket', socket);
};
*/