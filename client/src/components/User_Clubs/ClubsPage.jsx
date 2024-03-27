import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import AddClubForm from "./AddClubForm";
import ClubsTable from "./ClubsTable";
import AddDistanceForm from "./AddDistanceForm";
import useAuth from "/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserAuth/UserAuth.jsx";

const ClubPage = () => {
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserClubs(user.id);
    }
  }, [user]);

  const fetchUserClubs = async (userId) => {
    try {
      const response = await fetch(`/clubs?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user clubs');
      }
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error('Error fetching user clubs:', error);
    }
  };

  const handleAddClub = (newClub) => {
    setClubs([...clubs, newClub]);
  };

  const onCancelAddClub = () => {
    console.log('Add club canceled');
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader />
      <AddClubForm onSave={handleAddClub} onCancel={onCancelAddClub} user={user} />
      <ClubsTable clubs={clubs} />
    </div>
  );
};

export default ClubPage;
