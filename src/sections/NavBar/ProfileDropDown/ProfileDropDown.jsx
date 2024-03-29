import React from "react";
import { useGlobalState } from "../../../context/GlobalProvider";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import setting from "../../../assets/images/setting.png";
import helpIcon from "../../../assets/images/help.png";
import displayIcon from "../../../assets/images/display.png";
import feedbackIcon from "../../../assets/images/feedback.png";
import logoutIcon from "../../../assets/images/logout.png";
import "./ProfileDropDown.css";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../firebase/auth";
import defaultPic from "../../../assets/images/defProfile.jpg";

const ProfileBtn = ({ img, username, userId, btnClicked }) => {
  const navigate = useNavigate();
  const toProfilePage = () => {
    navigate(`profile/${userId}`);
    btnClicked("profile");
  };

  return (
    <div className="d-flex ProfileBtn" onClick={toProfilePage}>
      <div className="ProfileDropDownImg">
        <img src={img} alt="" width={42} />
      </div>

      <div className="d-flex align-items-center">
        <h6 style={{ fontSize: "17px", color: "var(--color-lighter)" }}>
          {username}
        </h6>
      </div>
    </div>
  );
};

const MenuBtn = ({ img, title, onClick, subMenu = false }) => {
  return (
    <div className="ProfileMenuBtn" onClick={onClick}>
      <div className="d-flex align-items-center">
        <div
          className="Center"
          style={{
            padding: "8px",
            background: "var(--color-dark-less)",
            borderRadius: "100%",
          }}
        >
          <img src={img} alt="" style={{ filter: "invert(90%)" }} />
        </div>
        <div style={{ paddingLeft: "10px", color: "var(--color-lighter)" }}>
          <h6>{title}</h6>
        </div>
      </div>
      {subMenu && (
        <div
          className="Center"
          style={{ fontSize: "24px", filter: "invert(90%)" }}
        >
          <MdOutlineArrowForwardIos />
        </div>
      )}
    </div>
  );
};

const ProfileDropDown = ({ btnClicked }) => {
  const { userDoc } = useGlobalState();
  const userName = userDoc.firstName + " " + userDoc.lastName;
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (error) {
      console.log("Error signout: ", error);
    }
  };

  return (
    <div
      className="ProfileDropDown dropdown-menu"
      style={{
        width: "350px",
        top: "10px",
        right: "10px",
      }}
    >
      <ProfileBtn
        img={userDoc.picture ? userDoc.picture : defaultPic}
        username={userName}
        userId={userDoc.uid}
        btnClicked={btnClicked}
      />
      <hr
        style={{
          marginTop: "5px",
          marginBottom: "10px",
          borderTop: "1px solid var(--color-dark-less)",
        }}
      />
      <MenuBtn img={setting} title={"Setting & privacy"} subMenu={true} />
      <MenuBtn img={helpIcon} title={"Help & support"} subMenu={true} />
      <MenuBtn
        img={displayIcon}
        title={"Display & accessibility"}
        subMenu={true}
      />
      <MenuBtn img={feedbackIcon} title={"Give feedback"} />
      <MenuBtn img={logoutIcon} title={"Logout"} onClick={logoutHandler} />
      <p
        style={{
          fontSize: "12px",
          color: "var(--color-light)",
          margin: "0 5px",
        }}
      >
        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta ©
        2023
      </p>
    </div>
  );
};

export default ProfileDropDown;
