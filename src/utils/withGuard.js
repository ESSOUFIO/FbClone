import { Navigate } from "react-router-dom";
import { useSession } from "../context/UserProvider";

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const { user } = useSession();
    return !!user ? <Component {...props} /> : <Navigate to="/login" />;
  };
  return Wrapper;
};

export default withGuard;
