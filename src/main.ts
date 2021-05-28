import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app'
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//initializeApp(environment.firebaseConfig);

if(firebase.apps.length === 0) {
  firebase.initializeApp(environment.firebaseConfig);
}

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
