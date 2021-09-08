import React, { useContext } from 'react';
import { UserContext } from './../context/UserContext';
import { useHistory } from 'react-router-dom';

import Player from '../components/Player';

function HomePage() {
  const [context, updateContext] = useContext(UserContext);
  const history = useHistory();

  function logoutHandler() {
    localStorage.removeItem('token');
    history.push('/login');
  }

  return (
    <div className="player-component">
      <Player videoId="z4WCaWJgOqM" />
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
}

export default HomePage;
