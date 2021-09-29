import React from "react";

function MoreResultsBtn() {
  return (
    <div>
      <Link
        to={`https://yt-music-api.herokuapp.com/api/yt/songs/bohemian%20rapsody?next=${JSON.stringify(
          res.continuation
        )}`}
      >
        <button className="songlist__btn">More results</button>
      </Link>
    </div>
  );
}

export default MoreResultsBtn;
