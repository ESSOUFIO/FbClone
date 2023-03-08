import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { getUser } from "../firebase/user";

const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, isLoadding: true });
  const [content, setContent] = useState({ posts: [], isLoadding: true });
  const [modalSignup, setModalSignup] = useState(false);
  const [userDoc, setUserDoc] = useState({});

  const showModalSignup = () => {
    setModalSignup(true);
  };

  const hideModalSignup = () => {
    setModalSignup(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setSession({ user, isLoadding: false });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (session.user) {
      const unsub = onSnapshot(doc(db, "users", session.user.uid), (doc) => {
        setUserDoc(doc.data());
      });
      return () => unsub();
    }
  }, [session.user]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("time", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const posts = [];
      snap.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setContent({ posts, isLoadding: false });
    });
    return () => unsub();
  }, []);

  return (
    <globalContext.Provider
      value={{
        ...session,
        ...content,
        userDoc,
        modalSignup,
        showModalSignup,
        hideModalSignup,
      }}
    >
      {!session.isLoadding && !content.isLoadding && children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalState = () => {
  return useContext(globalContext);
};
