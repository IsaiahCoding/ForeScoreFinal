import React, { useState, useContext } from 'react';
import PageHeader from './PageHeader';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';
import { Button } from "@material-tailwind/react";


const AddRoundForm = ({ onSave, onCancel, user }) => {
  const [date, setDate] = useState('');
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const dataToSend = {
      user_id: user.id,
      date,
      course,
      total_user_score: parseInt(score, 10),
    };

    fetch('/past_scorecard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`, 
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      onSave(data); 
      setDate('');
      setCourse('');
      setScore('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleCancel = () => {
    onCancel(); 
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
            <Button
              color="blue"
              buttonType="filled"
              size="lg"
              rounded={true}
              block={false}
              iconOnly={false}
              ripple={true}
              type="submit"
            >
              Save
            </Button>
            <Button
              color="red"
              buttonType="filled"
              size="lg"
              rounded={true}
              block={false}
              iconOnly={false}
              ripple={true}
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </Button>
          </div>

      </form>
    </div>
  );
};

export default AddRoundForm;
