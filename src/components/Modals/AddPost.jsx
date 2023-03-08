import "./AddPost.css";
import { useState } from "react";
import { Modal, Card, Button } from "react-bootstrap";
/** icons */
import { MdOutlineClose } from "react-icons/md";
import { HiGlobe } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
/** images */
import profileImg from "../../assets/images/profile.png";
import squareBg from "../../assets/images/square-bg.png";
import photoIcon from "../../assets/images/photo-video.png";
import share from "../../assets/images/share-with.png";
import feeling from "../../assets/images/PostFeeling.png";
import checkin from "../../assets/images/checkin.png";
import flag from "../../assets/images/flag.png";

/** other */
import { useGlobalState } from "../../context/GlobalProvider";
import { addPost } from "../../firebase/post";

const Icon = ({ image }) => {
  return (
    <div className="Icon">
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

const Profile = () => {
  return (
    <div className="d-flex">
      <div className="d-flex align-items-center">
        <img src={profileImg} alt="" width={40} height={40} />
      </div>

      <div className="ms-2">
        <h6 className="m-0 p-0" style={{ fontSize: "14px" }}>
          Omar ESSOUFI
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

const InputArea = ({ postText }) => {
  return (
    <div className="mb-2">
      <textarea
        type="text"
        rows={3}
        className="InputText"
        placeholder="What's on your mind, Omar?"
        onChange={(e) => postText(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <div>
          <img src={squareBg} alt="" width={40} style={{ cursor: "pointer" }} />
        </div>
        <div
          className="fs-2"
          style={{ color: "var(--color-light)", cursor: "pointer" }}
        >
          <GrEmoji />
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div id="Menu">
      <h6 className="pb-1" style={{ cursor: "pointer" }}>
        Add to your post
      </h6>
      <div className="d-flex">
        <div>
          <Icon image={photoIcon} />
        </div>
        <div>
          <Icon image={share} />
        </div>
        <div>
          <Icon image={feeling} />
        </div>
        <div>
          <Icon image={checkin} />
        </div>
        <div>
          <Icon image={flag} />
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

const AddPost = ({ addPostV, hideAddPost }) => {
  const [text, setText] = useState("");
  const disab = text ? false : true;
  const variant = text ? "primary" : "secondary";
  const { user } = useGlobalState();

  const postText = (text) => {
    setText(text);
  };

  const onSubmit = async () => {
    const d = new Date();

    try {
      const newPost = {
        uid: user.uid,
        time: d.getTime(),
        text: text,
        photo: "",
        nbrComments: 0,
      };
      await addPost(newPost);
      hideAddPost();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal className="AddPost" show={addPostV} onHide={hideAddPost} centered>
      <Card>
        <Header hideModal={hideAddPost} />
        <div className="p-3">
          <Profile />
          <InputArea postText={postText} />
          <Menu />
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
