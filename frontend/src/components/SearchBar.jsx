import React, { useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";
import SearchResult from "./SearchResult";

function SearchBar() {
  const [searchInput, setSearchInput] = useState();
  const [context, updateContext] = useContext(UserContext);

  async function getSongs(e) {
    e.preventDefault();
    const response = await fetch(
      `https://yt-music-api.herokuapp.com/api/yt/songs/${searchInput}`
    );
    const data = await response.json();
    updateContext({ fetchResult: data.content });
  }

  return (
    <div>
      <form onSubmit={getSongs}>
        <input
          type="text"
          placeholder="Search for artists"
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
        <input type="submit" value="Search..." />
      </form>
			<SearchResult />
    </div>
  );
}

export default SearchBar;
