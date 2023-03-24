import { useGlobalState } from "../../context/GlobalProvider";
import Post from "./Post";
import { calcTime } from "../../utils/calcTime";

/**** ========= MAIN ========= */
export const FillPosts = () => {
  const { posts } = useGlobalState();
  return (
    <>
      {posts.map((post) => {
        const postTime = calcTime(post.time);
        return (
          <Post
            key={post.id}
            post={post}
            PostTime={postTime}
            width={"var(--MiddleContainer-witdh)"}
          />
        );
      })}
    </>
  );
};
