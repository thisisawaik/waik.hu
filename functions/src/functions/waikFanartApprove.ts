/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as Discord from "discord.js";

// admin.initializeApp();

const db = admin.firestore();

export const waikFanartApprove = functions.https.onCall(async (data, context) => {
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

  const artref = db.collection("waik").doc("website").collection("fanarts").doc(id);

  const artdoc = await artref.get();

  if (!artdoc.exists) {
    throw new functions.https.HttpsError("not-found", "post-not-found");
  }

  return {};
});
