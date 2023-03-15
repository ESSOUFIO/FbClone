import "./PostHeader.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlinePublic } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { getUploadedProfilePic } from "../../../firebase/user";
import { Dropdown } from "react-bootstrap";

//** icons */
import ProfilePic from "../../../assets/images/defProfile.jpg";
import saveIcon from "../../../assets/images/save.png";
import unSaveIcon from "../../../assets/images/unsave.png";
import hideIcon from "../../../assets/images/hidden.png";
import reportIcon from "../../../assets/images/report.png";
import trashIcon from "../../../assets/images/trash.png";
import { useGlobalState } from "../../../context/GlobalProvider";

const UserProfile = ({ uid, UserName, PostTime }) => {
  const [imageUrl, setImageUrl] = useState(ProfilePic);

  useEffect(() => {
    getUploadedProfilePic(uid).then((URL) => {
      !!URL && setImageUrl(URL);
    });
  }, [uid]);

  return (
    <div className="UserProfile">
      <img src={imageUrl} alt="" />
      <div className="Text">
        <h6>{UserName}</h6>
        <span>
          {PostTime} . <MdOutlinePublic />
        </span>
      </div>
    </div>
  );
};

export const PostHeader = ({
  uid,
  postId,
  UserName,
  PostTime,
  hidePost,
  showDeletePost,
  showSavePost,
  unSavePost,
  savedPost,
}) => {
  const [myPost, setMyPost] = useState(false);
  const { user } = useGlobalState();
  const btnRef = useRef();

  useEffect(() => {
    if (user.uid === uid) {
      setMyPost(true);
    }
  }, [user, uid]);

  const savePostHandler = () => {
    btnRef.current.click();
    showSavePost();
  };

  const unSavePostHandler = () => {
    btnRef.current.click();
    unSavePost();
  };
  return (
    <div className="PostHeader">
      <UserProfile uid={uid} UserName={UserName} PostTime={PostTime} />

      <div className="d-flex me-2 position-relative">
        <Dropdown
          className="dropdownWrap"
          style={{ right: myPost ? "85px" : "125px" }}
        >
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ visibility: "hidden" }}
            ref={btnRef}
          >
            Dropdown But --------------
          </Dropdown.Toggle>

          <Dropdown.Menu className="downdropMenu">
            <div>
              {!savedPost && (
                <div className="downdropItem" onClick={savePostHandler}>
                  <div>
                    <img
                      src={saveIcon}
                      alt=""
                      style={{ filter: "invert(70%)" }}
                    />
                  </div>
                  <div>
                    <h6>Save post</h6>
                    <p>Add this to your saved items</p>
                  </div>
                </div>
              )}
              {savedPost && (
                <div className="downdropItem" onClick={unSavePostHandler}>
                  <div>
                    <img
                      src={unSaveIcon}
                      alt=""
                      style={{ filter: "invert(70%)" }}
                    />
                  </div>
                  <div>
                    <h6>Unsave post</h6>
                    <p>Remove this from your saved items</p>
                  </div>
                </div>
              )}
              <hr
                style={{
                  borderTop: "1px solid var(--color-light)",
                  margin: "5px 10px",
                }}
              />
            </div>

            {!myPost && (
              <div>
                <div className="downdropItem" onClick={hidePost}>
                  <div>
                    <img
                      src={hideIcon}
                      alt=""
                      style={{ filter: "invert(70%)" }}
                    />
                  </div>
                  <div>
                    <h6>Hide</h6>
                    <p>See fewer posts like this.</p>
                  </div>
                </div>
                <hr
                  style={{
                    borderTop: "1px solid var(--color-light)",
                    margin: "5px 10px",
                  }}
                />
              </div>
            )}

            <div className="downdropItem" onClick={() => console.log("report")}>
              <div>
                <img
                  src={reportIcon}
                  alt=""
                  style={{ filter: "invert(70%)" }}
                />
              </div>
              <div>
                <h6>Report post</h6>
                <p>I'm concerned about this post.</p>
              </div>
            </div>

            {myPost && (
              <div>
                <hr
                  style={{
                    borderTop: "1px solid var(--color-light)",
                    margin: "5px 10px",
                  }}
                />
                <div className="downdropItem" onClick={showDeletePost}>
                  <div>
                    <img
                      src={trashIcon}
                      alt=""
                      style={{ filter: "invert(70%)" }}
                    />
                  </div>
                  <div>
                    <h6>Move to trash</h6>
                    <p>Items in your trash are deleted after 30 days.</p>
                  </div>
                </div>
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>

        <div className="Button" onClick={() => btnRef.current.click()}>
          <TfiMoreAlt />
        </div>
        {!myPost && (
          <div className="Button" onClick={hidePost}>
            <VscChromeClose />
          </div>
        )}
      </div>
    </div>
  );
};
