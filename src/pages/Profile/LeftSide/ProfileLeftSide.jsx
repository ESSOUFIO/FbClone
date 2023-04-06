import React from "react";
import styles from "./ProfileLeftSide.module.css";
import livesIcon from "../../../assets/images/livesIn.png";
import fromIcon from "../../../assets/images/from.png";
import photo1 from "../../../assets/images/photos/1.jpg";
import photo2 from "../../../assets/images/photos/2.jpg";
import photo3 from "../../../assets/images/photos/3.jpg";
import photo4 from "../../../assets/images/photos/4.jpg";
import photo5 from "../../../assets/images/photos/5.jpg";
import photo6 from "../../../assets/images/photos/6.jpg";
import friend1 from "../../../assets/images/friends/1.jpg";
import friend2 from "../../../assets/images/friends/2.jpg";
import friend3 from "../../../assets/images/friends/3.jpg";
import friend4 from "../../../assets/images/friends/4.jpg";
import friend5 from "../../../assets/images/friends/5.jpg";
import friend6 from "../../../assets/images/friends/6.jpg";

const CardWrap = ({ children, title, SeeAll, isDesktopMedium, isMobile }) => {
  return (
    <div
      className={styles.CardWrap}
      style={{
        maxWidth: `${isDesktopMedium ? "" : isMobile ? "500px" : "100%"}`,
      }}
    >
      <div className="d-flex justify-content-between">
        <h5>{title}</h5>
        {!!SeeAll && <div className={styles.SeeAll}>{SeeAll}</div>}
      </div>
      {children}
    </div>
  );
};

const PhotoItem = ({ photo }) => {
  return (
    <div
      className={styles.photoItem}
      style={{ backgroundImage: `url(${photo})` }}
    ></div>
  );
};

const ButtonInfo = ({ title }) => {
  return <div className={styles.ButtonInfo}>{title}</div>;
};

const FriendItem = ({ friendImg, name }) => {
  return (
    <div className={styles.friendItem}>
      <div
        className={styles.friendItemPhoto}
        style={{ backgroundImage: `url(${friendImg})` }}
      ></div>
      <h6>{name}</h6>
    </div>
  );
};

const ProfileLeftSide = ({ isDesktopMedium, isMobile, isMyProfile }) => {
  return (
    <div
      className={styles.LeftSideWrap}
      style={{
        maxWidth: `${isDesktopMedium ? "345px" : "100vw"}`,
      }}
    >
      <CardWrap
        title={"Info"}
        isDesktopMedium={isDesktopMedium}
        isMobile={isMobile}
      >
        <div className={styles.info}>
          <p className="text-center">Write a short personal bio.</p>
          {isMyProfile && <ButtonInfo title={"Edit bio"} />}
          <div className="my-3">
            <img
              src={livesIcon}
              alt=""
              style={{ marginRight: "10px", filter: "invert(50%)" }}
            />
            <span>
              Lives in <b>Your city</b>
            </span>
          </div>
          <div className="my-3">
            <img
              src={fromIcon}
              alt=""
              style={{ marginRight: "10px", filter: "invert(50%)" }}
            />
            <span>
              From <b>Your hometown</b>
            </span>
          </div>
          {isMyProfile && (
            <div className="d-flex flex-column gap-4">
              <ButtonInfo title={"Edit details"} />
              <ButtonInfo title={"Add hobbies"} />
              <ButtonInfo title={"Add featured"} />
            </div>
          )}
        </div>
      </CardWrap>

      <CardWrap
        title={"Photos"}
        SeeAll={"See all photos"}
        isDesktopMedium={isDesktopMedium}
        isMobile={isMobile}
      >
        <div className={styles.photos}>
          <PhotoItem photo={photo1} />
          <PhotoItem photo={photo2} />
          <PhotoItem photo={photo3} />
          <PhotoItem photo={photo4} />
          <PhotoItem photo={photo5} />
          <PhotoItem photo={photo6} />
        </div>
      </CardWrap>

      <CardWrap
        title={"Friends"}
        SeeAll={"See all friends"}
        isDesktopMedium={isDesktopMedium}
        isMobile={isMobile}
      >
        <div className={styles.friendsWrap}>
          <p>1,085 friends</p>
          <div className={styles.friends}>
            <FriendItem friendImg={friend1} name={"Ali Mdiri"} />
            <FriendItem friendImg={friend2} name={"Maroua Dridi"} />
            <FriendItem friendImg={friend3} name={"Ibrahim Abser"} />
            <FriendItem friendImg={friend4} name={"Malik Dibra"} />
            <FriendItem friendImg={friend5} name={"Samir Bend"} />
            <FriendItem friendImg={friend6} name={"Abir Mrige"} />
          </div>
        </div>
      </CardWrap>

      <div className={styles.footer}>
        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta ·
        Omar Essoufi © 2023
      </div>
    </div>
  );
};

export default ProfileLeftSide;
