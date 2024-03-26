import React, { useState, useContext } from 'react';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

function UpdateUsername() {
    const { user, setUser } = useContext(UserContext);
    const [newUsername, setNewUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const updateUsername = async () => {
        try {
            const response = await fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization header if needed
                },
                body: JSON.stringify({ username: newUsername }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update user context with the new username
                setSuccess('Username updated successfully!');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to update username');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error updating username:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-lg font-bold mb-2">Update Username</h2>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {success && <p className="text-green-500 text-xs italic">{success}</p>}
            <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                placeholder="Enter new username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <button
                onClick={updateUsername}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Update
            </button>
        </div>
    );
}

export default UpdateUsername;
