import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext/UserContext';

// Add Club Form component
function AddClubForm({ onAddClub }) {
    // State for form inputs
    const [clubName, setClubName] = useState('');
    const [regularDistance, setRegularDistance] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    const [minDistance, setMinDistance] = useState('');

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit form data
        const newClub = {
            clubName,
            regularDistance,
            maxDistance,
            minDistance
        };
        // Call the onAddClub function passed from parent component
        onAddClub(newClub);
        // Reset form inputs after submission
        setClubName('');
        setRegularDistance('');
        setMaxDistance('');
        setMinDistance('');
    };

    return (
        <div className="w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Club</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="clubName" className="block mb-1 text-white">Club Name</label>
                    <input type="text" id="clubName" value={clubName} onChange={(e) => setClubName(e.target.value)} className="w-full border rounded-md px-2 py-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="regularDistance" className="block mb-1 text-white">Regular Distance</label>
                    <input type="text" id="regularDistance" value={regularDistance} onChange={(e) => setRegularDistance(e.target.value)} className="w-full border rounded-md px-2 py-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="maxDistance" className="block mb-1 text-white">Maximum Distance</label>
                    <input type="text" id="maxDistance" value={maxDistance} onChange={(e) => setMaxDistance(e.target.value)} className="w-full border rounded-md px-2 py-1" />
                </div>
                <div className="mb-4">
                    <label htmlFor="minDistance" className="block mb-1 text-white">Minimum Distance</label>
                    <input type="text" id="minDistance" value={minDistance} onChange={(e) => setMinDistance(e.target.value)} className="w-full border rounded-md px-2 py-1" />
                </div>
                <button type="submit" className="bg-green-950 text-white px-4 py-2 rounded-md">Add</button>
            </form>
        </div>
    );
}

function Clubs() {
    const { user } = useUser();
    const [clubs, setClubs] = useState([]);
    const [clubDistances, setClubDistances] = useState([]);
    const [editingClubId, setEditingClubId] = useState(null); // State to track the club being edited
    const [editedClub, setEditedClub] = useState({}); // State to hold edited club data

    useEffect(() => {
        fetch('/club')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch clubs');
                }
            })
            .then((data) => {
                setClubs(data);
            })
            .catch((error) => {
                console.error('Error fetching clubs:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/club_distance')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch club distances');
                }
            })
            .then((data) => {
                setClubDistances(data);
            })
            .catch((error) => {
                console.error('Error fetching club distances:', error);
            });
    }, []);

    // Function to add a new club to the list
    const handleAddClub = (newClub) => {
        // Update the list of clubs with the new club
        setClubs([...clubs, newClub]);
    };

    // Function to delete a club from the list
    const handleDeleteClub = (clubId) => {
        // Filter out the club to delete from the list
        const updatedClubs = clubs.filter((club) => club.id !== clubId);
        setClubs(updatedClubs);
    };

    // Function to handle editing a club
    const handleEditClub = (clubId) => {
        // Set the editingClubId state to the club being edited
        setEditingClubId(clubId);
        // Find the club being edited from the list of clubs and set it in the editedClub state
        const clubToEdit = clubs.find((club) => club.id === clubId);
        setEditedClub(clubToEdit);
    };

    // Function to save the edited club
    const handleSaveEdit = () => {
        // Update the list of clubs with the edited club information
        const updatedClubs = clubs.map((club) => {
            if (club.id === editedClub.id) {
                return editedClub;
            }
            return club;
        });
        setClubs(updatedClubs);
        // Reset editing state
        setEditingClubId(null);
        setEditedClub({});
    };

    // Function to handle input changes when editing club details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update the editedClub state with the new value
        setEditedClub({ ...editedClub, [name]: value });
    };

    return (
        <div className="flex justify-center items-center bg-white min-h-screen">
            <div className="container mx-auto">
                <AddClubForm onAddClub={handleAddClub} /> {/* Add Club Form component */}
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-green-950">Clubs</h1>
                    <div className="grid grid-cols-1 gap-4">
                        {clubs.map((club) => (
                            <div key={club.id} className="border p-4 rounded-md bg-green-950">
                                {editingClubId === club.id ? (
                                    <div>
                                        <label htmlFor="clubName" className="block mb-1 text-green-950">Club Name:</label>
                                        <input
                                            type="text"
                                            id="clubName"
                                            name="clubName"
                                            value={editedClub.clubName}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md px-2 py-1"
                                        />
                                        <label htmlFor="regularDistance" className="block mb-1 text-green-950">Regular Distance:</label>
                                        <input
                                            type="text"
                                            id="regularDistance"
                                            name="regularDistance"
                                            value={editedClub.regularDistance}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md px-2 py-1"
                                        />
                                        <label htmlFor="maxDistance" className="block mb-1 text-green-950">Maximum Distance:</label>
                                        <input
                                            type="text"
                                            id="maxDistance"
                                            name="maxDistance"
                                            value={editedClub.maxDistance}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md px-2 py-1"
                                        />
                                        <label htmlFor="minDistance" className="block mb-1 text-green-950">Minimum Distance:</label>
                                        <input
                                            type="text"
                                            id="minDistance"
                                            name="minDistance"
                                            value={editedClub.minDistance}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md px-2 py-1"
                                        />
                                        <button onClick={handleSaveEdit} className="bg-green-950 text-white px-4 py-2 rounded-md mr-2">Save</button>
                                        <button onClick={() => setEditingClubId(null)} className="bg-red-600 text-white px-4 py-2 rounded-md">Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p><strong>Club Name:</strong> {club.clubName}</p>
                                        <p><strong>Regular Distance:</strong> {club.regularDistance}</p>
                                        <p><strong>Maximum Distance:</strong> {club.maxDistance}</p>
                                        <p><strong>Minimum Distance:</strong> {club.minDistance}</p>
                                        <button onClick={() => handleEditClub(club.id)} className="bg-green-950 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                                        <button onClick={() => handleDeleteClub(club.id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-green-950">Club Distances</h1>
                    <ul>
                        {clubDistances.map((club) => (
                            <li key={club.club_id}>
                                <Link to={`/club_distance/${club.club_id}`} className="text-green-950">{club.club_name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Clubs;

