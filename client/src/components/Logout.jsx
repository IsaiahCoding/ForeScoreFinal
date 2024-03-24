import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext'; // Adjust the import path as necessary

function Logout() {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    function handleClick() {
        fetch('/logout', {
            method: 'DELETE', // Changed from POST to DELETE to match the backend
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                setUser(null);
                sessionStorage.removeItem('user'); // Adjust based on how you're storing the session/client authentication state
                history.push('/login');
            } else {
                console.error('Failed to logout');
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
    }

    return (
        <button onClick={handleClick}>Logout</button>
    );
}

export default Logout;
