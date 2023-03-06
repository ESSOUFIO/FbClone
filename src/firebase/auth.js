import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export const signup = async ({ username, email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username,
      });
    }
  );
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
