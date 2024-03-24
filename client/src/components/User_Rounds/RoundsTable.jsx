import React, { useState, useEffect } from 'react';
import useAuth from '../UserAuth/UserAuth';

const RoundsTable = () => {
  const [rounds, setRounds] = useState([]);
  const { user } = useAuth(); // Assuming your hook returns user info

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

  return (
    <div>
      <h2>Rounds Table</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Golf Course</th>
            <th>Score</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map(round => (
            <tr key={round.id}>
              <td>{round.date}</td>
              <td>{round.course_name}</td>
              <td>{round.total_user_score}</td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundsTable;
