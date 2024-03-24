import React from 'react';
import PageHeader from './PageHeader';
import RoundsTable from './RoundsTable';
import AddRoundForm from './AddRoundForm';
import EditRoundForm from './EditRoundForm';
import AverageScore from './AverageScore';

const Rounds = () => {
  return (
    <div>
      <PageHeader />
      <RoundsTable />
      <AddRoundForm />
      <EditRoundForm />
      <AverageScore />
    </div>
  );
};

export default Rounds;
