import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useUser } from './UserContext/UserContext';

import NavBar from './NavBar';
import ScoreCard from './ScoreCard';
import Login from './LoginForm';
import Signup from './Signup';
import PastRounds from './PastRounds';
import UserContext from './UserContext/UserContext';
import Logout from './Logout';
import Clubs from './Clubs';

function App() {
  const [user, setUser] = useState(null);
  const [scorecard, setScorecard] = useState([]);
  const [club, setClub] = useState([]);

  useEffect(() => {
    // Fetch user data or perform any necessary initial setup
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/scorecard">
          {scorecard.length > 0 ? (
            <ScoreCard scorecardData={scorecard} />
          ) : null} {/* Render null when scorecard data is empty */}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/past_round">
          <PastRounds scorecardData={scorecard} />
        </Route>
        <Route path="/club">
          <Clubs clubData={club} />
        </Route>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
