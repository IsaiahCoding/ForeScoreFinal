import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { useUser } from './UserContext/UserContext';

function Logout() {
    const { setUser } = useUser(); // Destructure setUser from useUser hook
    const history = useHistory(); // Initialize useHistory hook

    function handleClick() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then((r) => {
            if (r.ok) {
                // Clear user data and redirect to the scorecard page
                setUser(null);
                sessionStorage.removeItem('user');
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
