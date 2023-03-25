import "./LeftSide.css";

/** Local Components */
import { SideButtons } from "../../components/Buttons";
import { ShortcutButton } from "../../components/Buttons";
import { TitleSection } from "../../components/Titles/TitleSection";

/** Icons from react-icons */
import { IoIosArrowDown } from "react-icons/io";

/*** Images */
import Friends from "../../assets/images/Friends.png";
import Groups from "../../assets/images/Groups.png";
import MostRecents from "../../assets/images/Most recents.png";
import Marketplace from "../../assets/images/Marketplace.png";
import Watch from "../../assets/images/Watch.png";
import Aljazeera from "../../assets/images/AlJazeera.jpg";
import WorldStreet from "../../assets/images/WorldStreet.png";
import WorldCup from "../../assets/images/2022-WorldCup.jpg";
import Flowers from "../../assets/images/flowers.jpg";
import SavePage from "../../assets/images/save-page.png";
import { useGlobalState } from "../../context/GlobalProvider";
import defaultPic from "../../assets/images/defProfile.jpg";

/** Internal Components */
const TopLeftWrapper = (props) => {
  return <div className="TopLeftWrapper">{props.children}</div>;
};

const SeeMoreBtn = () => {
  return (
    <div className="SeeMoreBtn">
      <div className="SeeMoreIcon">
        <IoIosArrowDown />
      </div>
      <span>See more</span>
    </div>
  );
};

const YourShortcutsWrap = (props) => {
  return <div className="YourShortcutsWrap">{props.children}</div>;
};

const FooterSide = ({ text }) => {
  return <span className="footerSide">{text} . </span>;
};

/** ======= LeftSide ======= */
export const LeftSide = () => {
  const { userDoc } = useGlobalState();
  const userName = userDoc.firstName + " " + userDoc.lastName;
  return (
    <div className="LeftSide col-3 text-left">
      <div className="GlobalSide">
        {/* ==== First Section === */}

        <TopLeftWrapper>
          <SideButtons
            image={userDoc.picture ? userDoc.picture : defaultPic}
            text={userName}
            height={"29px"}
            style={{ borderRadius: "100%" }}
            page={"profile"}
          />
          <SideButtons image={Friends} text={"Friends"} height={"23px"} />
          <SideButtons
            image={SavePage}
            text={"Saved"}
            height={"23px"}
            page={"/saved"}
          />
          <SideButtons image={Groups} text={"Groups"} height={"23px"} />
          <SideButtons
            image={MostRecents}
            text={"Most Recents"}
            height={"23px"}
          />
          <SideButtons
            image={Marketplace}
            text={"Marketplace"}
            height={"23px"}
          />
          <SideButtons image={Watch} text={"Watch"} height={"23px"} />
          <SeeMoreBtn />
        </TopLeftWrapper>

        {/* ==== Second Section === */}

        <YourShortcutsWrap>
          <TitleSection text={"Your shortcuts"} colour="var(--color-light)" />
          <ShortcutButton
            image={Aljazeera}
            text={"Al Jazeera قناة الجزيرة"}
            height={"26px"}
          />
          <ShortcutButton
            image={WorldStreet}
            text={"World Street English"}
            height={"26px"}
          />
          <ShortcutButton
            image={WorldCup}
            text={"FIFA World Cup Qatar 2022"}
            height={"26px"}
          />
          <ShortcutButton
            image={Flowers}
            text={"الكلم الطيب من القلب"}
            height={"26px"}
          />
          <SeeMoreBtn />
        </YourShortcutsWrap>
        <div className="footerSideWrap">
          <FooterSide text="Privacy" />
          <FooterSide text="Terms" />
          <FooterSide text="Advertising" />
          <FooterSide text="Ad Choices" />
          <FooterSide text="Cookies" />
          <FooterSide text="Privacy" /> · Meta © 2023
        </div>
      </div>
    </div>
  );
};
