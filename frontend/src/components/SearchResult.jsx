import React, { useContext } from 'react';
import { UserContext } from "./../context/UserContext";

function SearchResult() {
    const [context, updateContext] = useContext(UserContext);
    const searchResult = context.fetchResult;

    return ( searchResult && (
        <ul>
           {searchResult.map((item) => (
              <li>{item.name} by {item.artist.name}</li>
           ))}
        </ul>
    )

    )
}

export default SearchResult;
