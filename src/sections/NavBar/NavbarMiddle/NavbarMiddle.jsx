import "./NavbarMiddle.css";
import gameIcon from "../../../assets/images/game2.png";
import marketplaceIcon from "../../../assets/images/marketplace2.png";
import groupsIcon from "../../../assets/images/groups2.png";
import watchIcon from "../../../assets/images/watch2.png";
import homeIcon from "../../../assets/images/home-active.png";

/** Icons from react-icons */
import { useNavigate } from "react-router-dom";

/** =====  NavbarMiddle ===== */
export const NavbarMiddle = () => {
  const navigate = useNavigate();
  return (
    <div className="NavbarMiddle">
      <div className="MainIcons" onClick={() => navigate("/")}>
        <img src={homeIcon} alt="" width={23} />
      </div>
      <div className="MainIcons">
        <img
          src={watchIcon}
          alt=""
          width={23}
          style={{ filter: "invert(70%)" }}
        />
      </div>
      <div className="MainIcons">
        <img
          src={marketplaceIcon}
          alt=""
          width={24}
          style={{ filter: "invert(70%)" }}
        />
      </div>
      <div className="MainIcons">
        <img
          src={groupsIcon}
          alt=""
          width={26}
          style={{ filter: "invert(80%)" }}
        />
      </div>
      <div className="MainIcons">
        <img
          src={gameIcon}
          alt=""
          width={29}
          style={{ filter: "invert(80%)" }}
        />
      </div>
    </div>
  );
};
