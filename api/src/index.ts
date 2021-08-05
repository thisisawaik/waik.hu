import * as express from "express";
import * as admin from "firebase-admin";
// import { spawn } from 'child_process';
import router from './router'

admin.initializeApp();

const app = express();
const port = process.env.PORT || 8080;

app.use(router);

app.get("/ping", (req, res) => {
  res.status(200).send("PONG");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
