import React from 'react';
import NavBar from './NavBar';

function Home() {
  return (
    <div>
      <NavBar />
    
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-2">Welcome to Fore Score</h1>
      <p className="text-lg text-gray-200">Elevating your game, one swing at a time</p>
    </div>
    </div>
  );
}

export default Home;
