import * as express from "express";
import * as admin from "firebase-admin";
// import { spawn } from 'child_process';
import router from './router'


var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://waik.europe-west1.firebasedatabase.app/',
});

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json())

app.use(router);

app.get("/ping", (req, res) => {
  res.status(200).send("PONG");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
