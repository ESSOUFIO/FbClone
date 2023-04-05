import "./MainContent.css";

/** Local Components */
import { StoriesSection } from "../../components/Stories";
import NewPost from "../../components/NewPost/NewPost";
import { FillPosts } from "../../components/Post/FillPosts";
import AddPost from "../../components/Post/Modals/AddPost";
import { useState } from "react";
import { useGlobalState } from "../../context/GlobalProvider";

const Container = ({ children, isMobile }) => {
  return (
    <div
      className="Container"
      style={{
        width: `${isMobile ? "var(--MiddleContainer-witdh)" : "100%"}`,
        padding: `${isMobile ? "0 10px" : "0 5px"}`,
      }}
    >
      {children}
    </div>
  );
};

export const MainContent = ({ isDesktopMedium, isMobile }) => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const { userDoc } = useGlobalState();

  return (
    <>
      <div
        className="MainContent"
        style={{
          transform: `${
            isDesktopMedium ? "translate(-15px, 0px)" : "translate(0, 0)"
          }`,
          width: `${isMobile ? "650px" : "97vw"}`,
        }}
      >
        <Container isMobile={isMobile}>
          <StoriesSection userDoc={userDoc} />
          <NewPost
            showAddPost={showAddPost}
            width={"var(--MiddleContainer-witdh)"}
            isDesktopMedium={isDesktopMedium}
            isMobile={isMobile}
          />
          <FillPosts />
        </Container>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};
