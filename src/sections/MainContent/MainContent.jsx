import "./MainContent.css";

/** Local Components */
import { NavbarMiddle } from "../../components/Navbars";
import { StoriesSection } from "../../components/Stories";
import { NewPost } from "../../components/NewPost/NewPost";
import { FillPosts } from "../../components/Post/FillPosts";
import AddPost from "../../components/Post/Modals/AddPost";
import { useState } from "react";
import { useGlobalState } from "../../context/GlobalProvider";

const Container = ({ children }) => {
  return <div className="Container">{children}</div>;
};

export const MainContent = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const { user } = useGlobalState();
  return (
    <>
      <div className="MainContent col-6">
        <NavbarMiddle />
        <Container>
          <StoriesSection uid={user.uid} />
          <NewPost showAddPost={showAddPost} />
          <FillPosts />
        </Container>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};
