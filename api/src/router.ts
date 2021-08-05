import * as express from 'express';
import * as fs from 'fs';

const router = express.Router();

fs.readdirSync(__dirname + '/routes/api').forEach(file => {
    router.use(file.split('.')[0] === 'index' ? '/api/' : `/api/${file.split('.')[0]}`, require('./routes/api/' + file).default);
})

// router.use('/api/cpd', require('./cpd'));


export default router