/* eslint-disable max-len */
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const fstest = functions.firestore.document("test/YWjeaGh8R7RpKhHOXyov").onWrite((change) => {
  console.log(change.after);
  console.log(change.before);
  return;
});
