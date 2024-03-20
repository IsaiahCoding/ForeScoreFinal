import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useUser } from './UserContext/UserContext';
import Logout from './Logout'; // Import the Logout component
import ScoreCard from './ScoreCard'; // Import ScoreCard component
import PastRounds from './PastRounds'; // Import PastRounds component
import Club from './Clubs'; // Import Club component
import Login from './Login'; // Import Login component
import Signup from './Signup'; // Import Signup component
import Home from './Home'; // Import Home component

function NavBar() {
    const { user } = useUser();
    const [scorecard, setScorecard] = useState([]);
    const [club, setClub] = useState([]);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        // Fetch club data
    }, []);

    return (
        <Router>
            <nav className="flex justify-between items-center bg-green-800 p-4">
                <div>
                    <Link to="/" className="text-2xl text-white font-bold">Golf Tracker</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/scorecard" className="text-white">Scorecard</Link>
                        </li>
                        <li>
                            <Link to="/past_round" className="text-white">Past Rounds</Link>
                        </li>
                        <li>
                            <Link to="/club" className="text-white">Club</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Logout /> {/* Render Logout component if user is logged in */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="text-white">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="text-white">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/scorecard">
                    <ScoreCard scorecard={scorecard} club={club} />
                </Route>
                <Route path="/past_round">
                    <PastRounds scorecard={scorecard} club={club} />
                </Route>
                <Route path="/club">
                    <Club club={club} />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
            </Switch>
        </Router>
    );
}

export default NavBar;
