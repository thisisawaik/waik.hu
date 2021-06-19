import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.status(200).send('PONG')
});

app.get('/users/dc/:DcId', async (req, res) => {
    const id = req.params.DcId;
    if(!id) return res.status(400).send('id-not-found');
    await db.collection('dcusers').doc(id).get().then(doc => {
        if(!doc.exists) return res.status(404).send('user-not-found');
        return res.status(200).send(doc.data());
    }).catch(e => {
        return res.sendStatus(500);
    });

    return res.sendStatus(500);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});