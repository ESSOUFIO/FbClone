import "./NPButtons.css";

export const NPButtons = ({ image, text, height, showAddPost }) => {
  return (
    <div className="NPButtons" onClick={showAddPost}>
      <img src={image} alt="" height={height} />
      <span>{text}</span>
    </div>
  );
};
