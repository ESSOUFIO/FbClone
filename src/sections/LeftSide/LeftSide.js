import "./LeftSide.css";
import { NavbarLeft } from "../../components/index";
import { SideButtons } from "../../components/index";
import { IoIosArrowDown } from "react-icons/io";
import { ShortcutButton } from "../../components/Buttons/ShortcutButton";

import Profile from "../../assets/images/profile.png";
import Friends from "../../assets/images/Friends.png";
import Groups from "../../assets/images/Groups.png";
import MostRecents from "../../assets/images/Most recents.png";
import Marketplace from "../../assets/images/Marketplace.png";
import Watch from "../../assets/images/Watch.png";
import Aljazeera from "../../assets/images/AlJazeera.jpg";
import WorldStreet from "../../assets/images/WorldStreet.png";
import WorldCup from "../../assets/images/2022-WorldCup.jpg";
import Flowers from "../../assets/images/flowers.jpg";

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
export const LeftSide = () => {
  return (
    <div className="LeftSide col-3 text-left">
      <NavbarLeft />
      <TopLeftWrapper>
        <SideButtons image={Profile} text={"Omar ESSOUFI"} height={"28px"} />
        <SideButtons image={Friends} text={"Friends"} height={"23px"} />
        <SideButtons image={Groups} text={"Groups"} height={"23px"} />
        <SideButtons
          image={MostRecents}
          text={"Most Recents"}
          height={"23px"}
        />
        <SideButtons image={Marketplace} text={"Marketplace"} height={"23px"} />
        <SideButtons image={Watch} text={"Watch"} height={"23px"} />
        <SeeMoreBtn />
      </TopLeftWrapper>
      <YourShortcutsWrap>
        <h6>Your shortcuts</h6>
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
    </div>
  );
};
