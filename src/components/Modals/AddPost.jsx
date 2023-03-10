import "./AddPost.css";
import { useRef, useState } from "react";
import { Modal, Card, Button } from "react-bootstrap";
/** icons */
import { MdOutlineClose } from "react-icons/md";
import { HiGlobe } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
/** images */
import squareBg from "../../assets/images/square-bg.png";
import photoIcon from "../../assets/images/photo-video.png";
import share from "../../assets/images/share-with.png";
import feeling from "../../assets/images/PostFeeling.png";
import checkin from "../../assets/images/checkin.png";
import flag from "../../assets/images/flag.png";

/** other */
import { useGlobalState } from "../../context/GlobalProvider";
import { addPost } from "../../firebase/post";
import { uploadPostPhoto } from "../../firebase/user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Icon = ({ image, openWindow }) => {
  return (
    <div className="Icon" onClick={openWindow}>
      <img src={image} alt="" width={25} />
    </div>
  );
};

const Header = ({ hideModal }) => {
  return (
    <>
      <header className="d-flex my-2 py-1">
        <h5 className="text-center w-100">Create Post</h5>
        <div className="closeBtn" onClick={hideModal}>
          <MdOutlineClose />
        </div>
      </header>
      <hr style={{ borderTop: "1px solid gray", margin: "0" }} />
    </>
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

const InputArea = ({ postText, text, photoUrl, style }) => {
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

const Menu = ({ getPhoto }) => {
  const inputRef = useRef();

  const openWindow = () => {
    inputRef.current.click();
  };

  return (
    <div id="Menu">
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={(e) => {
          getPhoto(e.target.files);
        }}
      />
      <h6 className="pb-1" style={{ cursor: "pointer" }} onClick={openWindow}>
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

const PhotoWrap = ({ photoUrl, removePhoto }) => {
  return (
    <div className="mb-2 p-2 photoWrap">
      <div className="closeBtnPhoto" onClick={removePhoto}>
        <MdOutlineClose />
      </div>
      <img
        src={photoUrl}
        alt=""
        width={"100%"}
        style={{ borderRadius: "7px" }}
      />
    </div>
  );
};

const AddPost = ({ addPostV, hideAddPost }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const { userDoc } = useGlobalState();

  const disab = text ? false : photoUrl ? false : true;
  const variant = disab ? "secondary" : "primary";

  const removePhoto = () => {
    setPhoto(null);
    setPhotoUrl(null);
  };

  const postText = (text) => {
    setText(text);
  };

  const getPhoto = (file) => {
    setPhoto(file[0]);
    setPhotoUrl(URL.createObjectURL(file[0]));
  };

  const onSubmit = async () => {
    const d = new Date();
    document.body.style.cursor = "wait";
    try {
      const newPost = {
        uid: userDoc.uid,
        time: d.getTime(),
        text: text,
        photo: "",
        nbrComments: 0,
      };
      const resp = await addPost(newPost);
      if (photo) {
        uploadPostPhoto(resp.id, photo).then(async (downloadUrl) => {
          //** Update post.picture */
          const postRef = doc(db, "posts", resp.id);
          await updateDoc(postRef, {
            ...newPost,
            photo: downloadUrl,
          });
        });
      }
      document.body.style.cursor = "default";
      hideAddPost();
    } catch (error) {
      console.log(error.message);
    }
    document.body.style.cursor = "default";
  };

  return (
    <Modal className="AddPost" show={addPostV} onHide={hideAddPost} centered>
      <Card>
        <Header hideModal={hideAddPost} />
        <div className="p-3">
          <Profile userDoc={userDoc} />
          <InputArea postText={postText} text={text} photoUrl={photoUrl} />
          {photoUrl && (
            <PhotoWrap photoUrl={photoUrl} removePhoto={removePhoto} />
          )}
          <Menu getPhoto={getPhoto} />
          <Button
            variant={variant}
            className="mt-3 w-100"
            style={{ fontWeight: "500" }}
            disabled={disab}
            onClick={onSubmit}
          >
            Post
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default AddPost;
