import "./NavbarRight.css";
import { useGlobalState } from "../../../context/GlobalProvider";
/** Icons from react-icons */
import { IoIosNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
import defaultPic from "../../../assets/images/defProfile.jpg";
import { useMediaQuery } from "react-responsive";

/** Internal Components */
const ProfilePicture = ({ isMobile }) => {
  const { userDoc } = useGlobalState();

  return (
    <div
      className="position-relative dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-offset="-40,0"
    >
      <img
        className="NavbarRightImg "
        src={userDoc.picture ? userDoc.picture : defaultPic}
        alt=""
        style={{ marginRight: isMobile ? "20px" : "0px" }}
      />
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
export const NavbarRight = ({ btnClicked }) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 500px)",
  });
  return (
    <div className="NavbarRight position-relative">
      <ProfilePicture isMobile={isMobile} />
      <Notifications />
      <Messenger />
      <Menu />
      <ProfileDropDown btnClicked={btnClicked} />
    </div>
  );
};
