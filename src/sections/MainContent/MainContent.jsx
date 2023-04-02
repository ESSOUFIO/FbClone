import "./MainContent.css";

/** Local Components */
import { StoriesSection } from "../../components/Stories";
import NewPost from "../../components/NewPost/NewPost";
import { FillPosts } from "../../components/Post/FillPosts";
import AddPost from "../../components/Post/Modals/AddPost";
import { useState } from "react";
import { useGlobalState } from "../../context/GlobalProvider";
import { useMediaQuery } from "react-responsive";

const Container = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export const MainContent = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const { user } = useGlobalState();
  const isTablet = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <>
      <div
        className="MainContent"
        style={{ transform: `${isTablet ? "translate(-15px, 0px)" : ""}` }}
      >
        <Container>
          <StoriesSection uid={user.uid} />
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
