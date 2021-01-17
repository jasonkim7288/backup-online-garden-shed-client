import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { handleError } from '../config/errorHandler';
import GardenShedThumbnail from './GardenShedThumbnail';

const FollowingSheds = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await api.get('/api/sheds/following-sheds');
        setConnectedUser(res.data);
      } catch (error) {
        console.log('error.response: ', error.response);
        handleError(error, history);
      }
    };
    getCurrentUser();
  }, [history, isSignedIn]);

  return (
    <>
      {
        isSignedIn && connectedUser &&
          <>
            <h1 className="title">Following Sheds</h1>
            <div className="thumbnails-container">
              {
                connectedUser.followingSheds.length > 0 &&
                  connectedUser.followingSheds.map(shed => shed.plantRecords.length > 0 && <GardenShedThumbnail shed={shed} key={shed._id}/>)
              }
            </div>
            {
              connectedUser.followingSheds.length <= 0 &&
              <p className="no-data-message">
                <strong>No following Sheds</strong><br/>
                You can click
                <img className="no-data-message-icon" src={`${process.env.PUBLIC_URL}/iconShedFollowLight.png`} alt="follow shed"/><br/>
                to follow sheds you like
              </p>
            }
          </>
      }
    </>
  );
}

export default FollowingSheds;
