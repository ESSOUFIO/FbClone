import "./NavbarMiddle.css";
import gameIcon from "../../../assets/images/game2.png";
import marketplaceIcon from "../../../assets/images/marketplace2.png";
import groupsIcon from "../../../assets/images/groups2.png";
import watchIcon from "../../../assets/images/watch2.png";
import homeIcon from "../../../assets/images/home-active.png";
import menuIcon from "../../../assets/images/menu.png";

import { useMediaQuery } from "react-responsive";

/** Icons from react-icons */
import { useNavigate } from "react-router-dom";

const NavbarMiddleIcon = ({ icon, width, style, onClick }) => {
  return (
    <div className="MainIcons" onClick={onClick}>
      <img src={icon} alt="" width={width} style={style} />
    </div>
  );
};

/** =====  NavbarMiddle ===== */
export const NavbarMiddle = () => {
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
            maxWidth: `${isDesktop ? "700px" : isTablet ? "50vw" : "60vw"}`,
            transform: `${isDesktop ? "" : "translate(-50px, 0px)"}`,
          }}
        >
          <NavbarMiddleIcon
            icon={homeIcon}
            width={23}
            onClick={() => navigate("/")}
          />
          <NavbarMiddleIcon
            icon={watchIcon}
            width={23}
            style={{ filter: "invert(70%)" }}
          />
          <NavbarMiddleIcon
            icon={marketplaceIcon}
            width={24}
            style={{ filter: "invert(70%)" }}
          />
          <NavbarMiddleIcon
            icon={groupsIcon}
            width={26}
            style={{ filter: "invert(80%)" }}
          />
          {isTablet && (
            <NavbarMiddleIcon
              icon={gameIcon}
              width={29}
              style={{ filter: "invert(80%)" }}
            />
          )}
          {!isTablet && (
            <NavbarMiddleIcon
              icon={menuIcon}
              width={34}
              style={{ filter: "invert(80%)" }}
            />
          )}
        </div>
      )}
    </>
  );
};
