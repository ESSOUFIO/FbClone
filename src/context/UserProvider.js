import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, isLoadding: true });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setSession({ user, isLoadding: false });
    });
    return () => unsub();
  }, []);

  return (
    <userContext.Provider value={session}>
      {!session.isLoadding && children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useSession = () => {
  return useContext(userContext);
};
