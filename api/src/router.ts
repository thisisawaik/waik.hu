import * as express from 'express';
import * as glob from 'glob';
// import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as fs from 'fs';

const router = express.Router();

router.use(cors());

fs.readdirSync(__dirname + '/middleware').forEach(function (file) {
  console.log(file);
  router.use(require(__dirname + '/middleware/' + file).default);
  console.log(`Registered middleware: ${file.split('.')[0]}`)
});

var getDirectories = function (callback: { (err: any, res: any): void; (err: Error | null, matches: string[]): void; }) {
  glob(__dirname + '/routes/api' + '/**/*', callback);
};
getDirectories((err: any, res: Array<string>) => {
  if (err) {
    throw new Error(err);
  } else {
    res.forEach((file) => {
      if (file.endsWith('.js')) {
        const path = file.substring(__dirname.length)
        const route = path.substring(8).replace('_', ':');
        const routeModule = require(`.${path}`);
        if (routeModule.autoRegister) {
          try {
            const method: any = route.split('-')[1].split('.')[0] || 'get';
            const routeName = route.split('-')[0];
            // console.log(`Registering route ${routeName}`);
            // console.log(`/${routeName} (${method})`);
            // console.log(`router.${method}(\`/\${routeName}\`, routeModule.handler)`);
            try {
              eval(`router.${method}(\`/\${routeName}\`, routeModule.default)`);
              console.log(`Registered route: /${routeName} (${method})`)
            } catch (error) {
              console.error(`Error registering route: /${routeName}`);
              console.error(error);
            }
          } catch (error) {
            router.get(route.split('.')[0] === 'index' ? '/' : `/${route.split('.')[0]}`, routeModule.default);
            console.log(route.split('.')[0] === 'index' ? 'Registered route: / (get)' : `Registered route: /${route.split('.')[0]} (get)`);
          }
        }
      }
    });
  }
});

export default router