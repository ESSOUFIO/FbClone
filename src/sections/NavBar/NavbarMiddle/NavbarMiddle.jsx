import "./NavbarMiddle.css";
import gameIcon from "../../../assets/images/game2.png";
import gameIconActive from "../../../assets/images/game-active.png";
import marketplaceIcon from "../../../assets/images/marketplace2.png";
import marketplaceIconActive from "../../../assets/images/marketplace-active.png";
import groupsIcon from "../../../assets/images/groups2.png";
import groupsIconActive from "../../../assets/images/groups-active.png";
import watchIcon from "../../../assets/images/watch2.png";
import watchIconActive from "../../../assets/images/watch-active.png";
import homeIconActive from "../../../assets/images/home-active.png";
import homeIcon from "../../../assets/images/home.png";
import menuIcon from "../../../assets/images/menu.png";
import menuIconActive from "../../../assets/images/menu-active.png";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const NavbarMiddleIcon = ({ icon, iconActive, width, active, onClick }) => {
  return (
    <div className={` ${active ? "MainIconsWrapActive" : "MainIconsWrap"}`}>
      <div
        className={` ${active ? "MainIconsActive" : "MainIcons"}`}
        onClick={onClick}
      >
        {!active && (
          <img
            src={icon}
            alt=""
            width={width}
            style={{ filter: "invert(80%)" }}
          />
        )}
        {active && <img src={iconActive} alt="" width={width} />}
      </div>
    </div>
  );
};

/** =====  NavbarMiddle ===== */
export const NavbarMiddle = ({ navBtn, btnClicked }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1100px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 700px)",
  });
  return (
    <>
      {isMobile && (
        <div
          className="NavbarMiddle"
          style={{
            width: `${
              isDesktop
                ? "600px"
                : isTablet
                ? "50vw"
                : isMobile
                ? "45vw"
                : "60vw"
            }`,
            transform: `${isDesktop ? "" : "translate(-50px, 0px)"}`,
          }}
        >
          <NavbarMiddleIcon
            icon={homeIcon}
            iconActive={homeIconActive}
            width={23}
            active={navBtn[1].active}
            onClick={() => {
              navigate("/");
              btnClicked(navBtn[1].name);
            }}
          />
          <NavbarMiddleIcon
            icon={watchIcon}
            iconActive={watchIconActive}
            width={23}
            active={navBtn[2].active}
            onClick={() => btnClicked(navBtn[2].name)}
          />
          <NavbarMiddleIcon
            icon={marketplaceIcon}
            iconActive={marketplaceIconActive}
            width={24}
            active={navBtn[3].active}
            onClick={() => btnClicked(navBtn[3].name)}
          />
          <NavbarMiddleIcon
            icon={groupsIcon}
            iconActive={groupsIconActive}
            width={26}
            active={navBtn[4].active}
            onClick={() => btnClicked(navBtn[4].name)}
          />
          {isTablet && (
            <NavbarMiddleIcon
              icon={gameIcon}
              iconActive={gameIconActive}
              width={29}
              active={navBtn[5].active}
              onClick={() => btnClicked(navBtn[5].name)}
            />
          )}
          {!isTablet && (
            <NavbarMiddleIcon
              icon={menuIcon}
              iconActive={menuIconActive}
              width={34}
              active={navBtn[6].active}
              onClick={() => {
                navigate("/bookmarks");
                btnClicked(navBtn[6].name);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
