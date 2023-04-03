import "./StoriesSection.css";
import { useGlobalState } from "../../../context/GlobalProvider";
/*** Local Componants */
import { BouttonsNavLeft } from "..";
import { BouttonsNavRight } from "..";
import { StorieElement } from "..";
import { StorieFirstElement } from "..";
import defaultPic from "../../../assets/images/defProfile.jpg";
import storiesIconActiv from "../../../assets/images/story-active.png";
import reelsIcon from "../../../assets/images/reels.png";

const StoriesWrap = (props) => {
  return <div className="StoriesWrap">{props.children}</div>;
};

const ButtonsNav = () => {
  return (
    <div className="ButtonsWrap">
      <div className="StrButtonFirstWrap">
        <div className="StrButtonFirst">
          <img src={storiesIconActiv} alt="" width={22} className="me-2" />
          Stories
        </div>
      </div>
      <div className="StrButtonWrap">
        <div className="StrButton">
          <img
            src={reelsIcon}
            alt=""
            width={22}
            style={{ filter: "invert(70%)" }}
            className="me-2"
          />
          Reels
        </div>
      </div>
    </div>
  );
};

//* ===  Stories List ==== */
export const StoriesSection = ({ uid }) => {
  // const [imageUrl, setImageUrl] = useState(ProfilePic);
  const { userDoc } = useGlobalState();

  const StoriesList = [
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/200",
      storieImg: "https://picsum.photos/201",
    },
    {
      name: "Perte Barnder",
      UserPhoto: "https://picsum.photos/202",
      storieImg: "https://picsum.photos/203",
    },
    {
      name: "Zendra Aliedra",
      UserPhoto: "https://picsum.photos/204",
      storieImg: "https://picsum.photos/205",
    },
    {
      name: "Daniel LAMBORTIEL",
      UserPhoto: "https://picsum.photos/206",
      storieImg: "https://picsum.photos/207",
    },
    {
      name: "Atiel Ompore",
      UserPhoto: "https://picsum.photos/208",
      storieImg: "https://picsum.photos/209",
    },
  ];

  //** Mapping Storie Elements */

  const StorieContentFirst = userDoc && (
    <StorieFirstElement
      UserPhoto={userDoc.picture ? userDoc.picture : defaultPic}
    />
  );

  let StorieContent = StoriesList.map((item, i) => (
    <StorieElement
      key={i}
      image={item.storieImg}
      name={item.name}
      UserPhoto={item.UserPhoto}
    />
  ));

  return (
    <div className="StoriesSection">
      <ButtonsNav />
      <StoriesWrap>
        {StorieContentFirst}
        {StorieContent}
      </StoriesWrap>
      <BouttonsNavRight />
      <BouttonsNavLeft visible={"hidden"} />
    </div>
  );
};
