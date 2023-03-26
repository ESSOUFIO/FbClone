import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const likePost = async (postId, uid) => {
  const d = new Date();
  const likeDoc = { eventTime: d.getTime() };
  const docRef = doc(db, "posts", postId, "interactions", uid, "like", "like");
  await setDoc(docRef, likeDoc);
};

export const disLikePost = async (postId, uid) => {
  const docRef = doc(db, "posts", postId, "interactions", uid, "like", "like");
  await deleteDoc(docRef);
};

export const isLiked = async (postId, uid) => {
  const docRef = doc(db, "posts", postId, "interactions", uid, "like", "like");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
