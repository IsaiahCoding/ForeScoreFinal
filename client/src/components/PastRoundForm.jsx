// import React, { useState, useEffect } from 'react';

// function PastRoundForm() {
//     const [date, setDate] = useState('');
//     const [golfCourse, setGolfCourse] = useState('');
//     const [par, setPar] = useState([]);
//     const [score, setScore] = useState([]);
//     const [scorecard, setScorecard] = useState([]);

//     useEffect(() => {
//         fetch('/api/scorecard')
//             .then(res => res.json())
//             .then(data => setScorecard(data));
//     }, []);

//     const handleEditClick = (id) => {
//         const updatedScorecard = scorecard.map((item) => {
//             if (item.id === id) {
//                 return { ...item, date, golfCourse, par, score };
//             }
//             return item;
//         });

//         fetch(`/scorecard/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ date, golfCourse, par, score })
//         })
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error('Failed to update scorecard');
//             }
//             return res.json();
//         })
//         .then(() => setScorecard(updatedScorecard))
//         .catch(error => console.error('Error updating scorecard:', error));
//     };

//     const handleDeleteClick = (id) => {
//         fetch(`/scorecard/${id}`, {
//             method: 'DELETE'
//         })
//         .then(() => {
//             const updatedScorecard = scorecard.filter((item) => item.id !== id);
//             setScorecard(updatedScorecard);
//         })
//         .catch(error => console.error('Error deleting scorecard:', error));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch('/api/scorecard', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ date, golfCourse, par, score })
//         })
//         .then(res => res.json())
//         .then(data => {
//             setScorecard([...scorecard, data]);
//             setDate('');
//             setGolfCourse('');
//             setPar([]);
//             setScore([]);
//         })
//         .catch(error => console.error('Error creating scorecard:', error));
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
//             <form onSubmit={handleSubmit}>
//                 {/* Your form inputs */}
//             </form>

//             {/* Render Scorecard */}
//             <ul>
//                 {scorecard.map((item) => (
//                     <li key={item.id}>
//                         <span>Date: {item.date}</span>
//                         <span>Golf Course: {item.golfCourse}</span>
//                         <button onClick={() => handleEditClick(item.id)}>Edit</button>
//                         <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default PastRoundForm;