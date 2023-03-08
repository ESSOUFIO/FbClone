import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const addPost = async (newPost) => {
  const collRef = collection(db, "posts");
  await addDoc(collRef, newPost);
};
