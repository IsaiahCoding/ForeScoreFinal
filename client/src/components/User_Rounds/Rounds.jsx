import React, { useState } from 'react';
import PageHeader from './PageHeader';
import RoundsTable from './RoundsTable';
import AddRoundForm from './AddRoundForm';
import EditRoundForm from './EditRoundForm';
import AverageScore from './AverageScore';
import useAuth from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx';

const Rounds = () => {
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const { user } = useAuth(); 

  const handleEditRound = (roundId) => {
    setSelectedRoundId(roundId);
  };

  const handleAddRound = async (roundData) => {
    const dataToSend = { ...roundData, user_id: user.id };
  
    try {
      const response = await fetch('/scorecard', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        const newScorecard = await response.json();
        console.log('New scorecard saved:', newScorecard);
        
      } else {
        
        console.error('Failed to save the scorecard');
      }
    } catch (error) {
      console.error('Error saving the scorecard:', error);
    }
  };

  const handleCancelAddRound = () => {
    console.log('Add round canceled');
  };

  return (
    <div>
      <PageHeader />
      <RoundsTable onEditRound={handleEditRound} />
      <AddRoundForm onSave={handleAddRound} onCancel={handleCancelAddRound} />
      {selectedRoundId && <EditRoundForm roundId={selectedRoundId} onRoundEdited={() => setSelectedRoundId(null)} />}
      <AverageScore />
    </div>
  );
};

export default Rounds;
