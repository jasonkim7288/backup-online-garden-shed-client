import React, { useEffect, useState } from 'react';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import GardenShedThumbnail from './GardenShedThumbnail';

const FollowingSheds = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn } = state;

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await api.get('/api/sheds/following-sheds');
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
            <h1 className="title">Following Sheds</h1>
            <div className="garden-sheds-container">
              {
                connectedUser && connectedUser.followingSheds.length > 0 &&
                connectedUser.followingSheds.map(shed => shed.plantRecords.length > 0 && <GardenShedThumbnail shed={shed} key={shed._id}/>)
              }
            </div>
          </>
      }
    </>
  );
}

export default FollowingSheds;
