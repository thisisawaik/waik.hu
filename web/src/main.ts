import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getApp, initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { getFunctions, useFunctionsEmulator } from 'firebase/functions'
import { initializeAppCheck, AppCheckOptions, ReCaptchaV3Provider } from 'firebase/app-check'
//initializeApp(environment.firebaseConfig);

if(firebase.apps.length === 0) {
  firebase.initializeApp(environment.firebaseConfig);
}

const zal_platform = "browser";
console.log(zal_platform)

initializeAppCheck(undefined, {
  provider: new ReCaptchaV3Provider(environment.appcheckToken)
});

if (environment.production) {
  enableProdMode();
  firebase.analytics();
} else {
  useFunctionsEmulator(getFunctions() , 'localhost', 5001);
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
