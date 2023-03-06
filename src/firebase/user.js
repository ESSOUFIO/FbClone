import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const addUserDocument = async (user) => {
  await setDoc(doc(db, "users", user.uid), user);
};
