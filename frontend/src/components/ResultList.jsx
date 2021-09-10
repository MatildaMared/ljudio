import React, { useContext, useEffect } from "react";
import { MusicContext } from "./../context/MusicContext";
import AllResults from "./AllResults";

function ResultList() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  console.log(musicContext.fetchResult.type);

  return (
    <div>
      {musicContext.fetchResult.type === "all" && <AllResults />}
    </div>
  )
}

export default ResultList;
