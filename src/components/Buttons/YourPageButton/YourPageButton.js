import "./YourPageButton.css";

export const YourPageButton = ({ icon, text }) => {
  return (
    <div className="YourPageButton">
      {icon}
      <h6>{text}</h6>
    </div>
  );
};
