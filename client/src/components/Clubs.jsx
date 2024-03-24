// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useUser } from './UserContext/UserContext';

// // Add Club Form component
// function AddClubForm({ onAddClub }) {
//     // State for form inputs
//     const [clubName, setClubName] = useState('');
//     const [regularDistance, setRegularDistance] = useState('');
//     const [maxDistance, setMaxDistance] = useState('');
//     const [minDistance, setMinDistance] = useState('');

//     // Form submission handler
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Logic to submit form data
//         const newClub = {
//             clubName,
//             regularDistance,
//             maxDistance,
//             minDistance
//         };
//         // Call the onAddClub function passed from parent component
//         onAddClub(newClub);
//         // Reset form inputs after submission
//         setClubName('');
//         setRegularDistance('');
//         setMaxDistance('');
//         setMinDistance('');
//     };

//     return (
//         <div className="max-w-md mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
//             <h2 className="text-center text-2xl font-bold mb-4 text-gray-50">Add Club</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Club Name"
//                     value={clubName}
//                     onChange={(e) => setClubName(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Regular Distance"
//                     value={regularDistance}
//                     onChange={(e) => setRegularDistance(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Maximum Distance"
//                     value={maxDistance}
//                     onChange={(e) => setMaxDistance(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Minimum Distance"
//                     value={minDistance}
//                     onChange={(e) => setMinDistance(e.target.value)}
//                     className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
//                 >
//                     Add
//                 </button>
//             </form>
//         </div>
//     );
// }

// function Clubs() {
//     const { user } = useUser();
//     const [clubs, setClubs] = useState([]);
//     const [clubDistances, setClubDistances] = useState([]);
//     const [editingClubId, setEditingClubId] = useState(null); // State to track the club being edited
//     const [editedClub, setEditedClub] = useState({}); // State to hold edited club data

//     useEffect(() => {
//         fetch('/club')
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Failed to fetch clubs');
//                 }
//             })
//             .then((data) => {
//                 setClubs(data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching clubs:', error);
//             });
//     }, []);

//     useEffect(() => {
//         fetch('/club_distance')
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     throw new Error('Failed to fetch club distances');
//                 }
//             })
//             .then((data) => {
//                 setClubDistances(data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching club distances:', error);
//             });
//     }, []);

//     // Function to add a new club to the list
//     const handleAddClub = (newClub) => {
//         // Update the list of clubs with the new club
//         setClubs([...clubs, newClub]);
//     };

//     // Function to delete a club from the list
//     const handleDeleteClub = (clubId) => {
//         // Filter out the club to delete from the list
//         const updatedClubs = clubs.filter((club) => club.id !== clubId);
//         setClubs(updatedClubs);
//     };

//     // Function to handle editing a club
//     const handleEditClub = (clubId) => {
//         // Set the editingClubId state to the club being edited
//         setEditingClubId(clubId);
//         // Find the club being edited from the list of clubs and set it in the editedClub state
//         const clubToEdit = clubs.find((club) => club.id === clubId);
//         setEditedClub(clubToEdit);
//     };

//     // Function to save the edited club
//     const handleSaveEdit = () => {
//         // Update the list of clubs with the edited club information
//         const updatedClubs = clubs.map((club) => {
//             if (club.id === editedClub.id) {
//                 return editedClub;
//             }
//             return club;
//         });
//         setClubs(updatedClubs);
//         // Reset editing state
//         setEditingClubId(null);
//         setEditedClub({});
//     };

//     // Function to handle input changes when editing club details
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         // Update the editedClub state with the new value
//         setEditedClub({ ...editedClub, [name]: value });
//     };

//     return (
//         <div className="flex">
//             <AddClubForm onAddClub={handleAddClub} /> {/* Add Club Form component */}
//             <div>
//                 <h1>Clubs</h1>
//                 <div className="grid grid-cols-1 gap-4">
//                     {clubs.map((club) => (
//                         <div key={club.id} className="max-w-md mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
//                             {editingClubId === club.id ? (
//                                 <div>
//                                     <label htmlFor="clubName" className="block mb-1 text-white font-bold">Club Name:</label>
//                                     <input
//                                         type="text"
//                                         id="clubName"
//                                         name="clubName"
//                                         value={editedClub.clubName}
//                                         onChange={handleInputChange}
//                                         className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                                     />
//                                     <label htmlFor="regularDistance" className="block mb-1 text-white font-bold">Regular Distance:</label>
//                                     <input
//                                         type="text"
//                                         id="regularDistance"
//                                         name="regularDistance"
//                                         value={editedClub.regularDistance}
//                                         onChange={handleInputChange}
//                                         className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                                     />
//                                     <label htmlFor="maxDistance" className="block mb-1 text-white font-bold">Maximum Distance:</label>
//                                     <input
//                                         type="text"
//                                         id="maxDistance"
//                                         name="maxDistance"
//                                         value={editedClub.maxDistance}
//                                         onChange={handleInputChange}
//                                         className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                                     />
//                                     <label htmlFor="minDistance" className="block mb-1 text-white font-bold">Minimum Distance:</label>
//                                     <input
//                                         type="text"
//                                         id="minDistance"
//                                         name="minDistance"
//                                         value={editedClub.minDistance}
//                                         onChange={handleInputChange}
//                                         className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
//                                     />

//                                     <button
//                                         onClick={handleSaveEdit}
//                                         className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <p><strong>Club Name:</strong> {club.clubName}</p>
//                                     <p><strong>Regular Distance:</strong> {club.regularDistance}</p>
//                                     <p><strong>Maximum Distance:</strong> {club.maxDistance}</p>
//                                     <p><strong>Minimum Distance:</strong> {club.minDistance}</p>
//                                     <button onClick={() => handleEditClub(club.id)} className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200">Edit</button>
//                                     <button onClick={() => handleDeleteClub(club.id)} className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200">Delete</button>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <ul>
//                     {clubDistances.map((club) => (
//                         <li key={club.club_id}>
//                             <Link to={`/club_distance/${club.club_id}`}>{club.club_name}</Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Clubs;

                                       
