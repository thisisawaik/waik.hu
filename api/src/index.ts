import * as express from "express";
import * as admin from "firebase-admin";
import { spawn } from 'child_process';
admin.initializeApp();

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.status(200).send("PONG");
});

app.get("/users/dc/:DcId", async (req, res) => {
  const id = req.params.DcId;
  if (!id) return res.status(400).send("id-not-found");
  await db
    .collection("dcusers")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).send("user-not-found");
      return res.status(200).send(doc.data());
    })
    .catch((e) => {
      return res.sendStatus(500);
    });

  return res.sendStatus(500);
});

app.get("/share", async (req, res) => {
  res.status(200).send(`
    <html>
  <head>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Test" />
    <meta name="twitter:site" content="waik.hu" />
    <meta name="twitter:description" content="This is a longer text couse yeah" />
    <meta name="og:image" content="https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/images%2FUntitled-2.jpg?alt=media&token=a74e466f-e0c6-4eff-b366-4ef5e507c9e3" />
    <meta name="og:title" content="Test" />
    <meta name="og:description" content="This is a longer text couse yeah" />

    <meta
      name="twitter:image"
      content="https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/images%2FUntitled-2.jpg?alt=media&token=a74e466f-e0c6-4eff-b366-4ef5e507c9e3"
    />
  </head>
  <body>
    <sctipt>
        window.location = "https://example.com/";
    </script>
    </body>
</html>
`);
});

app.post('/maunalstart', async (req, res) => {
    spawn("gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project zal1000").on('exit', (code) => {
        spawn("kubectl create job --from cronjob/waik-auto-roles waik-role-sync-maual");
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
