import React, { useState, useEffect } from 'react';
import useAuth from '../UserAuth/UserAuth';
import { useHistory } from 'react-router-dom'; 
import { Button } from "@material-tailwind/react";
import CalendarIcon from '../CalendarIcon';

const RoundsTable = () => {
  const [rounds, setRounds] = useState([]);
  const { user } = useAuth();
  const history = useHistory();

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
    history.push(`/edit-scorecard/${scorecardId}`);
  };

  const handleDelete = async (scorecardId) => {
    try {
      const response = await fetch(`/scorecard/${scorecardId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete scorecard');
      }
      setRounds(rounds.filter((round) => round.id !== scorecardId));
    } catch (error) {
      console.error('Error deleting scorecard:', error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto bg-green-500 bg-opacity-60 p-6 rounded-lg shadow-lg border border-green-600">
      <CalendarIcon />
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">ForeScore: Past Rounds</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Golf Course</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map(round => (
                <tr key={round.id} className="bg-white border-b">
                  <td className="px-4 py-2 text-slate-900">{round.date}</td>
                  <td className="px-4 py-2 text-slate-900">{round.course_name}</td>
                  <td className="px-4 py-2 text-slate-900">{round.total_user_score}</td>
                  <td className="px-4 py-2">
                    <Button
                      color="blue"
                      buttonType="gradient"
                      size="regular"
                      rounded={true}
                      block={false}
                      iconOnly={false}
                      ripple={true}
                      onClick={() => handleEdit(round.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      color="red"
                      buttonType="filled"
                      size="regular"
                      rounded={true}
                      block={false}
                      iconOnly={false}
                      ripple={true}
                      onClick={() => handleDelete(round.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoundsTable;
