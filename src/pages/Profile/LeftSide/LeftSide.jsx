import React from "react";
import styles from "./LeftSide.module.css";

const CardWrap = ({ children, title, SeeAll }) => {
  return (
    <div className={styles.CardWrap}>
      <div className="d-flex justify-content-between">
        <h4>{title}</h4>
        {!!SeeAll && <div className={styles.SeeAll}>{SeeAll}</div>}
      </div>
      {children}
    </div>
  );
};

const ButtonInfo = ({ title }) => {
  return <div></div>;
};
const LeftSide = () => {
  return (
    <>
      <CardWrap title={"Info"} SeeAll={"See all"}>
        <div className={styles.info}>
          <p>Write a short personal bio.</p>
        </div>
      </CardWrap>
    </>
  );
};

export default LeftSide;
