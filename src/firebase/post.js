import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addPost = async (newPost) => {
  const collRef = collection(db, "posts");
  const resp = await addDoc(collRef, newPost);
  return resp;
};

export const addHiddenPost = async (uid, postId) => {
  const docRef = doc(db, "users", uid, "hiddenPosts", postId);
  const resp = await setDoc(docRef, { postId: postId });
  return resp;
};

export const deleteHiddenPost = async (uid, postId) => {
  const docRef = doc(db, "users", uid, "hiddenPosts", postId);
  await deleteDoc(docRef);
};

export const deletePost = async (postId) => {
  const docRef = doc(db, "posts", postId);
  await deleteDoc(docRef);
};

export const checkHiddenPost = async (uid, postId) => {
  const docRef = doc(db, "users", uid, "hiddenPosts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
