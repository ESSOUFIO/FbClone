import "./PostHeader.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlinePublic } from "react-icons/md";
import ProfilePic from "../../../assets/images/defProfile.jpg";
import { useEffect, useRef, useState } from "react";
import { getUploadedProfilePic } from "../../../firebase/user";
import { Dropdown } from "react-bootstrap";
import saveIcon from "../../../assets/images/save.png";
import hideIcon from "../../../assets/images/hidden.png";
import reportIcon from "../../../assets/images/report.png";
import trashIcon from "../../../assets/images/trash.png";

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

export const PostHeader = ({ uid, UserName, PostTime, hidePost }) => {
  const btnRef = useRef();
  return (
    <div className="PostHeader">
      <UserProfile uid={uid} UserName={UserName} PostTime={PostTime} />

      <div className="d-flex me-2 position-relative">
        <Dropdown className="dropdownWrap">
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ visibility: "hidden" }}
            ref={btnRef}
          >
            Dropdown But --------------
          </Dropdown.Toggle>

          <Dropdown.Menu className="downdropMenu">
            <div className="downdropItem" onClick={() => console.log("save")}>
              <div>
                <img src={saveIcon} alt="" style={{ filter: "invert(70%)" }} />
              </div>
              <div>
                <h6>Save post</h6>
                <p>Add this to your saved items</p>
              </div>
            </div>
            <hr
              style={{
                borderTop: "1px solid var(--color-light)",
                margin: "5px 10px",
              }}
            />
            <div className="downdropItem" onClick={() => console.log("Hide")}>
              <div>
                <img src={hideIcon} alt="" style={{ filter: "invert(70%)" }} />
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
            <hr
              style={{
                borderTop: "1px solid var(--color-light)",
                margin: "5px 10px",
              }}
            />
            <div className="downdropItem" onClick={() => console.log("trash")}>
              <div>
                <img src={trashIcon} alt="" style={{ filter: "invert(70%)" }} />
              </div>
              <div>
                <h6>Move to trash</h6>
                <p>Items in your trash are deleted after 30 days.</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <div className="Button" onClick={() => btnRef.current.click()}>
          <TfiMoreAlt />
        </div>
        <div className="Button" onClick={hidePost}>
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};
