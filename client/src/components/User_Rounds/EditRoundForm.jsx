import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx'; // Import UserContext

const EditRoundForm = () => {
  const { scorecardId } = useParams(); // Make sure this matches your route parameter
  const { user } = useContext(UserContext); // Extract user from UserContext
  const [scorecard, setScorecard] = useState({
    date: '',
    course_name: '',
    total_user_score: '',
  });
  const history = useHistory();

  useEffect(() => {
    // Fetch the scorecard data using scorecardId
    if (scorecardId) {
      fetch(`/scorecard/${scorecardId}`)
      .then(response => response.json())
      .then(data => setScorecard(data))
      .catch(error => console.error('Error fetching scorecard:', error));
    } else {
      console.error('Scorecard ID is undefined.');
    }
  }, [scorecardId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Make sure to check if user exists and has an ID
    if (user && user.id) {
      fetch(`/scorecard/${scorecardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...scorecard,
          user_id: user.id, // Use user.id from UserContext
        }),
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update scorecard');
        history.push('/rounds'); // Navigate back to the rounds page or wherever makes sense in your app
      })
      .catch(error => console.error('Error updating scorecard:', error));
    } else {
      console.error('User ID is undefined.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScorecard(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    history.goBack(); // Or navigate to a specific path if you prefer
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="date" className="block text-slate-50 text-sm font-bold mb-2">Date:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          name="date"
          type="text"
          placeholder="YYYY-MM-DD"
          value={scorecard.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="course_name" className="block text-slate-50 text-sm font-bold mb-2">Golf Course:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
          id="course_name"
          name="course_name"
          type="text"
          placeholder="Enter golf course"
          value={scorecard.course_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="total_user_score" className="block text-slate-50 text-sm font-bold mb-2">Score:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
          id="total_user_score"
          name="total_user_score"
          type="number"
          placeholder="Enter total score"
          value={scorecard.total_user_score}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-zinc-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">Save</button>
      <button type="button" onClick={handleCancel} className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">Cancel</button>
    </form>
  );
};

export default EditRoundForm;
