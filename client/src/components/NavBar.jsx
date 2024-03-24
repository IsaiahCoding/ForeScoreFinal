import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext'; // Adjust the import path as necessary
import Logout from './Logout';
// Import other components

function NavBar() {
    const { user } = useContext(UserContext);

    return (
        <Router>
            <nav>
                {/* Navigation content */}
                {user ? (
                    <Logout />
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </nav>
            {/* Routes */}
        </Router>
    );
}

export default NavBar;
