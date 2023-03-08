import "./NavbarRight.css";
import { signout } from "../../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useGlobalState } from "../../../context/GlobalProvider";
/** Icons from react-icons */
import { IoIosNotifications } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { uploadImage } from "../../../firebase/user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

/** Internal Components */
const ProfilePicture = ({ uid }) => {
  const { userDoc } = useGlobalState();
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(userDoc.picture);

  const fileChange = async (files) => {
    const downloadUrl = await uploadImage(uid, files[0]);
    setImageUrl(downloadUrl);

    //** Upload user.picture */
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...userDoc,
      picture: downloadUrl,
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".png,.jpg"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => fileChange(e.target.files)}
      />
      <img src={imageUrl} alt="" onClick={() => fileRef.current.click()} />
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
  const { user } = useGlobalState();
  return (
    <div className="NavbarRight">
      <ProfilePicture uid={user.uid} />
      <Notifications />
      <Messenger />
      <Menu />
    </div>
  );
};
