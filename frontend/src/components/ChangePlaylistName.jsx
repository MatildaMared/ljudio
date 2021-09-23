import React, { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
import { MusicContext } from "./../context/MusicContext";
import { changePlayListTitle } from "../services/newPlaylistService";

function ChangePlaylistName(props) {
  const [userContext, updateUserContext] = useContext(UserContext);
  const [musicContext, updateMusicContext] = useContext(MusicContext);
  const [titleChange, setTitleChange] = useState("");
  
  async function changeTitleHandler(playlistId) {
    console.log(titleChange, props.playlistId);
    playlistId = props.playlistId;
    const data = await changePlayListTitle(titleChange.trim(), playlistId);
    updateUserContext({
      user: data.user,
    });
    setTitleChange("");
  }

  return (
    <div className="change-playlist-name">
      <input
        className="change-playlist-name__input"
        type="text"
        onChange={(e) => setTitleChange(e.target.value)}
      />
      <button
        className="change-playlist-name__btn"
        type="submit"
        onClick={() => changeTitleHandler(props.playlist)}
      >
        Change name
      </button>
    </div>
  );
}

export default ChangePlaylistName;
