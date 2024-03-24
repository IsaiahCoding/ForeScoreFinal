import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext'; // Import UserContext

const NavBar = () => {
  const { user } = useContext(UserContext); // Access user state from UserContext

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {!user && ( // Render login and signup links only if user is not logged in
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && ( // Render user's name and logout link if user is logged in
          <>
            <li>
              <span>Hello, {user.username}</span>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/scorecard">Scorecard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
