import styles from "./Home.module.css";
import { LeftSide } from "../../sections/index";
import { MainContent } from "../../sections/index";
import { RightSide } from "../../sections/index";
import withGuard from "../../utils/withGuard";
import AlertAutoDismiss from "../../components/Alerts/AlertAutoDismiss";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isDesktopMedium = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 550px)",
  });
  return (
    <div
      className={`${styles.Home} ${styles.Scroll} `}
      style={{
        justifyContent: isDesktopMedium ? "space-between" : "center",
      }}
    >
      <LeftSide show={isDesktopOrLaptop} />
      <MainContent isDesktopMedium={isDesktopMedium} isMobile={isMobile} />
      <RightSide />
      <AlertAutoDismiss />
    </div>
  );
};

export default withGuard(Home);
