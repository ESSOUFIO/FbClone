import "./NavbarRight.css";
import ProfilePic from "../../assets/images/omar.jpg";
import { IoIosNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";

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
