
import React, { useState } from 'react';

const AddDistanceForm = ({ onSave }) => {
  const [maxDistance, setMaxDistance] = useState('');
  const [regularDistance, setRegularDistance] = useState('');
  const [minDistance, setMinDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const distances = { maxDistance, regularDistance, minDistance };
    onSave(distances);
    
    setMaxDistance('');
    setRegularDistance('');
    setMinDistance('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={maxDistance} onChange={(e) => setMaxDistance(e.target.value)} placeholder="Max Distance" />
      <input type="number" value={regularDistance} onChange={(e) => setRegularDistance(e.target.value)} placeholder="Regular Distance" />
      <input type="number" value={minDistance} onChange={(e) => setMinDistance(e.target.value)} placeholder="Min Distance" />
      <button type="submit">Add Distances</button>
    </form>
  );
};

export default AddDistanceForm;
