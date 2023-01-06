import "./PostButton.css";

export const PostButton = ({ icon, text }) => {
  return (
    <div className="PostButton">
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
};
