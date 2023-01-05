import "./UserPic.css";
export const UserPic = ({ image }) => {
  return (
    <div className="UserPic">
      <img src={image} alt="" />
    </div>
  );
};
