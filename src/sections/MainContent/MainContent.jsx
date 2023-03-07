import "./MainContent.css";

/** Local Components */
import { NavbarMiddle } from "../../components/Navbars";
import { StoriesSection } from "../../components/Stories";
import { NewPost } from "../../components/NewPost/NewPost";
import { FillPosts } from "../../components/Post/FillPosts";
import AddPost from "../../components/Modals/AddPost";
import { useState } from "react";

const Container = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export const MainContent = () => {
  const [addPostV, setAddPostV] = useState(false);

  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);

  return (
    <>
      <div className="MainContent col-6">
        <NavbarMiddle />
        <Container>
          <StoriesSection />
          <NewPost showAddPost={showAddPost} />
          <FillPosts />
        </Container>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};
