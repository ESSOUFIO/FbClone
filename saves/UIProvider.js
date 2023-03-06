import { createContext, useContext, useState } from "react";

const uiContext = createContext();

const UIProvider = ({ children }) => {
  const [modalSignup, setModalSignup] = useState(false);

  const showModalSignup = () => {
    setModalSignup(true);
  };

  const hideModalSignup = () => {
    setModalSignup(false);
  };

  return (
    <uiContext.Provider
      value={{ modalSignup, showModalSignup, hideModalSignup }}
    >
      {children}
    </uiContext.Provider>
  );
};

export default UIProvider;

export const useGlobalUI = () => {
  return useContext(uiContext);
};
