import React from "react";
import YouTube from "react-youtube";
import SearchBar from './Searchbar';

class Player extends React.Component {

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
          //An object that specifies player options. Within that object, the playerVars property identifies player parameters.
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0
      }
    };

    const { videoId } = this.props;

    return (
    <div>
        <SearchBar />
        <YouTube
            videoId={ videoId } 
            opts={opts} 
            onReady={this._onReady} 
        />
    </div>
    );
  }
}

export default Player;

/*
function Player(props) {

const { videoId } = props.videoId;

const opts = {
    height: "390",
    width: "640",
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
    autoplay: 1
    }
};

const _onReady = function (event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
}
    
    return ( 
        <div>
            <YouTube videoId={ videoId } opts={opts} onReady={_onReady} />
        </div>
    );
}

export default Player;
*/