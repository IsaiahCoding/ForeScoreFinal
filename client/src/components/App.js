import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScoreCard from "./ScoreCard";
import Login from "./LoginForm";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);
  const [scorecard, setScorecard] = useState([]);
  const [club, setClub] = useState([]);

  useEffect(() => {
    fetch('/check_session')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to check session');
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error checking session:', error);
        setUser(null);
      });
  }, []);

  useEffect(() => {
    fetch('/scorecard')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch scorecard');
        }
      })
      .then((data) => {
        setScorecard(data);
      })
      .catch((error) => {
        console.error('Error fetching scorecard:', error);
      });
  }, []);

  useEffect(() => {
    fetch('/club')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch club');
        }
      })
      .then((data) => {
        setClub(data);
      })
      .catch((error) => {
        console.error('Error fetching club:', error);
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/scorecard">
          {scorecard.length > 0 ? <ScoreCard scorecardData={scorecard} /> : <p>Loading...</p>}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
