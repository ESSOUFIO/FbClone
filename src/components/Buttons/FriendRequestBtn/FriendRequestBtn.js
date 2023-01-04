import "./FriendRequestBtn.css";

export const FriendRequestBtn = ({ image, height, text }) => {
  return (
    <div className="FriendRequestBtn">
      <img src={image} alt="" height={height} />
      <div>
        <h6>{text}</h6>
        <div className="buttons">
          <button
            className="btn btn-primary"
            style={{ width: "95px", fontWeight: "600" }}
          >
            Confirm
          </button>
          <button
            className="btn btn-dark"
            style={{ width: "95px", fontWeight: "600" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
