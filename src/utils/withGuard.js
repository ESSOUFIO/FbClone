import { Navigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalProvider";

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const { user } = useGlobalState();
    return !!user ? <Component {...props} /> : <Navigate to="/login" />;
  };
  return Wrapper;
};

export default withGuard;
