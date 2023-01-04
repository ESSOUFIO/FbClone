import "./MainContent.css";

/** Local Components */
import { NavbarMiddle } from "../../components/Navbars";
import { Stories } from "../../components/Stories/Stories";

export const MainContent = () => {
  return (
    <div className="MainContent col-6 text-center">
      <NavbarMiddle />
      <Stories />
    </div>
  );
};
