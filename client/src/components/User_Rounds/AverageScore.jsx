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

  const bgColorClass = () => {
    if (averageScore < 79) return "bg-green-500";
    if (averageScore < 89) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={`${bgColorClass()} p-4 rounded-lg shadow-md max-w-md mx-auto mt-5`}>
      <h2 className="text-center text-2xl font-bold mb-4 text-white">Average Score</h2>
      {averageScore !== null ? (
        <p className="text-center text-lg font-medium text-white">{`Your average score: ${averageScore}`}</p>
      ) : (
        <p className="text-center text-lg font-medium text-gray-200">Loading...</p>
      )}
    </div>
  );
};

export default AverageScore;
