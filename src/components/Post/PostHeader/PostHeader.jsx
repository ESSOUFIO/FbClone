import "./PostHeader.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlinePublic } from "react-icons/md";
import { useEffect, useState } from "react";
import { getUploadedProfilePic } from "../../../firebase/user";

//** icons */
import ProfilePic from "../../../assets/images/defProfile.jpg";
import saveIcon from "../../../assets/images/save.png";
import unSaveIcon from "../../../assets/images/unsave.png";
import hideIcon from "../../../assets/images/hidden.png";
import reportIcon from "../../../assets/images/report.png";
import trashIcon from "../../../assets/images/trash.png";
import editIcon from "../../../assets/images/edit.png";
import { useGlobalState } from "../../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ uid, UserName, PostTime }) => {
  const [imageUrl, setImageUrl] = useState(ProfilePic);
  const navigate = useNavigate();

  useEffect(() => {
    getUploadedProfilePic(uid).then((URL) => {
      !!URL && setImageUrl(URL);
    });
  }, [uid]);

  return (
    <div className="UserProfile">
      <img src={imageUrl} alt="" onClick={() => navigate(`/profile/${uid}`)} />
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
  UserName,
  PostTime,
  hidePost,
  showDeletePost,
  showSavePost,
  showEditPost,
  unSavePost,
  savedPost,
}) => {
  const [myPost, setMyPost] = useState(false);
  const { user } = useGlobalState();

  useEffect(() => {
    if (user.uid === uid) {
      setMyPost(true);
    }
  }, [user, uid]);

  const savePostHandler = () => {
    showSavePost();
  };

  const unSavePostHandler = () => {
    unSavePost();
  };
  return (
    <div className="PostHeader">
      <UserProfile uid={uid} UserName={UserName} PostTime={PostTime} />

      <div className="d-flex me-2 position-relative">
        <div
          className="Button "
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-offset="-270,0"
        >
          <TfiMoreAlt />
        </div>
        {!myPost && (
          <div className="Button" onClick={hidePost}>
            <VscChromeClose />
          </div>
        )}

        <div className="downdropMenu dropdown-menu">
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
              <img src={reportIcon} alt="" style={{ filter: "invert(70%)" }} />
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
              <div className="downdropItem" onClick={showEditPost}>
                <div>
                  <img
                    src={editIcon}
                    alt=""
                    style={{ filter: "invert(70%)" }}
                  />
                </div>
                <div className="Center">
                  <h6>Edit Post</h6>
                </div>
              </div>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};
