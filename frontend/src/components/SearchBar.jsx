import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./../context/UserContext";

function SearchBar() {
  //let result = [];
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState();
  const [error, setError] = useState(null);
  const [context, updateContext] = useContext(UserContext);

  async function getSongs(e) {
    e.preventDefault();
    const response = await fetch(
      `https://yt-music-api.herokuapp.com/api/yt/artists/${searchInput}`
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
    </div>
  );
}

export default SearchBar;
