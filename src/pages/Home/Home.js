import "./Home.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";
import { useSession } from "../../context/UserProvider";

export const Home = () => {
  const { user } = useSession();

  return (
    <div className="Home row d-flex">
      <LeftSide />
      <MainContent />
      <RightSide />
    </div>
  );
};
