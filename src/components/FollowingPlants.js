import React, { useState, useEffect } from 'react';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import PlantThumbnail from './PlantThumbnail';

const FollowingPlants = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn } = state;

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await api.get('/api/sheds/following-plant-records');
        setConnectedUser(res.data);
      } catch (error) {
        console.log('error.response: ', error.response);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {
        isSignedIn && connectedUser &&
          <>
            <div className="plant-thumbnails-container">
              {
                connectedUser.followingPlantRecords.map(plantRecord =>
                  <PlantThumbnail key={plantRecord._id} plantRecord={plantRecord} withOwner={true}/>
                )
              }
            </div>
          </>
      }
    </>
  );
};

export default FollowingPlants;