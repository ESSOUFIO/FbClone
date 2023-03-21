import React from "react";
import styles from "./ProfileHead.module.css";
import coverTest from "../../../assets/images/cover.jpg";
import { ImCamera } from "react-icons/im";
import UserPhoto from "../../../assets/images/omar.jpg";
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

const ProfileHead = () => {
  const photos = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];
  return (
    <>
      <div className={styles.ProfileHead}>
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${coverTest})` }}
        >
          <div className={styles.btnCover}>
            <ImCamera />
            <span style={{ marginLeft: "6px" }}>Edit cover photo</span>
          </div>
        </div>
        <div className={styles.Wrapper}>
          <div className={styles.titlePhotoWrap}>
            <div className="position-relative">
              <div className={styles.photo}>
                <img src={UserPhoto} alt="" width={"100%"} />
              </div>

              <div className={styles.uploadPhotoBtn}>
                <ImCamera />
              </div>

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
            </div>
            <div
              className="d-flex align-items-end"
              style={{ marginBottom: "30px" }}
            >
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
          </div>

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
