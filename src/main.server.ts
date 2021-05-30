/***************************************************************************************************
 * Initialize the server environment - for example, adding DOM built-in types to the global scope.
 *
 * NOTE:
 * This import must come before any imports (direct or transitive) that rely on DOM built-ins being
 * available, such as `@angular/elements`.
 */
import '@angular/platform-server/init';

import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

const zal_platform = "server";
console.log(zal_platform)

//initializeApp(environment.firebaseConfig);
if(firebase.apps.length === 0) {
  firebase.initializeApp(environment.firebaseConfig);
}
if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
