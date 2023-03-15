import "./Home.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";
import withGuard from "../../utils/withGuard";
import AlertAutoDismiss from "../../components/Alerts/AlertAutoDismiss";

const Home = () => {
  return (
    <div className="Home">
      <LeftSide />
      <MainContent />
      <RightSide />
      <AlertAutoDismiss />
    </div>
  );
};

export default withGuard(Home);
