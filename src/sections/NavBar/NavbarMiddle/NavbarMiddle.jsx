import "./NavbarMiddle.css";

/** Icons from react-icons */
import { AiFillHome } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SiFacebookgaming } from "react-icons/si";
import { useNavigate } from "react-router-dom";

/** =====  NavbarMiddle ===== */
export const NavbarMiddle = () => {
  const navigate = useNavigate();
  return (
    <div className="NavbarMiddle">
      <div className="MainIcons" onClick={() => navigate("/")}>
        <AiFillHome />
      </div>
      <div className="MainIcons">
        <MdOndemandVideo />
      </div>
      <div className="MainIcons">
        <TbBuildingStore />
      </div>
      <div className="MainIcons">
        <HiOutlineUserGroup />
      </div>
      <div className="MainIcons">
        <SiFacebookgaming />
      </div>
    </div>
  );
};
