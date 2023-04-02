import "./Home.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";
import withGuard from "../../utils/withGuard";
import AlertAutoDismiss from "../../components/Alerts/AlertAutoDismiss";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isTablet = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <div
      className="Home"
      style={{ justifyContent: `${isTablet ? "space-between" : "center"}` }}
    >
      <LeftSide />
      <MainContent />
      <RightSide />
      <AlertAutoDismiss />
    </div>
  );
};

export default withGuard(Home);
