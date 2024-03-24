// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import AddClubForm from './AddClubForm'; // Import the AddClubForm component
// import { useUser } from './UserContext/UserContext';

// function ClubDistance() {
//     const { user } = useUser();
//     const [clubs, setClubs] = useState([]);
//     const [clubDistances, setClubDistances] = useState([]);

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
//     const handleDeleteClub = (clubToDelete) => {
//         // Filter out the club to delete from the list
//         const updatedClubs = clubs.filter(club => club.club_id !== clubToDelete.club_id);
//         setClubs(updatedClubs);
//     };

//     // Function to edit a club in the list
//     const handleEditClub = (clubToEdit) => {
//         // Filter out the club to edit from the list
//         const updatedClubs = clubs.filter(club => club.club_id !== clubToEdit.club_id);
//         setClubs(updatedClubs);
//     };

//     return (
//         <div className="flex">
//             <AddClubForm onAddClub={handleAddClub} /> {/* Add Club Form component */}
//             <div>
//                 <h1>Clubs</h1>
//                 {clubs.map((club) => (
//                     <div key={club.club_id} className="bg-white shadow-md rounded-md p-4 mb-4">
//                         <p><strong>Club Name:</strong> {club.clubName}</p>
//                         <p><strong>Club Type:</strong> {club.clubType}</p>
//                         <p><strong>Regular Distance:</strong> {club.regularDistance}</p>
//                         <p><strong>Maximum Distance:</strong> {club.maxDistance}</p>
//                         <p><strong>Minimum Distance:</strong> {club.minDistance}</p>
//                         <button onClick={() => handleEditClub(club)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
//                         <button onClick={() => handleDeleteClub(club)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
//                     </div>
//                 ))}
//                 <h1>Club Distances</h1>
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

// export default ClubDistance;
