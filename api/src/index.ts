import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 8080;



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});