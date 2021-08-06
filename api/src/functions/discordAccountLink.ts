import { firestore, auth } from "firebase-admin";
import DcAuth = require("discord-oauth2");

export default async function (data: any): Promise<any> {
  const db = firestore();

  const token = data.token;
  const source = data.source;
  if (!token) {
    throw new Error("no-token-found");
  }
  if (!source) {
    throw new Error("source-not-provided");
  }

  const authdoc = await db.collection("waik").doc("bot").get();
  // console.log(authdoc.data());
  const oauth = new DcAuth({
    redirectUri: source,
    clientId: authdoc.data()?.auth.id,
    clientSecret: authdoc.data()?.auth.secret,
  });

  return await oauth
    .tokenRequest({
      code: token,
      scope: "email",
      grantType: "authorization_code",
      // eslint-disable-next-line camelcase
    })
    .then(async (dctoken) => {
      return await oauth.getUser(dctoken.access_token).then(async (dcdata) => {
        return auth()
        .verifyIdToken(data.token)
        .then(async (decodedToken) => {
          const uid = decodedToken.uid;
          console.log(uid);
          const userref = db.collection('users').doc(uid)
          // const userdoc = await userref.get()

          return await userref.set({
            dclinked: true,
            dcid: dcdata.id
          }, {merge: true}).then(() => {
            return true;
          }).catch(e => {
            throw new Error(e);
          });
        }).catch(e => {
          throw new Error(e);
        });
      })
    }).catch(e => {
      throw new Error(e);
    });
}
