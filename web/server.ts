import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();


global['navigator'] = mock.getNavigator();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/waik-hu/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  const fapp = initializeApp({
    apiKey: "AIzaSyBmRS5Yy-1ktWXNsYjk9mQ8Rs9RhmQy600",
    authDomain: "zal1000.firebaseapp.com",
    databaseURL: "https://waik.europe-west1.firebasedatabase.app",
    projectId: "zal1000",
    storageBucket: "zal1000.net",
    messagingSenderId: "512279358183",
    appId: "1:512279358183:web:1a091779e0474dba541042",
    measurementId: "G-W3EFDHYNN1"
  }, 'server');

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  server.get('api/shares/ShareId', async (req, res) => {
    const db = getFirestore(fapp);
    const params: any = req.params;
    const id = params.ShareId ? params.ShareId : null;
    if(!id) return res.status(400).send({message: 'id-not-sent'});

    const ref = doc(db, `waik/website/shares/${id}`);
    const d = await getDoc(ref);

    if(!d.exists()) return res.status(404).send({message: 'id-not-found'});

    return res.status(200).send(d.data());
  });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1w'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
