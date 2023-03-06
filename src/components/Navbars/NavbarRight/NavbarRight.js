import "./NavbarRight.css";
import ProfilePic from "../../../assets/images/omar.jpg";
import { signout } from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";

/** Icons from react-icons */
import { IoIosNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";

/** Internal Components */
const ProfilePicture = ({ picture }) => {
  return (
    <div>
      <img src={picture} alt="" />
    </div>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (error) {
      console.log("Error signout: ", error);
    }
  };
  return (
    <div className="Icon" onClick={logoutHandler}>
      <IoIosNotifications />
    </div>
  );
};

const Messenger = () => {
  return (
    <div className="Icon Messenger">
      <BsMessenger />
    </div>
  );
};

const Menu = () => {
  return (
    <div className="Icon">
      <CgMenuGridR />
    </div>
  );
};

/** ==== NavbarRight ===== */
export const NavbarRight = () => {
  return (
    <div className="NavbarRight">
      <ProfilePicture picture={ProfilePic} />
      <Notifications />
      <Messenger />
      <Menu />
    </div>
  );
};
