import { Post } from "./Post";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const GetLast = ({ x }) => {
  return <h1 id="last">{x}</h1>;
};

const GetPosts = ({ page }) => {
  const [data, setData] = useState(null);
  let PostsToShow;

  let url = `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`;
  let id, username, photoProfileURL, postBody, postTime;
  let postImage, NbrComments;
  let UserID, AuthorID;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    UserID = user.id;
  }

  useEffect(() => {
    axios.get(url).then(setData);
  }, []);

  if (data) {
    PostsToShow = data.data.data.map((post) => {
      id = post.id;
      username = post.author.username;
      photoProfileURL = post.author.profile_image;
      postBody = post.body;
      postImage = post.image;
      postTime = post.created_at;
      NbrComments = post.comments_count;
      AuthorID = post.author.id;
      // console.log(id);
      return (
        <Post
          key={id}
          id={id}
          UserName={username}
          UserPic={photoProfileURL}
          Text={postBody}
          image={postImage}
          PostTime={postTime}
          NbrComments={NbrComments}
        />
      );
    });

    // console.log(data.data.meta.last_page);
    localStorage.setItem("lastPage", data.data.meta.last_page);
  }

  // lastPage = LastPage();
  // console.log(lastPage);
  return PostsToShow;
};

/**** ========= MAIN ========= */
export const FillPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let lastPage = 1;

  const [ListPosts, setListPosts] = useState([
    <GetPosts key={Math.random()} page={currentPage} />,
  ]);

  lastPage = lastPage === 1 ? localStorage.getItem("lastPage") : 1;
  // console.log(lastPage);
  window.addEventListener("scroll", (event) => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.scrollHeight;

    if (endOfPage && currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
      //*** ADD POSTS ***/
      setListPosts(
        ListPosts.concat(<GetPosts key={Math.random()} page={currentPage} />)
      );
    }

    // console.log(
    //   window.innerHeight,
    //   window.pageYOffset,
    //   document.body.offsetHeight,
    //   "endOfPage: " + endOfPage,
    //   "currentPage: " + currentPage
    // );
  });

  return <>{ListPosts}</>;
};
