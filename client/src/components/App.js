import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useUser } from "./UserContext/UserContext";

import ScoreCard from "./ScoreCard";
import Login from "./LoginForm";
import Signup from "./Signup";
import PastRounds from "./PastRounds";
import UserContext from "./UserContext/UserContext";
import Logout from "./Logout";
import Clubs from "./Clubs";
///import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);
  const [scorecard, setScorecard] = useState([]);
  const [club, setClub] = useState([]);

  useEffect(() => {
    const currentUser = sessionStorage.getItem('user');
    if (currentUser) {
      const loggedUser = JSON.parse(currentUser);
      setUser('user');
    }
  },[]);

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

  // Function to update scorecard state with new scorecard
  const addScorecard = (newScorecard) => {
    setScorecard([...scorecard, newScorecard]);
  };
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
        <Route path="/past_round">
          <PastRounds scorecardData={scorecard} onAddScorecard={addScorecard} />
        </Route>
        <Route path="/club">
          <Clubs clubData={club} />
          </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
