import React, { useState, useEffect } from 'react';
import useAuth from '../UserAuth/UserAuth';
import { useHistory } from 'react-router-dom'; // To navigate to the edit form

const RoundsTable = () => {
  const [rounds, setRounds] = useState([]);
  const { user } = useAuth();
  const history = useHistory(); // For navigating to the edit page

  useEffect(() => {
    if (!user?.id) {
      console.error('UserID is undefined.');
      return;
    }

    fetch(`/scorecard/user/${user.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch rounds');
        }
        return response.json();
      })
      .then(data => {
        setRounds(data);
      })
      .catch(error => {
        console.error('Error fetching rounds:', error);
      });
  }, [user?.id]);

  const handleEdit = (scorecardId) => {
    // Navigate to a specific route for editing, passing the scorecardId as state or as part of the URL
    history.push(`/edit-scorecard/${scorecardId}`); // Adjust the path as necessary
  };

  const handleDelete = async (scorecardId) => {
    try {
      const response = await fetch(`/scorecard/${scorecardId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete scorecard');
      }
      // Filter out the deleted scorecard from the rounds state
      setRounds(rounds.filter((round) => round.id !== scorecardId));
    } catch (error) {
      console.error('Error deleting scorecard:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4" style={{ color: '#f8fafc' }}>Past Rounds</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-slate-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Golf Course</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody className="text-slate-950">
            {rounds.map(round => (
              <tr key={round.id} className="bg-slate-50 border-b">
                <td className="px-4 py-2">{round.date}</td>
                <td className="px-4 py-2">{round.course_name}</td>
                <td className="px-4 py-2">{round.total_user_score}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(round.id)}
                    className="bg-zinc-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(round.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoundsTable;
