import { Post } from "./Post";
import image from "../../assets/images/PostImage.jpg";
import UserPic from "../../assets/images/profile.png";
import { useState, useEffect } from "react";
import axios from "axios";

const GetPosts = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then(setData);
    axios.get("https://jsonplaceholder.typicode.com/users").then(setData);
  }, []);
  if (data) console.log(data.data);
  return (
    <>
      <Post
        UserName="Omar ESSOUFI"
        UserPic={UserPic}
        image={image}
        PostTime={"11h"}
        NbrComments={5}
      />
    </>
  );
};

export const FillPosts = () => {
  return (
    <>
      <GetPosts />
    </>
  );
};
