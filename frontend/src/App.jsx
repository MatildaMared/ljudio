import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';
import { UserProvider } from './context/UserContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Switch>
            <PrivateRoute path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
