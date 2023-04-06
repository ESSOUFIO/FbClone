import "./StoriesSection.css";
/*** Local Componants */
import { BouttonsNavLeft } from "..";
import { BouttonsNavRight } from "..";
import { StorieElement } from "..";
import { StorieFirstElement } from "..";
import defaultPic from "../../../assets/images/defProfile.jpg";
import storiesIconActiv from "../../../assets/images/story-active.png";
import reelsIcon from "../../../assets/images/reels.png";
import { useState } from "react";

const StoriesWrap = ({ children, translateBy }) => {
  return (
    <div
      className="StoriesWrap"
      style={{ transform: `translate(${translateBy}px,0)` }}
    >
      {children}
    </div>
  );
};

const ButtonsNav = () => {
  return (
    <div className="ButtonsWrap">
      <div className="StrButtonFirstWrap">
        <div className="StrButtonFirst">
          <img src={storiesIconActiv} alt="" width={22} className="me-2" />
          Stories
        </div>
      </div>
      <div className="StrButtonWrap">
        <div className="StrButton">
          <img
            src={reelsIcon}
            alt=""
            width={22}
            style={{ filter: "invert(70%)" }}
            className="me-2"
          />
          Reels
        </div>
      </div>
    </div>
  );
};

//* ===  Stories List ==== */
export const StoriesSection = ({ userDoc }) => {
  const StoriesList = [
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/200",
      storieImg: "https://picsum.photos/201",
    },
    {
      name: "Perte Barnder",
      UserPhoto: "https://picsum.photos/202",
      storieImg: "https://picsum.photos/203",
    },
    {
      name: "Zendra Aliedra",
      UserPhoto: "https://picsum.photos/204",
      storieImg: "https://picsum.photos/205",
    },
    {
      name: "Daniel LAMBORTIEL",
      UserPhoto: "https://picsum.photos/206",
      storieImg: "https://picsum.photos/207",
    },
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/208",
      storieImg: "https://picsum.photos/209",
    },
    {
      name: "Zendra Aliedra",
      UserPhoto: "https://picsum.photos/210",
      storieImg: "https://picsum.photos/211",
    },
    {
      name: "Daniel LAMBORTIEL",
      UserPhoto: "https://picsum.photos/212",
      storieImg: "https://picsum.photos/213",
    },
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/214",
      storieImg: "https://picsum.photos/215",
    },
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/216",
      storieImg: "https://picsum.photos/217",
    },
  ];

  const [transX, setTransX] = useState(0);

  //** Mapping Storie Elements */
  const StorieContentFirst = userDoc && (
    <StorieFirstElement
      uid={userDoc.uid}
      UserPhoto={userDoc.picture ? userDoc.picture : defaultPic}
    />
  );

  let StorieContent = StoriesList.map((item, i) => (
    <StorieElement
      key={i}
      image={item.storieImg}
      name={item.name}
      UserPhoto={item.UserPhoto}
    />
  ));

  const navRightHandler = () => {
    setTransX(transX - 360);
  };
  const navLeftHandler = () => {
    setTransX(transX + 360);
  };

  return (
    <div className="StoriesSection">
      <ButtonsNav />
      <StoriesWrap translateBy={transX}>
        {StorieContentFirst}
        {StorieContent}
      </StoriesWrap>
      <BouttonsNavRight
        visible={`${transX <= -720 ? "hidden" : "visible"}`}
        onClicked={navRightHandler}
      />
      <BouttonsNavLeft
        visible={`${transX >= 0 ? "hidden" : "visible"}`}
        onClicked={navLeftHandler}
      />
    </div>
  );
};
