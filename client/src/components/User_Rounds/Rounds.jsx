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
    <div className="container mx-auto px-4">
      <div className="mb-8">
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
          <RoundsTable onEditRound={handleEditRound} />
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <AddRoundForm onSave={onRoundAdded} onCancel={handleCancelAddRound} user={user} />
          <div className="mt-8">
            <AverageScore />
          </div>
        </div>
      </div>
      {selectedRoundId && <EditRoundForm roundId={selectedRoundId} onRoundEdited={() => setSelectedRoundId(null)} />}
    </div>
  );
};

export default Rounds;
