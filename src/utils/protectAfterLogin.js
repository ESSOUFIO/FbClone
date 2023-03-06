import { Navigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalProvider";

const protectAfterLogin = (Component) => {
  const Wrapper = (props) => {
    const { user } = useGlobalState();
    return !!user ? <Navigate to={"/"} /> : <Component {...props} />;
  };
  return Wrapper;
};

export default protectAfterLogin;
