import React, { useContext, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import { getSongsByString } from "../services/musicService";

function MoreResultsBtn() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const [showMoreResults, setShowMoreResults] = useState(false);
  const [moreResults, setMoreResults] = useState([]);

  async function handleClick() {
    const string = `${musicContext.searchString}?next=${musicContext.fetchResult.next}`;
    const data = await getSongsByString(string);
    console.log("data", data);
    setMoreResults(data.content);
    setShowMoreResults(true);
  }

  return (
    <article className="songslist__footer">
      <button className="songslist__btn" onClick={() => handleClick()}>
        More results
      </button>
    </article>
  );
}

export default MoreResultsBtn;
