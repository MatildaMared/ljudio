import React, { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import AllResults from "./AllResults";

function Result() {
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  console.log(musicContext.resultType);

  return (
    <div>
      {musicContext.resultType === "all" && <AllResults />}
    </div>
  )
}

export default Result;
