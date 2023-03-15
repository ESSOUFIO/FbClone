import "./SideButtons.css";
import { Link } from "react-router-dom";

export const SideButtons = ({
  image,
  text,
  height,
  style,
  onClickHandler,
  page,
}) => {
  return (
    <Link to={page}>
      <div className="SideButtons" onClick={onClickHandler}>
        <img src={image} alt="" height={height} style={style} />
        <span>{text}</span>
      </div>
    </Link>
  );
};
