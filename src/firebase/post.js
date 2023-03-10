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
  const collRef = doc(db, "users", uid, "hiddenPosts", postId);
  const resp = await setDoc(collRef, { postId: postId });
  return resp;
};

export const deleteHiddenPost = async (uid, postId) => {
  const collRef = doc(db, "users", uid, "hiddenPosts", postId);
  await deleteDoc(collRef);
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
