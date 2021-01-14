import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { removeDomain } from '../utilities/strings';
import PlantThumbnail from './PlantThumbnail';

const MyGardenShed = () => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [shed, setShed] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (!isSignedIn || !currentUser) {
      history.push('/');
    } else {
      const findShed = async () => {
        try {
          const res = await api.get(`/api/sheds/${currentUser.shed}`);
          const foundShed = res.data;
          console.log('foundShed:', foundShed);
          if(foundShed) {
            setShed(foundShed);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
      findShed();
    }

  }, [history, isSignedIn, currentUser]);

  return (
    <>
      {
        isSignedIn && currentUser && shed &&
          <>
            <p className="path">{removeDomain(shed.owner.email)}</p>
            <h1 className="title">My Garden Shed</h1>
            <div className="plant-thumbnails-container">
              {
                shed.plantRecords.map(plantRecord =>
                  <PlantThumbnail key={plantRecord._id} shedId={currentUser.shed} plantRecord={plantRecord} />
                )
              }
            </div>
          </>
      }
    </>
  );
};

export default MyGardenShed;
