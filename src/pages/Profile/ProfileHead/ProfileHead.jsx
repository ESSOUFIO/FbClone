import React, { useRef, useState } from "react";
import styles from "./ProfileHead.module.css";
import coverTest from "../../../assets/images/cover.jpg";
import { ImCamera } from "react-icons/im";
import { BiPlus } from "react-icons/bi";
import { RiMoreFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Button } from "react-bootstrap";

import icon1 from "../../../assets/images/friends/1.jpg";
import icon2 from "../../../assets/images/friends/2.jpg";
import icon3 from "../../../assets/images/friends/3.jpg";
import icon4 from "../../../assets/images/friends/4.jpg";
import icon5 from "../../../assets/images/friends/5.jpg";
import icon6 from "../../../assets/images/friends/6.jpg";
import icon7 from "../../../assets/images/friends/7.jpg";
import icon8 from "../../../assets/images/friends/8.jpg";
import { useGlobalState } from "../../../context/GlobalProvider";
import { uploadImage } from "../../../firebase/user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Cover = () => {
  return (
    <div
      className={styles.cover}
      style={{ backgroundImage: `url(${coverTest})` }}
    >
      <div className={styles.btnCover}>
        <ImCamera />
        <span style={{ marginLeft: "6px" }}>Edit cover photo</span>
      </div>
    </div>
  );
};

const FriendsPicture = ({ photo, index }) => {
  return (
    <div
      className={styles.friendsPic}
      style={{ zIndex: `${index}`, transform: `translate(${index * 5}px, 0)` }}
    >
      <img src={photo} alt="" width={"100%"} />
    </div>
  );
};

const MenuBtn = ({ title, withArrow = false }) => {
  return (
    <div className={styles.MenuBtn}>
      {title}
      {withArrow && (
        <span style={{ marginLeft: "2px" }}>
          <IoMdArrowDropdown />
        </span>
      )}
    </div>
  );
};

const MoreBtn = () => {
  return (
    <div className={styles.MoreBtn}>
      <RiMoreFill />
    </div>
  );
};

const Photo = () => {
  const { userDoc } = useGlobalState();
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const fileChange = async (files) => {
    if (!files[0]) return;
    const downloadUrl = await uploadImage(userDoc.uid, files[0]);
    setImageUrl(downloadUrl);

    //** Update user.picture */
    const userRef = doc(db, "users", userDoc.uid);
    await updateDoc(userRef, {
      ...userDoc,
      picture: downloadUrl,
    });
  };
  return (
    <>
      <div className={styles.photo} onClick={() => fileRef.current.click()}>
        <img
          src={imageUrl ? imageUrl : userDoc.picture}
          alt=""
          width={"100%"}
        />
      </div>

      <input
        type="file"
        accept=".png,.jpg"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => fileChange(e.target.files)}
      />

      <div
        className={styles.uploadPhotoBtn}
        onClick={() => fileRef.current.click()}
      >
        <ImCamera />
      </div>
    </>
  );
};

const Titles = ({ photos }) => {
  return (
    <div className={styles.titles}>
      <h2>Omar ESSOUFI</h2>
      <h5>2.7K friends</h5>
      <div
        className="d-flex flex-row-reverse"
        style={{ transform: "translate(-35px, 0)" }}
      >
        {photos.map((photo, i) => (
          <FriendsPicture key={i} photo={photo} index={i} />
        ))}
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className={styles.Menu}>
      <div className="d-flex">
        <MenuBtn title={"Posts"} />
        <MenuBtn title={"About"} />
        <MenuBtn title={"Friends"} />
        <MenuBtn title={"Photos"} />
        <MenuBtn title={"Videos"} />
        <MenuBtn title={"Check-ins"} />
        <MenuBtn title={"More"} withArrow={true} />
      </div>
      <div className="d-flex align-items-center">
        <MoreBtn />
      </div>
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="d-flex align-items-end" style={{ marginBottom: "30px" }}>
      <Button
        style={{
          fontWeight: "600",
          width: "150px",
          marginRight: "10px",
        }}
      >
        <BiPlus /> Add to story
      </Button>
      <Button className={styles.editBtn}>
        <MdEdit /> Edit profile
      </Button>
    </div>
  );
};

const ProfileHead = () => {
  const photos = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];
  return (
    <>
      <div className={styles.ProfileHead}>
        <Cover />
        <div className={styles.Wrapper}>
          <div className={styles.titlePhotoWrap}>
            <div className="position-relative">
              <Photo />
              <Titles photos={photos} />
            </div>
            <Buttons />
          </div>
          <Menu />
        </div>
      </div>

      <div className={styles.shadow}></div>

      <div
        className={styles.background}
        style={{ backgroundImage: `url(${coverTest})` }}
      ></div>
    </>
  );
};

export default ProfileHead;
