import "./NavbarRight.css";
import ProfilePic from "../../../assets/images/omar.jpg";

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
  return (
    <div className="Icon">
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
