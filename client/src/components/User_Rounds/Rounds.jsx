import React, { useState } from 'react';
import PageHeader from './PageHeader';
import RoundsTable from './RoundsTable';
import AddRoundForm from './AddRoundForm';
import EditRoundForm from './EditRoundForm';
import AverageScore from './AverageScore';
import useAuth from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx';

const Rounds = () => {
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  // useAuth hook is used here, assuming it provides the current user context
  const { user } = useAuth(); 

  const handleEditRound = (roundId) => {
    setSelectedRoundId(roundId);
  };

  // This method is now simplified to handle UI logic after a round has been successfully added
  const onRoundAdded = (newRound) => {
    console.log('Round added:', newRound);
    // Implement any additional logic needed after adding a round, such as refreshing the list of rounds
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
