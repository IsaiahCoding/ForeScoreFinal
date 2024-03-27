import React, { useContext } from 'react';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx';

const PageHeader = () => {
  const { user } = useContext(UserContext); 
  return (
    <div className="bg-blue-gray-500 text-white p-4 shadow-md rounded-lg flex justify-center items-center">
      
      <h1 className="text-lg font-bold">{`Enter Past Score${user ? `, ${user.name}` : ''}`}</h1>
    </div>
  );
};

export default PageHeader;
