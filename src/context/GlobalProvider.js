import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, isLoadding: true });
  const [modalSignup, setModalSignup] = useState(false);

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

  return (
    <globalContext.Provider
      value={{ ...session, modalSignup, showModalSignup, hideModalSignup }}
    >
      {/* {!session.isLoadding && children} */}
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalState = () => {
  return useContext(globalContext);
};
