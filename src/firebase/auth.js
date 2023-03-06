import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";
import { addUserDocument } from "./user";

export const signup = async ({ username, email, pass, newUser }) => {
  // let resp;
  await createUserWithEmailAndPassword(auth, email, pass);
  const user = auth.currentUser;
  console.log(user, { uid: user.uid, ...newUser });
  await updateProfile(user, { displayName: username });
  await addUserDocument({ uid: user.uid, ...newUser });
  return user;
};

export const signout = async () => {
  await signOut(auth);
};

export const signin = async (email, password) => {
  const resp = await signInWithEmailAndPassword(auth, email, password);
  return resp.user;
};

export const forgotAccount = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
