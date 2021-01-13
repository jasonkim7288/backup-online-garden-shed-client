import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/api';
import PlantThumbnail from './PlantThumbnail';

const PlantRecords = () => {
  const [shed, setShed] = useState(null);
  const { shedId } = useParams();
  useEffect(() => {
    const findShed = async () => {
      try {
        const res = await api.get(`/api/sheds/${shedId}`);
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
  }, [shedId]);

  return (
    <>
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <div className="plant-thumbnails-container">
              {
                shed.plantRecords.map(plantRecord =>
                  <PlantThumbnail key={plantRecord._id} shedId={shedId} plantRecord={plantRecord} />
                )
              }
            </div>
          </>
      }
    </>
  );
};

export default PlantRecords;
