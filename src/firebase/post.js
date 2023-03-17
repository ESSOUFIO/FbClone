import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addPost = async (newPost) => {
  const collRef = collection(db, "posts");
  const resp = await addDoc(collRef, newPost);
  return resp;
};

export const updatePost = async (newPost) => {
  const postRef = doc(db, "posts", newPost.id);
  console.log(newPost);
  await updateDoc(postRef, newPost);
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

export const savePost = async (uid, post) => {
  const docRef = doc(db, "users", uid, "savedPosts", post.id);
  await setDoc(docRef, post);
};

export const unSavePost = async (uid, postId) => {
  const docRef = doc(db, "users", uid, "savedPosts", postId);
  await deleteDoc(docRef);
};

export const checkSavedPost = async (uid, postId) => {
  const docRef = doc(db, "users", uid, "savedPosts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
