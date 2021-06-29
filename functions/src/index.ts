/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import vision from "@google-cloud/vision";
import * as Discord from "discord.js";
// import * as ai from "@google-cloud/aiplatform";
// import {PubSub} from "@google-cloud/pubsub";
// import {waikFanartApprove} from "./functions/waikFanartApprove";
/*
const aiendp = new ai.EndpointServiceClient({
  projectId: "zal1000",
  apiEndpoint: "5052528608514408448",
  location: "us-central1",
});
*/
const imageai = new vision.ImageAnnotatorClient();

// const pubSubClient = new PubSub();

admin.initializeApp({
  databaseURL: "https://waik.europe-west1.firebasedatabase.app/",
});

const db = admin.firestore();
const rdb = admin.database();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export {waikFanartApprove};

export const fstest = functions.firestore
    .document("test/YWjeaGh8R7RpKhHOXyov")
    .onWrite((change) => {
      console.log(change.after);
      console.log(change.before);
      return;
    });

export const waikFanartApprove = functions.https.onCall(
    async (data, context) => {
      // if (context.app == undefined) {
      //  throw new functions.https.HttpsError(
      //      'failed-precondition',
      //      'The function must be called from an App Check verified app.'
      //      );
      // }

      const uid = context.auth?.uid;
      if (!uid) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "user-not-provided"
        );
      }

      const id = data.postId;
      if (!id) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "post-id-not-provided"
        );
      }
      const isAdmin = context.auth?.token.waikAdmin;
      if (!isAdmin) {
        throw new functions.https.HttpsError("unauthenticated", "not-admin");
      }

      const artref = db
          .collection("waik")
          .doc("website")
          .collection("fanarts")
          .doc(id);

      const artdoc = await artref.get();

      if (!artdoc.exists) {
        throw new functions.https.HttpsError("not-found", "post-not-found");
      }

      await rdb.ref("fanarts").child(id).update({
        likes: 0,
      });

      await artref.update({
        status: "PUBLIC",
      });

      return {};
    });

// eslint-disable-next-line max-len
export const waikFanartSubmit = functions.https.onCall(
    async (data, context) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const PSD = require("psd");
    // console.log(data);
    // if (context.app == undefined) {
    //  throw new functions.https.HttpsError(
    //      "failed-precondition",
    //      "The function must be called from an App Check verified app."
    //  );
    // }
      const uid = context.auth?.uid;
      if (!uid) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "user-not-provided"
        );
      }
      const id = data.postId;
      if (!id) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "id-not-provided"
        );
      }

      const ref = db.doc(`waik/website/fanarts/${id}`);

      await ref.get().then(async (doc) => {
        if (!doc.exists) {
          throw new functions.https.HttpsError(
              "not-found",
              `fanart-not-found-${id}`
          );
        }

        if (!doc.data()?.gsURL) {
          throw new functions.https.HttpsError("not-found", "gs-url-not-found");
        }

        if (!doc.data()?.title) {
          throw new functions.https.HttpsError(
              "invalid-argument",
              "title-not-found"
          );
        }

        const artref = db
            .collection("waik")
            .doc("website")
            .collection("fanarts")
            .doc(id);

        const artdoc = await artref.get();

        const artq = db
            .collection("waik")
            .doc("website")
            .collection("fanarts")
            .where("author", "==", context.auth?.uid)
            .where("forComp", "==", true);

        if ((await artq.get()).docs.length > 3) {
          throw new functions.https.HttpsError(
              "failed-precondition",
              "Már küldtél be 3 alkotást a versenyre!"
          );
        }

        const bot = new Discord.Client();

        const [result] = await imageai.safeSearchDetection(
            `gs://zal1000.net${doc.data()?.gsURL}`
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const artdocdata: any = artdoc.data();

        await db.collection("waik/website/fanarts").add({
          ...artdocdata,
          safeSearchDetection: result.safeSearchAnnotation,
          status: "PENDING",
          getFromGS: true,
        }).then((res) => {
          console.log(res.id);
        });

        const userDoc = await db.doc(`users/${uid}`).get();

        // console.log(userDoc.data()?.dcid);

        if (userDoc.data()?.dcid) {
          try {
            const botDoc = await db.doc("waik/bot").get();
            await bot.login(botDoc.data()?.token);
            const user = await bot.users.fetch(userDoc.data()?.dcid);

            const embed = new Discord.MessageEmbed()
                .setTitle(doc.data()?.title)
            // eslint-disable-next-line max-len
                .setAuthor(
                    `${user.tag}`,
                    user.avatarURL({dynamic: true}) || undefined
                )
                .setColor("#fee75c");
            const gsURL: string = doc.data()?.gsURL;

            // eslint-disable-next-line max-len
            const imageURL = await admin
                .storage()
                .bucket("zal1000.net")
                .file(gsURL.substring(1))
                .getSignedUrl({
                  action: "read",
                  expires: new Date(Date.now() + 2592000000),
                });

            if (imageURL) {
              embed.setImage(imageURL[0]);
            }

            if (doc.data()?.desc) {
              embed.addField("\u200B", doc.data()?.desc);
            }

            const modchannel = await bot.channels.fetch("541997126025084929");

            // eslint-disable-next-line max-len
            // const authordata = await db.collection('dcusers').doc(user.id).get();

            if (modchannel.isText()) {
              await modchannel.send(`${user.tag} submitted an art`, embed);
            }

            // eslint-disable-next-line max-len
            await user
                .send(
                    "Sikeres beküldés! \nA moderátorok nemsokára ellenőrizni fogják, ha minden szabálynak megfelel akkor publikálásra kerül. \nHa szeretnél valamit módosítani akkor a https://waik.hu/fanarts oldalon megteheted!",
                    embed
                )
                .then((msg) => {
                  console.log(`Message sent to ${user.tag} (${msg.id})`);
                });
            bot.destroy();
          } catch (error) {
            console.error(error);
          }
        }

        return {
          queud: true,
        };
      });
    }
);

