import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileHead.module.css";
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
import defaultPic from "../../../assets/images/defProfile.jpg";
import defaultCover from "../../../assets/images/defCover.png";
import { useGlobalState } from "../../../context/GlobalProvider";
import { uploadProfilePicture, uploadCoverPhoto } from "../../../firebase/user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useMediaQuery } from "react-responsive";

const Cover = ({ isDesktop }) => {
  const fileRef = useRef();
  const { userDoc } = useGlobalState();
  const [imageUrl, setImageUrl] = useState(null);

  const fileChange = async (files) => {
    if (!files[0]) return;
    const downloadUrl = await uploadCoverPhoto(userDoc.uid, files[0]);
    setImageUrl(downloadUrl);

    //** Update user.picture */
    const userRef = doc(db, "users", userDoc.uid);
    await updateDoc(userRef, {
      ...userDoc,
      coverPhoto: downloadUrl,
    });
  };

  useEffect(() => {
    if (userDoc?.coverPhoto) {
      setImageUrl(userDoc.coverPhoto);
    } else setImageUrl(defaultCover);
  }, [userDoc]);
  return (
    <>
      <div
        className={styles.cover}
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: `${isDesktop ? "400px" : "45vw"}`,
        }}
      >
        <div
          className={styles.btnCover}
          onClick={() => fileRef.current.click()}
          style={{ padding: `${isDesktop ? "7px 14px" : "10px 14px"}` }}
        >
          <ImCamera />
          {isDesktop && (
            <span style={{ marginLeft: "6px" }}>Edit cover photo</span>
          )}
        </div>

        <input
          type="file"
          accept=".png,.jpg"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={(e) => fileChange(e.target.files)}
        />
      </div>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </>
  );
};

const FriendsPicture = ({ photo, index }) => {
  return (
    <div
      className={styles.friendsPic}
      style={{
        zIndex: `${index}`,
        transform: `translate(${index * 5}px, 0)`,
        backgroundImage: `url(${photo})`,
      }}
    >
      {/* <img src={photo} alt="" width={"100%"} /> */}
    </div>
  );
};

const MenuBtn = ({ title, setActive, active = false, withArrow = false }) => {
  return (
    <div className={`${active ? styles.MenuBtnWrap : ""}`}>
      <div
        className={`${styles.MenuBtn} ${active && styles.MenuBtnActive}`}
        onClick={() => setActive(title)}
      >
        {title}
        {withArrow && (
          <span style={{ marginLeft: "2px" }}>
            <IoMdArrowDropdown />
          </span>
        )}
      </div>
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

const Photo = ({ isDesktop }) => {
  const { userDoc } = useGlobalState();
  const fileRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const fileChange = async (files) => {
    if (!files[0]) return;
    const downloadUrl = await uploadProfilePicture(userDoc.uid, files[0]);
    setImageUrl(downloadUrl);

    //** Update user.picture */
    const userRef = doc(db, "users", userDoc.uid);
    await updateDoc(userRef, {
      ...userDoc,
      picture: downloadUrl,
    });
  };

  useEffect(() => {
    if (userDoc?.picture) {
      setImageUrl(userDoc.picture);
    } else setImageUrl(defaultPic);
  }, [userDoc]);

  return (
    <>
      <div
        className={styles.photoWrap}
        onClick={() => fileRef.current.click()}
        style={{ transform: `${isDesktop ? "translate(0, -30px)" : ""}` }}
      >
        <div className={styles.photo}>
          <img src={imageUrl} alt="" width={"100%"} />
        </div>
        <div
          className={styles.uploadPhotoBtn}
          onClick={() => fileRef.current.click()}
        >
          <ImCamera />
        </div>
      </div>

      <input
        type="file"
        accept=".png,.jpg"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={(e) => fileChange(e.target.files)}
      />
    </>
  );
};

const Titles = ({ photos, username, isDesktop }) => {
  return (
    <div
      className={styles.titles}
      style={{
        textAlign: `${isDesktop ? "left" : "center"}`,
        gap: "2px",
        transform: `${isDesktop ? "translate(-50px, 25px)" : ""}`,
      }}
    >
      <h2>{username}</h2>
      <h5 style={{ fontSize: "19px", marginBottom: "5px" }}>1,085 friends</h5>
      <div
        className={styles.friendsPicWrap}
        style={{ transform: `${isDesktop ? "translate(-37px,0)" : ""}` }}
      >
        {photos.map((photo, i) => (
          <FriendsPicture key={i} photo={photo} index={i} />
        ))}
      </div>
    </div>
  );
};

const Menu = () => {
  const [menu, setMenu] = useState([
    {
      title: "Posts",
      active: true,
    },
    {
      title: "About",
      active: false,
    },
    {
      title: "Friends",
      active: false,
    },
    {
      title: "Photos",
      active: false,
    },
    {
      title: "Videos",
      active: false,
    },
    {
      title: "Check-ins",
      active: false,
    },
    {
      title: "More",
      active: false,
    },
  ]);

  const setActive = (btnClicked) => {
    const menuUpdated = menu.map((btn) => {
      if (btn.title === btnClicked) {
        return { title: btn.title, active: true };
      } else return { title: btn.title, active: false };
    });
    setMenu(menuUpdated);
  };

  return (
    <div className={styles.Menu}>
      <div className="d-flex">
        <MenuBtn
          title={"Posts"}
          setActive={setActive}
          active={menu[0].active}
        />
        <MenuBtn
          title={"About"}
          setActive={setActive}
          active={menu[1].active}
        />
        <MenuBtn
          title={"Friends"}
          setActive={setActive}
          active={menu[2].active}
        />
        <MenuBtn
          title={"Photos"}
          setActive={setActive}
          active={menu[3].active}
        />
        <MenuBtn
          title={"Videos"}
          setActive={setActive}
          active={menu[4].active}
        />
        <MenuBtn
          title={"Check-ins"}
          setActive={setActive}
          active={menu[5].active}
        />
        <MenuBtn
          title={"More"}
          setActive={setActive}
          withArrow={true}
          active={menu[6].active}
        />
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
          border: "none",
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
  const { userDoc } = useGlobalState();
  const friendsPhotos = [
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
  ];
  const username = userDoc.firstName + " " + userDoc.lastName;
  const isDesktop = useMediaQuery({
    query: "(min-width: 950px)",
  });
  return (
    <>
      <div className={styles.ProfileHead}>
        <Cover isDesktop={isDesktop} />
        <div
          className={styles.Wrapper}
          style={{
            transform: `${isDesktop ? "" : "translate(0, -80px)"}`,
          }}
        >
          <div
            className={styles.titlePhotoWrap}
            style={{
              flexDirection: `${isDesktop ? "row" : "column"}`,
              justifyContent: `${isDesktop ? "space-between" : ""}`,
              alignItems: `${isDesktop ? "" : "center"}`,
              gap: `${isDesktop ? "" : "15px"}`,
            }}
          >
            <Photo isDesktop={isDesktop} />
            <Titles
              photos={friendsPhotos}
              username={username}
              isDesktop={isDesktop}
            />
            <Buttons />
          </div>
          <Menu />
        </div>
      </div>

      <div className={styles.shadow}></div>
    </>
  );
};

export default ProfileHead;
