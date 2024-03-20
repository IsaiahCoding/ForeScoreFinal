import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function PastRounds({ scorecardData: pastScorecardData, loggedInUser, onAddScorecard }) {
  const [date, setDate] = useState('');
  const [golfCourse, setGolfCourse] = useState('');
  const [par, setPar] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [averageScore, setAverageScore] = useState(0); // State for average score

  const history = useHistory();

  useEffect(() => {
    // Calculate average score when pastScorecardData changes
    if (pastScorecardData.length > 0) {
      const totalScores = pastScorecardData.map(scorecard => parseInt(scorecard.total_score));
      const sum = totalScores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const average = sum / pastScorecardData.length;
      setAverageScore(average);
    } else {
      // If no past scorecards, set average score to 0
      setAverageScore(0);
    }
  }, [pastScorecardData]); // Trigger effect when pastScorecardData changes

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/past_round', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          course: golfCourse,
          par,
          total_score: totalScore,
          score: totalScore,
          user_id: loggedInUser.id,
        }),
      });
      if (response.ok) {
        // Handle successful submission
        const newScorecard = await response.json();
        onAddScorecard(newScorecard); // Add new scorecard to scorecard state in App component
        history.push('/past_round');
      } else {
        // Handle submission failure
        console.error('Failed to submit past round');
      }
    } catch (error) {
      console.error('Error submitting past round:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-50">Past Rounds</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Form inputs */}
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 text-gray-50">Past Scorecards:</h3>
        {/* Display average score */}
        <p className="text-sm text-gray-200 mb-4">Average Score: {averageScore.toFixed(2)}</p>
        {/* List of past scorecards */}
        {pastScorecardData.map((scorecard, index) => (
          <div key={index} className="border-b border-gray-400 mb-4 pb-4">
            <p className="text-sm text-gray-200">
              Date: {scorecard.date}, Golf Course: {scorecard.golfCourse}, Par: {scorecard.par}, Total Score: {scorecard.total_score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastRounds;
