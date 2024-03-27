import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import AddClubForm from "./AddClubForm";
import ClubsTable from "./ClubsTable";
import AddDistanceForm from "./AddDistanceForm";
import useAuth from "/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx";

const ClubPage = () => {
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth();

  const fetchClubs = async () => {
    try {
      const response = await fetch('/clubs');
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleAddClub = async (newClub, distances) => {
    try {
      const clubResponse = await fetch('/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClub),
      });
  
      const clubData = await clubResponse.json();
      const clubId = clubData.id;
  
      await fetch(`/clubs/${clubId}/distances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distances),
      });
  
      fetchClubs();
    } catch (error) {
      console.error('Error adding club:', error);
    }
  };

  const handleAddDistance = async (clubId, distances) => {
    try {
      await fetch(`/clubs/${clubId}/distances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distances),
      });
      fetchClubs();
    } catch (error) {
      console.error('Error adding distances:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader />
      <AddClubForm onSave={handleAddClub}  user={user} />
      <ClubsTable clubs={clubs} />
    </div>
  );
};

export default ClubPage;
