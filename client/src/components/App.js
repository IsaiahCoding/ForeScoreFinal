import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import ScoreCard from './ScoreCard';

import EditRoundForm from './User_Rounds/EditRoundForm';
import Rounds from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/User_Rounds/Rounds.jsx';
import Logout from './Logout';
import { UserContext} from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/check_session", {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
    })
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else {
        setUser(null); 
      }
    })
    .catch((error) => {
      console.error("Session check failed:", error);
      setUser(null);
    });
  }, [setUser]);

  return (
    <Router>
      <NavBar /> 
      <Switch>
      
        <Route path="/login">
        <div style={{ marginBottom: '20px' }} />
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/signup">
        <div style={{ marginBottom: '20px' }} />
          {user ? <Redirect to="/home" /> : <Signup />}
        </Route>
        
        {user ? (
          <>
            <Route exact path="/home" component={Home} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/scorecard" component={ScoreCard} />
            <Route exact path="/rounds" component={Rounds} />
            <Route path="/edit-scorecard/:scorecardId" component={EditRoundForm} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;