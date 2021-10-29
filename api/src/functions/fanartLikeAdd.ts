
import { firestore, database } from 'firebase-admin'
import { Request, Response } from 'express'
const db = firestore();

export default async function fanartLikeAdd(req: Request, res: Response): Promise<ILike> {
    const uid = res.locals.auth.uid;
    if (!uid) {
      throw new Error("user-not-provided");
    }
  
    const id = req.params.postId || req.params.id;
    if (!id) {
      throw new Error("post-id-not-provided");
    }
    const postref = db.doc(`waik/website/fanarts/${id}`);
  
    return postref.get().then(async (doc) => {
      if (!doc.exists) {
        throw new Error("post-not-found");
      }
  
      const likeRef = postref.collection("likes").doc(`${uid}`);
  
      const likeDoc = await likeRef.get();
  
      if (likeDoc.exists) {
        throw new Error("already-liked");
      }
      const likesRef = database().ref(`fanarts/${id}`);
  
      try {
        await likesRef.update({
          likes: database.ServerValue.increment(1),
        });
        const likes: any = doc.data()?.likes;
        return await likeRef
            .set({
              likedAt: firestore.Timestamp.now(),
            })
            .then((res) => {
              return {
                status: "OK",
                likes,
              };
            });
      } catch (error) {
        console.error(error);
        throw new Error('unknown error!');
      }
    });
  }
interface ILike { 
    status: string;
    likes: any;
}