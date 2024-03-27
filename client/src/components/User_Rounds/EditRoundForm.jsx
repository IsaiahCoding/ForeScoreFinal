import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';
import { Button, Input } from "@material-tailwind/react";

const EditRoundForm = () => {
  const { scorecardId } = useParams();
  const { user } = useContext(UserContext);
  const [scorecard, setScorecard] = useState({
    date: '',
    course_name: '',
    total_user_score: '',
  });
  const history = useHistory();

  useEffect(() => {
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
    if (user && user.id) {
      fetch(`/scorecard/${scorecardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...scorecard,
          user_id: user.id,
        }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to update scorecard');
          history.push('/rounds');
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
    history.goBack();
  };

  return (
    <div className='bg-gray-100'>
    <div className="max-w-3xl mx-auto bg-green-500 bg-opacity-60 p-6 rounded-lg shadow-lg border border-green-600">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6 bg-white text-2xl">
          <Input
            label="Date (DD/MM/YYYY)"
            id="date"
            name="date"
            type="text"
            value={scorecard.date}
            onChange={handleChange}
            color="gray-900"
          />
        </div>
        <div className="mb-6 bg-white">
          <Input
            label="Golf Course"
            id="course_name"
            name="course_name"
            type="text"
            value={scorecard.course_name}
            onChange={handleChange}
            color="gray-900"
          />
        </div>
        <div className="mb-6 bg-white">
          <Input
            label="Score"
            id="total_user_score"
            name="total_user_score"
            type="number"
            value={scorecard.total_user_score}
            onChange={handleChange}
            color="gray-900"
          />
        </div>
        <Button
          type="submit"
          color="blue"
          buttonType="filled"
          size="lg"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple={true}
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          color="red"
          buttonType="filled"
          size="lg"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple={true}
          className="ml-4"
        >
          Cancel
        </Button>
      </form>
    </div>
    </div>
  );
};

export default EditRoundForm;
