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

  
  const onRoundAdded = (newRound) => {
    console.log('Round added:', newRound);
    
  };

  const handleCancelAddRound = () => {
    console.log('Add round canceled');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }} />
      <RoundsTable onEditRound={handleEditRound} />
      <AddRoundForm onSave={onRoundAdded} onCancel={handleCancelAddRound} user={user} />
      {selectedRoundId && <EditRoundForm roundId={selectedRoundId} onRoundEdited={() => setSelectedRoundId(null)} />}
      <AverageScore />
    </div>
  );
};

export default Rounds;
