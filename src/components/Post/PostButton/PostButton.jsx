import "./PostButton.css";

export const PostButton = ({ icon, text, liked = false, btnClicked }) => {
  return (
    <div className="PostButton" onClick={() => btnClicked(text)}>
      <img
        src={icon}
        alt=""
        style={{ filter: `${!liked ? "invert(70%)" : "none"}` }}
      />
      <span
        style={{
          color: `${liked ? "var(--color-primary)" : "var(--color-light)"}`,
        }}
      >
        {text}
      </span>
    </div>
  );
};
