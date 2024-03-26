import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';
import { Button } from "@material-tailwind/react";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-green-800 p-4 rounded shadow">
      <ul className="flex justify-between items-center text-white">
        {user && (
          <li className="font-semibold">
            <span>Hello, {user.username}</span>
          </li>
        )}
        <li>
          <Link to="/home">
            <Button color="gray" size="lg" ripple={true}>
              Home
            </Button>
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">
                <Button color="gray" size="lg" ripple={true}>
                  Login
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button color="gray" size="lg" ripple={true}>
                  Signup
                </Button>
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link to="/scorecard">
                <Button color="gray" size="lg" ripple={true}>
                  Scorecard
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/rounds">
                <Button color="gray" size="lg" ripple={true}>
                  Rounds
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/update-username">
                <Button color="gray" size="lg" ripple={true}>
                  User Info
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <Button color="gray" size="lg" ripple={true}>
                  Logout
                </Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
