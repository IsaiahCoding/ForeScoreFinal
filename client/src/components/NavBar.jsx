import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext'; // Ensure the path to UserContext is correct

const NavBar = () => {
  const { user } = useContext(UserContext); // Access user state from UserContext

  return (
    <nav className="bg-green-800 p-4 rounded shadow">
      <ul className="flex justify-between items-center">
        {user && (
          <li className="text-white font-semibold">
            <span>Hello, {user.username}</span>
          </li>
        )}
        <li>
          <Link to="/home" className="text-slate-50 hover:text-slate-200 transition duration-300">Home</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login" className="text-slate-50 hover:text-slate-200 transition duration-300">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-slate-50 hover:text-slate-200 transition duration-300">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link to="/scorecard" className="text-slate-50 hover:text-slate-200 transition duration-300">Scorecard</Link>
            </li>
            <li>
              <Link to="/rounds" className="text-slate-50 hover:text-slate-200 transition duration-300">Rounds</Link>
            </li>
            <li>
              <Link to="/update-username" className="text-slate-50 hover:text-slate-200 transition duration-300">User Info</Link>
            </li>
            <li>
              <Link to="/logout" className="text-slate-50 hover:text-slate-200 transition duration-300">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
