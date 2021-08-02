import { firestore, auth } from "firebase-admin";
import DcAuth = require("discord-oauth2");

export default async function (data: any): Promise<Token> {
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
  console.log(authdoc.data());
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
    })
    .then(async (res) => {
      const atoken = res.access_token;
      return await oauth
        .getUser(atoken)
        .then(async (dcres) => {
          console.log(dcres);
          const ref = db.collection("users").where("dcid", "==", dcres.id);
          const q = await ref.get();

          if (!q.empty && q.docs[0].data()?.dcid) {
            return await auth()
              .createCustomToken(q.docs[0].id)
              .then((res) => {
                // console.log(res);
                return {
                  token: res,
                };
              }).catch(e => {
                throw new Error(e)
              })
          }
          const email: any = dcres.email
          return await auth()
            .getUserByEmail(email)
            .then(async (user) => {
              return await auth()
                .createCustomToken(user.uid)
                .then((token) => {
                  return {
                    token: token,
                  };
                })
                .catch((e) => {
                  throw new Error(e);
                });
            })
            .catch(async (_e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const email: any = dcres.email;
              return await auth()
                .createUser({
                  email: email,
                  displayName: dcres.username,
                  photoURL: dcres.avatar
                    ? `https://cdn.discordapp.com/avatars/${dcres.id}/${dcres.avatar}.webp`
                    : null,
                })
                .then(async (user) => {
                  return await auth()
                    .createCustomToken(user.uid)
                    .then((token) => {
                      return {
                        token: token,
                      };
                    })
                    .catch((e) => {
                      throw new Error(e);
                    });
                })
                .catch((e) => {
                  throw new Error(e);
                });
            });
        })
        .catch((e: string) => {
          // console.error(e);
          throw new Error(e);
        });
    })
    .catch((e: string) => {
      // console.error(e);
      throw new Error(e);
    });
}

interface Token {
  token: string;
}
