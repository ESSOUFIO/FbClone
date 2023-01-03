import "./Home.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";

export const Home = () => {
  return (
    <div className="Home row d-flex">
      <LeftSide />
      <MainContent />
      <RightSide />
    </div>
  );
};
