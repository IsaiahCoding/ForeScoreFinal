import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import ScoreCard from './ScoreCard';
import EditRoundForm from './User_Rounds/EditRoundForm';
import Rounds from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/User_Rounds/Rounds.jsx';
import Logout from './Logout';
import UpdateUsername from './UpdateUsername';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

function App() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session", {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error("Session check failed:", error);
      setUser(null);
      setIsLoading(false);
    });
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavBar /> 
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/signup">
          {user ? <Redirect to="/home" /> : <Signup />}
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/scorecard" component={ScoreCard} />
        <Route exact path="/rounds" component={Rounds} />
        <Route exact path="/update-username" component={UpdateUsername} />
        <Route path="/edit-scorecard/:scorecardId" component={EditRoundForm} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="*">
          <div>404 Not Found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
