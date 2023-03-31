import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";

const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, isLoadding: true });
  const [content, setContent] = useState({ posts: [], isLoadding: true });
  const [savedContent, setSavedContent] = useState({
    savedPosts: [],
    isLoadding: true,
  });
  const [myContent, setMyContent] = useState({ myPosts: [], isLoadding: true });
  const [modalSignup, setModalSignup] = useState(false);
  const [userDoc, setUserDoc] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  /** Alert */
  const ShowAlert = () => setShowAlert(true);
  const HideAlert = () => setShowAlert(false);
  const SetAlertText = (text) => setAlertText(text);

  /** Modal Signup */
  const showModalSignup = () => {
    setModalSignup(true);
  };

  const hideModalSignup = () => {
    setModalSignup(false);
  };

  /** Current User logged in */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setSession({ user, isLoadding: false });
    });
    return () => unsub();
  }, []);

  /** Current document of current User */
  useEffect(() => {
    if (session.user) {
      const unsub = onSnapshot(doc(db, "users", session.user.uid), (doc) => {
        setUserDoc(doc.data());
      });
      return () => unsub();
    }
  }, [session.user]);

  /** Posts */
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

  /** My Posts */
  useEffect(() => {
    if (session.user) {
      const q = query(collection(db, "posts"), orderBy("time", "desc"));
      const unsub = onSnapshot(q, (snap) => {
        const myPosts = [];
        snap.forEach((doc) => {
          if (doc.data().uid === session.user.uid) {
            myPosts.push({ id: doc.id, ...doc.data() });
          }
        });
        setMyContent({ myPosts, isLoadding: false });
      });
      return () => unsub();
    }
  }, [session.user]);

  /** Saved Posts */
  useEffect(() => {
    if (session.user) {
      const collRef = collection(db, "users", session.user.uid, "savedPosts");
      const unsub = onSnapshot(collRef, (snap) => {
        const savedPosts = [];
        snap.forEach((doc) => {
          savedPosts.push(doc.data());
        });
        setSavedContent({ savedPosts });
      });
      return () => unsub();
    }
  }, [session.user]);

  return (
    <globalContext.Provider
      value={{
        ...session,
        ...content,
        userDoc,
        modalSignup,
        showModalSignup,
        hideModalSignup,
        showAlert,
        ShowAlert,
        HideAlert,
        alertText,
        SetAlertText,
        ...savedContent,
        ...myContent,
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