export const waikFanartAddLike = functions.https.onCall((data, context) => {
  // console.log(context);
  // if (context.app == undefined) {
  //  throw new functions.https.HttpsError(
  //      'failed-precondition',
  //      'The function must be called from an App Check verified app.'
  //      );
  // }
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "user-not-provided"
    );
  }

  const id = data.postId;
  if (!id) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "post-id-not-provided"
    );
  }
  const postref = db.doc(`waik/website/fanarts/${id}`);

  postref.get().then(async (doc) => {
    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", `post-not-found-${id}`);
    }

    const likeRef = postref.collection("likes").doc(`${uid}`);

    const likeDoc = await likeRef.get();

    if (likeDoc.exists) {
      throw new functions.https.HttpsError(
          "permission-denied",
          "already-liked"
      );
    }
    const likesRef = rdb.ref(`fanarts/${id}`);

    try {
      await likesRef.update({
        likes: admin.database.ServerValue.increment(1),
      });
      await likeRef
          .set({
            likedAt: admin.firestore.Timestamp.now(),
          })
          .then((res) => {
            return {
              status: "OK",
              likes: doc.data()?.likes,
            };
          });
    } catch (error) {
      throw new functions.https.HttpsError("internal", "internal-error");
    }
  });
});

export const waikFanartLikeRemove = functions.https.onCall((data, context) => {
  // console.log(context);
  // if (context.app == undefined) {
  //  throw new functions.https.HttpsError(
  //      'failed-precondition',
  //      'The function must be called from an App Check verified app.'
  //      );
  // }
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "user-not-provided"
    );
  }

  const id = data.postId;
  if (!id) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "post-id-not-provided"
    );
  }
  const postref = db.doc(`waik/website/fanarts/${id}`);

  postref.get().then(async (doc) => {
    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", `post-not-found-${id}`);
    }

    const likeRef = postref.collection("likes").doc(`${uid}`);

    const likeDoc = await likeRef.get();

    if (!likeDoc.exists) {
      throw new functions.https.HttpsError(
          "permission-denied",
          "not-yet-liked"
      );
    }

    const likesRef = rdb.ref(`fanarts/${id}`);

    try {
      await likesRef.update({
        likes: admin.database.ServerValue.increment(-1),
      });
      await likeRef.delete().then((res) => {
        return {
          status: "OK",
          likes: doc.data()?.likes,
        };
      });
    } catch (error) {
      throw new functions.https.HttpsError("internal", "internal-error");
    }
  });
});
