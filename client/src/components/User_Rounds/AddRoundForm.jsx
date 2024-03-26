import React, { useState, useContext } from 'react';
import PageHeader from './PageHeader';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

const AddRoundForm = ({ onSave, onCancel }) => {
  const [date, setDate] = useState('');
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('');
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      console.error('No logged-in user found');
      return;
    }

    const dataToSend = {
      date,
      course,
      total_user_score: parseInt(score, 10),
      user_id: user.id,
    };

    fetch('/past_scorecard', { // Note the updated endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Success:', data);
      onSave(data); // Trigger any additional actions on save
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleCancel = () => {
    onCancel(); // Trigger any additional actions on cancel
    setDate('');
    setCourse('');
    setScore('');
  };


  return (
    <div>
      
      <PageHeader />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
            Date (MM/DD/YYYY)
          </label>
          <input
            type="text" 
            id="date"
            placeholder="MM/DD/YYYY" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-2">
            Golf Course
          </label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="score" className="block text-gray-700 text-sm font-bold mb-2">
            Score
          </label>
          <input
            type="number"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoundForm;