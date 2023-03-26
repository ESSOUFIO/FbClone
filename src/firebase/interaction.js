import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const likePost = async (postId, uid, likeDoc) => {
  console.log("-->", postId);
  const docRef = doc(db, "posts", postId, "interactions", uid, "like", uid);
  await setDoc(docRef, likeDoc);
};
