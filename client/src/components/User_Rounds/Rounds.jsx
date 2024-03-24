// Rounds.jsx
import React, { useState } from 'react';
import PageHeader from './PageHeader';
import RoundsTable from './RoundsTable';
import AddRoundForm from './AddRoundForm';
import EditRoundForm from './EditRoundForm';
import AverageScore from './AverageScore';

const Rounds = () => {
  const [selectedRoundId, setSelectedRoundId] = useState(null);

  // Function to be called when a user selects a round to edit from the RoundsTable
  const handleEditRound = (roundId) => {
    setSelectedRoundId(roundId);
  };

  return (
    <div>
      <PageHeader />
      <RoundsTable onEditRound={handleEditRound} />
      <AddRoundForm />
      {selectedRoundId && <EditRoundForm roundId={selectedRoundId} onRoundEdited={() => setSelectedRoundId(null)} />}
      <AverageScore />
    </div>
  );
};

export default Rounds;
