import React, { useState, useContext } from 'react';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';
import { Input, Button } from "@material-tailwind/react";
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
        <div className="bg-gay-100">
        <div className="max-w-md mx-auto bg-green-500 bg-opacity-60 p-6 rounded-lg shadow-lg border border-green-600">
            <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Update Profile</h2>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            {success && <p className="text-green-500 text-xs italic">{success}</p>}
            <div className="mb-4 bg-white">
                <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    label="New Username"
                    color="teal"
                />
            </div>
            <div className="mb-4 bg-white">
                <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    label="Current Password"
                    color="teal"
                />
            </div>
            <div className="mb-4 bg-white">
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="New Password"
                    color="teal"
                />
            </div>
            <Button
                color="teal"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={true}
                iconOnly={false}
                ripple="light"
                onClick={updateUserProfile}
            >
                Update
            </Button>
        </div>
    </div>
    );
}

export default UpdateUserProfile;
