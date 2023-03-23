import React from "react";
import styles from "./LeftSide.module.css";
import livesIcon from "../../../assets/images/livesIn.png";
import fromIcon from "../../../assets/images/from.png";
import photo1 from "../../../assets/images/photos/1.jpg";
import photo2 from "../../../assets/images/photos/2.jpg";
import photo3 from "../../../assets/images/photos/3.jpg";
import photo4 from "../../../assets/images/photos/4.jpg";
import photo5 from "../../../assets/images/photos/5.jpg";
import photo6 from "../../../assets/images/photos/6.jpg";

const CardWrap = ({ children, title, SeeAll }) => {
  return (
    <div className={styles.CardWrap}>
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
const LeftSide = () => {
  return (
    <div className={styles.LeftSideWrap}>
      <CardWrap title={"Info"}>
        <div className={styles.info}>
          <p className="text-center">Write a short personal bio.</p>
          <ButtonInfo title={"Edit bio"} />
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
          <div className="d-flex flex-column gap-4">
            <ButtonInfo title={"Edit details"} />
            <ButtonInfo title={"Add hobbies"} />
            <ButtonInfo title={"Add featured"} />
          </div>
        </div>
      </CardWrap>

      <CardWrap title={"Photos"} SeeAll={"See all photos"}>
        <div className={styles.photos}>
          <PhotoItem photo={photo1} />
          <PhotoItem photo={photo2} />
          <PhotoItem photo={photo3} />
          <PhotoItem photo={photo4} />
          <PhotoItem photo={photo5} />
          <PhotoItem photo={photo6} />
        </div>
      </CardWrap>
    </div>
  );
};

export default LeftSide;
