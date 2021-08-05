import * as express from 'express';
import * as fs from 'fs';
import glob = require("glob");

const router = express.Router();

var getDirectories = function (callback: { (err: any, res: any): void; (err: Error | null, matches: string[]): void; }) {
  glob(__dirname + '/routes/api' + '/**/*', callback);
};
getDirectories(function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log(res);
  }
});
fs.readdirSync(__dirname + '/routes/api').forEach(file => {
    router.use(file.split('.')[0] === 'index' ? '/api/' : `/api/${file.split('.')[0]}`, require('./routes/api/' + file).default);
})

// router.use('/api/cpd', require('./cpd'));


export default router