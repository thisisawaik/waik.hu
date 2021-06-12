import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

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

export const waikFanartAddLike = functions.https.onCall((data, context) => {
  //console.log(context);
  //if (context.app == undefined) {
  //  throw new functions.https.HttpsError(
  //      'failed-precondition',
  //      'The function must be called from an App Check verified app.'
  //      );
  //}
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

  postref.get().then((doc) => {
    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", `post-not-found-${id}`);
    }
    const likes: string[] = doc.data()?.likes;

    const isLiked = likes.find((e) => e === uid) ? true : false;

    if (isLiked) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "already-liked"
      );
    }
    likes.push(uid);

    postref
      .update({
        likes: likes,
      })
      .then((res) => {
        return {
          status: "OK",
          likes: likes,
        };
      })
      .catch((e) => {
        throw new functions.https.HttpsError("internal", "internal-error");
      });
  });
});

export const waikFanartSubmit = functions.https.onCall((data, context) => {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient();

  console.log(data)

  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "user-not-provided"
    );
  }
  const id = data.postId;
  if (!id) {
    throw new functions.https.HttpsError("invalid-argument", "id-not-provided");
  }

  const ref = db.doc(`waik/website/fanarts/${id}`);

  ref.get().then(async (doc) => {
    if (!doc.exists)
      throw new functions.https.HttpsError(
        "not-found",
        `fanart-not-found-${id}`
      );

    if (!doc.data()?.gsURL)
      throw new functions.https.HttpsError("not-found", `gs-url-not-found`);

    const [result] = await client.safeSearchDetection(`gs://zal1000.net${doc.data()?.gsURL}`);
    const detections = result.safeSearchAnnotation;

    console.log("Safe search:");
    console.log(`Adult: ${detections.adult}`);
    console.log(`Medical: ${detections.medical}`);
    console.log(`Spoof: ${detections.spoof}`);
    console.log(`Violence: ${detections.violence}`);
    console.log(`Racy: ${detections.racy}`);

    return {
      detections: detections,
    }
  });
});

export const waikFanartAddRemove = functions.https.onCall((data, context) => {
  //console.log(context);
  //if (context.app == undefined) {
  //  throw new functions.https.HttpsError(
  //      'failed-precondition',
  //      'The function must be called from an App Check verified app.'
  //      );
  //}
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

  postref.get().then((doc) => {
    if (!doc.exists) {
      throw new functions.https.HttpsError("not-found", `post-not-found-${id}`);
    }
    const likes: string[] = doc.data()?.likes;

    const isLiked = likes.find((e) => e === uid) ? true : false;

    if (!isLiked) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "not-yet-liked"
      );
    }
    removeElement(likes, uid);

    postref
      .update({
        likes: likes,
      })
      .then((res) => {
        return {
          status: "OK",
          likes: likes,
        };
      })
      .catch((e) => {
        throw new functions.https.HttpsError("internal", "internal-error");
      });
  });
});

function removeElement(array: Array<string>, elem: string) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}
