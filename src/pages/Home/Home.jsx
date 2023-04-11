import styles from "./Home.module.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";
import withGuard from "../../utils/withGuard";
import AlertAutoDismiss from "../../components/Alerts/AlertAutoDismiss";
import { useGlobalState } from "../../context/GlobalProvider";

const Home = () => {
  const { isDesktopLarge, isDesktopMedium } = useGlobalState();

  return (
    <div
      className={`${styles.Home} ${styles.Scroll} `}
      style={{
        justifyContent: isDesktopLarge
          ? "center"
          : isDesktopMedium
          ? "left"
          : "center",
      }}
    >
      <LeftSide show={isDesktopLarge} />
      <MainContent />
      <RightSide />
      <AlertAutoDismiss />
    </div>
  );
};

export default withGuard(Home);
