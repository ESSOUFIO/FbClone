import "./YourPageButton.css";

export const YourPageButton = ({ icon, text }) => {
  return (
    <div className="YourPageButton">
      <img src={icon} alt="" />
      <h6>{text}</h6>
    </div>
  );
};
