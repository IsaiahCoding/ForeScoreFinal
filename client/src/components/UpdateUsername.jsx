import React, { useState, useContext } from 'react';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

function UpdateUserProfile() {
    const { user, setUser } = useContext(UserContext);
    const [currentPassword, setCurrentPassword] = useState(''); // State for current password
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState(''); // State for new password
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const updateUserProfile = async () => {
        try {
            const response = await fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization header if needed
                },
                body: JSON.stringify({
                    currentPassword, // Send the current password for verification
                    username: newUsername, 
                    newPassword, // Rename for clarity that this is the new password
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update user context with the new data
                setSuccess('Profile updated successfully!');
                setCurrentPassword(''); // Clear passwords from state
                setNewPassword('');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to update profile');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-lg font-bold mb-2">Update Profile</h2>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {success && <p className="text-green-500 text-xs italic">{success}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    placeholder="Enter new username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="Current password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={updateUserProfile}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Update
            </button>
        </div>
    );
}

export default UpdateUserProfile;
