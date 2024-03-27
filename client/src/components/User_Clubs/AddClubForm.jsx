import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";

const AddClubForm = ({ onSave, onCancel, user }) => {
  const [clubName, setClubName] = useState('');
  const [brand, setBrand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      name: clubName,
      brand: brand,
      user_id: user.id,
    };

    fetch('/clubs', {
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
      onSave(data); 
      setClubName('');
      setBrand('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleCancel = () => {
    onCancel(); 
    setClubName('');
    setBrand(''); 
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Add Club</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="clubName" className="block text-gray-700 text-sm font-bold mb-2">
            Club Name
          </label>
          <input
            type="text" 
            id="clubName"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
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
            Add
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

export default AddClubForm;
