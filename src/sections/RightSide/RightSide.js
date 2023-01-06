import "./RightSide.css";

//* ===  External Components ==== */
import { NavbarRight } from "../../components/Navbars";
import { TitleSection } from "../../components/Titles/TitleSection";
import {
  AdsButton,
  SideButtons,
  YourPageButton,
  FriendRequestBtn,
  BirthdayButton,
  ContactButton,
} from "../../components/Buttons";

//* === Images ==== */
import logoPage from "../../assets/images/logoPage-light.png";
import ImageProfile from "../../assets/images/FriendPicture.png";
import BirthdayImg from "../../assets/images/birthday.png";
import MessageIco from "../.././assets/images/Messages.png";
import NotificationIco from "../.././assets/images/Notifications.png";
import SwitchIco from "../.././assets/images/SwitchIntoPage.png";
import PromoIco from "../.././assets/images/Promotions.png";

//* === Icons from React-icons ==== */
import { TiMessages } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineCampaign } from "react-icons/md";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";

//* ===  Internal Components ==== */
const SponsoredWrap = (props) => {
  return <div className="SponsoredWrap">{props.children}</div>;
};

const YourPagesWrap = (props) => {
  return <div className="YourPagesWrap">{props.children}</div>;
};

const FriendRequest = (props) => {
  return <div className="FriendRequest">{props.children}</div>;
};

const BirthdaysWrap = (props) => {
  return <div className="BirthdaysWrap">{props.children}</div>;
};

const ContactsWrap = (props) => {
  return <div className="ContactsWrap">{props.children}</div>;
};

const ContactsList = () => {
  return Contacts.map((item, i) => {
    let link = "https://picsum.photos/20" + i;
    return <ContactButton key={i} image={link} text={item} height={"30px"} />;
  });
};

//* ===  Contacts List ==== */
const Contacts = [
  "Amin Harger",
  "Daoued Dhiab",
  "Med BARDOUR",
  "Fatma Fourat",
  "Sarat Serfi",
  "Taher Tarek",
  "Sami Benali",
];

export const RightSide = () => {
  return (
    <div className="RightSide col-3">
      <NavbarRight />
      {/* This div may used to add scrolls after*/}
      <div className="GlobalSide">
        {/* ==== SponsoredWrap === */}
        <SponsoredWrap>
          <TitleSection text="Sponsored" colour="var(--color-lighter)" />
          <AdsButton title="Apply Now | Company" website="adscompany.com" />
        </SponsoredWrap>
        {/* ==== YourPagesWrap === */}
        <YourPagesWrap>
          <TitleSection
            text="Your Pages and profiles"
            colour="var(--color-light)"
            more={<TfiMoreAlt />}
          />
          <SideButtons image={logoPage} height="30px" text="Creative D2H" />
          <div className="d-flex flex-column justify-content-end">
            <div>
              <YourPageButton icon={MessageIco} text="13 Messages" />
              <YourPageButton icon={NotificationIco} text="20+ Notifications" />
              <YourPageButton icon={SwitchIco} text="Switch into Page" />
              <YourPageButton icon={PromoIco} text="Create promotion" />
            </div>
          </div>
        </YourPagesWrap>
        {/* ==== FriendRequest === */}
        <FriendRequest>
          <TitleSection text="Friend requests" colour="var(--color-light)" />
          <FriendRequestBtn
            image={ImageProfile}
            text="Ali Benjalel"
            height={"55px"}
          />
        </FriendRequest>
        {/* ==== BirthdaysWrap === */}
        <BirthdaysWrap>
          <TitleSection text="Birthdays" colour="var(--color-light)" />
          <BirthdayButton
            image={BirthdayImg}
            height="28px"
            text="Med Sourad"
            NbrOther="2 others"
          />
        </BirthdaysWrap>
        {/* ==== ContactsWrap === */}
        <ContactsWrap>
          <TitleSection
            text="Contacts"
            colour="var(--color-light)"
            more={<TfiMoreAlt />}
            search={<FaSearch />}
            newCall={<RiVideoAddFill />}
          />
          <ContactsList />
        </ContactsWrap>
      </div>
    </div>
  );
};
