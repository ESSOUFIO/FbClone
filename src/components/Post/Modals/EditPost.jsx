import "./PostModals.css";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
/** icons */
import { HiGlobe } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
/** images */
import squareBg from "../../../assets/images/square-bg.png";
import photoIcon from "../../../assets/images/photo-video.png";
import share from "../../../assets/images/share-with.png";
import feeling from "../../../assets/images/PostFeeling.png";
import checkin from "../../../assets/images/checkin.png";
import flag from "../../../assets/images/flag.png";

/** other */
import { useGlobalState } from "../../../context/GlobalProvider";
import { updatePost } from "../../../firebase/post";
import MyModal from "../../MyModal/MyModal";

const Icon = ({ image }) => {
  return (
    <div className="Icon">
      <img src={image} alt="" width={25} />
    </div>
  );
};

const Profile = ({ userDoc }) => {
  const userName = userDoc.firstName + " " + userDoc.lastName;
  return (
    <div className="d-flex">
      <div className="d-flex align-items-center">
        <img
          src={userDoc.picture}
          alt=""
          width={42}
          height={42}
          style={{ borderRadius: "100%" }}
        />
      </div>

      <div className="ms-2">
        <h6 className="m-0 p-0" style={{ fontSize: "14px" }}>
          {userName}
        </h6>
        <div className="profileBtn">
          <div className="d-flex align-items-center gap-1">
            <HiGlobe /> Public <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

const InputArea = ({ postText, text, photoUrl }) => {
  const fontSize = photoUrl ? "16px" : "20px";
  const nbrRows = photoUrl ? 2 : 3;
  return (
    <div className="mb-2">
      <textarea
        type="text"
        rows={nbrRows}
        className="InputText"
        placeholder="What's on your mind, Omar?"
        onChange={(e) => postText(e.target.value)}
        value={text}
        style={{ fontSize: fontSize }}
        autoFocus
      />
      {!photoUrl && (
        <div className="d-flex justify-content-between">
          <div>
            <img
              src={squareBg}
              alt=""
              width={40}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className="fs-2"
            style={{ color: "var(--color-light)", cursor: "pointer" }}
          >
            <GrEmoji />
          </div>
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const inputRef = useRef();

  const openWindow = () => {
    inputRef.current.click();
  };

  return (
    <div id="Menu">
      <input type="file" style={{ display: "none" }} ref={inputRef} />
      <h6 className="pb-1" style={{ cursor: "pointer" }}>
        Add to your post
      </h6>
      <div className="d-flex">
        <div>
          <Icon image={photoIcon} openWindow={openWindow} />
        </div>
        <div>
          <Icon image={share} openWindow={openWindow} />
        </div>
        <div>
          <Icon image={feeling} openWindow={openWindow} />
        </div>
        <div>
          <Icon image={checkin} openWindow={openWindow} />
        </div>
        <div>
          <Icon image={flag} openWindow={openWindow} />
        </div>
        <div className="d-inline-block">
          <div className="moreBtn">
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoWrap = ({ photoUrl }) => {
  return (
    <div className="mb-2 p-2 photoWrap">
      <img
        src={photoUrl}
        alt=""
        width={"100%"}
        style={{ borderRadius: "7px" }}
      />
    </div>
  );
};

const EditPost = ({ editPostV, hideEditPost, post }) => {
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const { userDoc } = useGlobalState();
  const [oldText, setOldText] = useState("");

  useEffect(() => {
    setText(post.text);
    setPhotoUrl(post.photo);
    setOldText(post.text);
  }, [post]);

  const disab = text === oldText;
  const variant = disab ? "secondary" : "primary";

  const postText = (text) => {
    setText(text);
  };

  const onSubmit = async () => {
    document.body.style.cursor = "wait";

    try {
      const newPost = {
        ...post,
        text: text,
      };
      await updatePost(newPost);
      document.body.style.cursor = "default";
      hideEditPost();
    } catch (error) {
      console.log(error.message);
    }
    document.body.style.cursor = "default";
  };

  return (
    <MyModal showModal={editPostV} hideFunc={hideEditPost} Title={"Edit Post"}>
      <div className="AddPost p-3">
        <Profile userDoc={userDoc} />
        <InputArea postText={postText} text={text} photoUrl={photoUrl} />
        {photoUrl && <PhotoWrap photoUrl={photoUrl} />}
        <Menu />
        <Button
          variant={variant}
          className="mt-3 w-100"
          style={{ fontWeight: "500" }}
          disabled={disab}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </MyModal>
  );
};

export default EditPost;
