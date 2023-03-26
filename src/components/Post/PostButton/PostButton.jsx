import "./PostButton.css";

export const PostButton = ({ icon, text, btnClicked }) => {
  return (
    <div className="PostButton" onClick={() => btnClicked(text)}>
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
};
