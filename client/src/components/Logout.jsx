
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';

function Logout() {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            // If you have an API call to invalidate the session on the server:
            await fetch('/logout', {
                method: 'DELETE', // or POST, depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add any necessary headers, like an Authorization token
            });
            
            // Assuming the logout was successful, clear client-side state:
            setUser(null); // Clear user context
            sessionStorage.removeItem('user'); // Remove user from sessionStorage
            // or localStorage.removeItem('user'); if you're using localStorage

            // Redirect to login page or home page
            history.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Call handleLogout immediately on render
    React.useEffect(() => {
        handleLogout();
    }, []);

    // Optionally, render nothing or a "logging out..." message
    return null; // or return <div>Logging out...</div>;
}

export default Logout;
