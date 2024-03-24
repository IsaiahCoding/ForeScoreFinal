import React, { useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import useAuth from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx';

const AverageScore = () => {
  const { user } = useAuth(); // Assuming you have a useAuth hook for accessing the logged-in user
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const fetchAverageScore = async () => {
      try {
        const response = await fetch(`/scorecard/user/${user.id}`); // Assuming an endpoint to fetch scorecards by user_id
        if (response.ok) {
          const scorecards = await response.json();
          const totalScore = scorecards.reduce((acc, scorecard) => acc + scorecard.total_user_score, 0);
          const average = totalScore / scorecards.length;
          setAverageScore(average);
        } else {
          console.error('Failed to fetch scorecards');
        }
      } catch (error) {
        console.error('Error fetching average score:', error);
      }
    };

    fetchAverageScore();
  }, [user]);

  return (
    <div>
      <h2>Average Score</h2>
      {averageScore !== null ? (
        <p>{`Your average score: ${averageScore}`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AverageScore;
