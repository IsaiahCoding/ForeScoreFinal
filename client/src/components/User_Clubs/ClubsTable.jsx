import React from 'react';
import { Button } from "@material-tailwind/react";

const ClubsTable = ({ clubs }) => {
  const handleDeleteClub = async (clubId) => {
    try {
      const response = await fetch(`/clubs/${clubId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete club');
      }
      // Update state or re-fetch club data
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto bg-green-500 bg-opacity-60 p-6 rounded-lg shadow-lg border border-green-600">
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Clubs</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-4 py-2">Club Name</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map(club => (
                <tr key={club.id} className="bg-white border-b">
                  <td className="px-4 py-2 text-slate-900">{club.name}</td>
                  <td className="px-4 py-2 text-slate-900">{club.brand}</td>
                  <td className="px-4 py-2">
                    <Button
                      color="red"
                      buttonType="filled"
                      size="regular"
                      rounded={true}
                      block={false}
                      iconOnly={false}
                      ripple={true}
                      onClick={() => handleDeleteClub(club.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubsTable;

