import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
