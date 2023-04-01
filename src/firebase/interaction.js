import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
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

export const deleteComment = async (postId, commentId) => {
  const docRef = doc(
    db,
    "posts",
    postId,
    "interactions",
    "Comment",
    "comments",
    commentId
  );
  await deleteDoc(docRef);
};

export const updateComment = async (postId, commentId, newComment) => {
  console.log("newComment: ", newComment);
  const docRef = doc(
    db,
    "posts",
    postId,
    "interactions",
    "Comment",
    "comments",
    commentId
  );
  await updateDoc(docRef, newComment);
};

export const likeComment = async (postId, uid, commentId) => {
  const d = new Date();
  const likeDoc = { time: d.getTime() };
  const docRef = doc(
    db,
    "posts",
    postId,
    "interactions",
    "Comment",
    "comments",
    commentId,
    "Like",
    uid
  );
  await setDoc(docRef, likeDoc);
};

export const disLikeComment = async (postId, uid, commentId) => {
  const docRef = doc(
    db,
    "posts",
    postId,
    "interactions",
    "Comment",
    "comments",
    commentId,
    "Like",
    uid
  );
  await deleteDoc(docRef);
};
