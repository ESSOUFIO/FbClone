import "./TitleSection.css";

export const TitleSection = ({
  text,
  colour,
  more = null,
  search = null,
  newCall = null,
}) => {
  let moreBtn, searchBtn, newCallBtn;

  if (more != null) {
    moreBtn = <div className="more">{more}</div>;
  }
  if (search != null) {
    searchBtn = <div className="more">{search}</div>;
  }
  if (newCall != null) {
    newCallBtn = <div className="more">{newCall}</div>;
  }

  return (
    <div className="TitleSection" style={{ color: colour }}>
      <p>{text}</p>
      <div className="d-flex">
        <div>{newCallBtn}</div>
        <div>{searchBtn}</div>
        <div>{moreBtn}</div>
      </div>
    </div>
  );
};
