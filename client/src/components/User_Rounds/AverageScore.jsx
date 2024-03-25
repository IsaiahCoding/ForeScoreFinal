import React, { useState, useEffect } from 'react';
import useAuth from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx';

const AverageScore = () => {
  const { user } = useAuth();
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const fetchAverageScore = async () => {
      try {
        const response = await fetch(`/scorecard/user/${user.id}`); 
        if (response.ok) {
          const scorecards = await response.json();
          const totalScore = scorecards.length > 0 ? scorecards.reduce((acc, scorecard) => acc + scorecard.total_user_score, 0) : 0;
          const average = scorecards.length > 0 ? totalScore / scorecards.length : 0;
          
          setAverageScore(parseFloat(average.toFixed(2)));
        } else {
          console.error('Failed to fetch scorecards');
          setAverageScore(0); 
        }
      } catch (error) {
        console.error('Error fetching average score:', error);
        setAverageScore(0); 
      }
    };
  
    if (user && user.id) {
      fetchAverageScore();
    }
  }, [user]);

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-5">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-800">Average Score</h2>
      {averageScore !== null ? (
        <p className="text-center text-lg font-medium text-green-700">{`Your average score: ${averageScore}`}</p>
      ) : (
        <p className="text-center text-lg font-medium text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default AverageScore;
