/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import vision from "@google-cloud/vision";
import * as Discord from "discord.js";
// import * as ai from "@google-cloud/aiplatform";
// import {PubSub} from "@google-cloud/pubsub";

/*
const aiendp = new ai.EndpointServiceClient({
  projectId: "zal1000",
  apiEndpoint: "5052528608514408448",
  location: "us-central1",
});
*/
const imageai = new vision.ImageAnnotatorClient();

// const pubSubClient = new PubSub();

admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const fstest = functions.firestore
    .document("test/YWjeaGh8R7RpKhHOXyov")
    .onWrite((change) => {
      console.log(change.after);
      console.log(change.before);
      return;
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

        const bot = new Discord.Client();

        const [result] = await imageai.safeSearchDetection(
            `gs://zal1000.net${doc.data()?.gsURL}`
        );
        // const detections = result.safeSearchAnnotation;

        // ////////////////////////////////////////////////////////////////
        /*
      curl \
      -X POST \
      -H "Authorization: Bearer $(gcloud auth print-access-token)" \
      -H "Content-Type: application/json" \
      https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict \
      -d "@${INPUT_DATA_FILE}"
      */

        console.log(result);

        const userDoc = await db.doc(`users/${uid}`).get();

        console.log(userDoc.data()?.dcid);

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
                .setColor("#57F287");
            const gsURL: string = doc.data()?.gsURL;

            // eslint-disable-next-line max-len
            const imageURL = await admin
                .storage()
                .bucket("zal1000.net")
                .file(gsURL.substring(1))
                .getSignedUrl({
                  action: "read",
                  expires: new Date(Date.now() + 315569520000),
                });

            if (imageURL) {
              embed.setImage(imageURL[0]);
            }

            if (doc.data()?.desc) {
              embed.addField("\u200B", doc.data()?.desc);
            }

            await user.send("Sikeres beküldés!", embed).then((msg) => {
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

    try {
      await postref.update({
        likes: admin.firestore.FieldValue.increment(1),
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
    try {
      await postref.update({
        likes: admin.firestore.FieldValue.increment(-1),
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
