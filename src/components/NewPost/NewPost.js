import "./NewPost.css";
import { NPInputWrap } from "./NPInputWrap/NPInputWrap";
import PostVideo from "../../assets/images/PostVideo.png";
import PostPhoto from "../../assets/images/PostPhoto.png";
import PostFeeling from "../../assets/images/PostFeeling.png";
import { NPButtons } from "./NPButtons/NPButtons";

const NPButtonsWrap = (props) => {
  return <div className="NPButtonsWrap">{props.children}</div>;
};

export const NewPost = () => {
  return (
    <div className="NewPost">
      <NPInputWrap />
      <NPButtonsWrap>
        <NPButtons image={PostVideo} text="Live video" height={"30px"} />
        <NPButtons image={PostPhoto} text="Photo/video" height={"30px"} />
        <NPButtons
          image={PostFeeling}
          text="Feeling/activity"
          height={"30px"}
        />
      </NPButtonsWrap>
    </div>
  );
};
