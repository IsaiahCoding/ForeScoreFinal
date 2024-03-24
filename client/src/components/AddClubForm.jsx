import React, { useState } from 'react';
import { useUser } from './UserContext/UserContext'; // Import the useUser hook to access logged-in user information

function AddClubForm({ onAddClub }) {
    const { user } = useUser(); // Access the logged-in user information
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [regularDistance, setRegularDistance] = useState('');
    const [minDistance, setMinDistance] = useState('');
    const [maxDistance, setMaxDistance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Perform validation
        if (!name || !brand || !regularDistance || !minDistance || !maxDistance) {
            alert('Please fill out all fields.');
            return;
        }
    
        // Ensure distance values are valid numbers
        if (isNaN(parseInt(regularDistance)) || isNaN(parseInt(minDistance)) || isNaN(parseInt(maxDistance))) {
            alert('Distance values must be valid numbers.');
            return;
        }
    
        // Ensure minDistance is less than or equal to maxDistance
        if (parseInt(minDistance) > parseInt(maxDistance)) {
            alert('Min Distance must be less than or equal to Max Distance.');
            return;
        }
    
        // Submission logic
        // Call the onAddClub function passed from the parent component
        // and pass the new club data as an argument, including the user's ID
        onAddClub({
            name,
            brand,
            regularDistance: parseInt(regularDistance),
            minDistance: parseInt(minDistance),
            maxDistance: parseInt(maxDistance),
            userId: user.id
        });
    
        // Clear the form fields after submission
        setName('');
        setBrand('');
        setRegularDistance('');
        setMinDistance('');
        setMaxDistance('');
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Club Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Club Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Regular Distance"
                value={regularDistance}
                onChange={(e) => setRegularDistance(e.target.value)}
            />
            <input
                type="number"
                placeholder="Min Distance"
                value={minDistance}
                onChange={(e) => setMinDistance(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Distance"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
            />
            <button type="submit">Add Club</button>
        </form>
    );
}

export default AddClubForm;
