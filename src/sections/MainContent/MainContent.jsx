import "./MainContent.css";

/** Local Components */
import { StoriesSection } from "../../components/Stories";
import NewPost from "../../components/NewPost/NewPost";
import { FillPosts } from "../../components/Post/FillPosts";
import AddPost from "../../components/Post/Modals/AddPost";
import { useState } from "react";
import { useGlobalState } from "../../context/GlobalProvider";

const Container = ({ children, isMobile, isMobileSmall }) => {
  return (
    <div
      className="Container"
      style={{
        width: isMobile ? "var(--MiddleContainer-witdh)" : "100%",
        padding: isMobile ? "0 10px" : isMobileSmall ? "0 5px" : "0",
        gap: isMobileSmall ? "15px" : "8px",
        marginTop: isMobileSmall ? "25px" : "10px",
      }}
    >
      {children}
    </div>
  );
};

export const MainContent = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const { userDoc, isMobile, isMobileSmall, isDesktopMedium } =
    useGlobalState();

  return (
    <>
      <div
        className="MainContent"
        style={{
          transform: isDesktopMedium
            ? "translate(-15px, 0px)"
            : "translate(0, 0)",
          width: isMobile ? "650px" : "97vw",
        }}
      >
        <Container isMobile={isMobile} isMobileSmall={isMobileSmall}>
          <StoriesSection userDoc={userDoc} showAddPost={showAddPost} />
          <NewPost
            showAddPost={showAddPost}
            width={"var(--MiddleContainer-witdh)"}
          />
          <FillPosts />
        </Container>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};
