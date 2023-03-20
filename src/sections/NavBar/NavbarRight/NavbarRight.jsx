import "./NavbarRight.css";
import { useRef, useState } from "react";
import { useGlobalState } from "../../../context/GlobalProvider";
/** Icons from react-icons */
import { IoIosNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { uploadImage } from "../../../firebase/user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";

/** Internal Components */
const ProfilePicture = ({ uid }) => {
  const { userDoc } = useGlobalState();
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const fileChange = async (files) => {
    const downloadUrl = await uploadImage(uid, files[0]);
    setImageUrl(downloadUrl);

    //** Update user.picture */
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...userDoc,
      picture: downloadUrl,
    });
  };

  return (
    <div
      className="position-relative dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-offset="-40,0"
    >
      <input
        type="file"
        accept=".png,.jpg"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => fileChange(e.target.files)}
      />
      <img
        className="NavbarRightImg "
        src={imageUrl ? imageUrl : userDoc.picture}
        alt=""
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
export const NavbarRight = () => {
  const { user } = useGlobalState();

  return (
    <div className="NavbarRight position-relative">
      <ProfilePicture uid={user?.uid} />
      <Notifications />
      <Messenger />
      <Menu />
      <ProfileDropDown />
    </div>
  );
};
