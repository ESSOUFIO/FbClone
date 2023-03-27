import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

export const likePost = async (postId, uid) => {
  const d = new Date();
  const likeDoc = { time: d.getTime() };
  const docRef = doc(db, "posts", postId, "interactions", "Like", "likes", uid);
  await setDoc(docRef, likeDoc);
};

export const disLikePost = async (postId, uid) => {
  const docRef = doc(db, "posts", postId, "interactions", "Like", "likes", uid);
  await deleteDoc(docRef);
};

export const isLiked = async (postId, uid) => {
  const docRef = doc(db, "posts", postId, "interactions", "Like", "likes", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const addComment = async (postId, uid, comment) => {
  const d = new Date();
  const commentDoc = { uid, time: d.getTime(), text: comment };
  const collectionRef = collection(
    db,
    "posts",
    postId,
    "interactions",
    "Comment",
    "comments"
  );
  await addDoc(collectionRef, commentDoc);
};
