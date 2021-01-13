import React, { useEffect, useState } from 'react';
import api from '../config/api';
import GardenShedThumbnail from './GardenShedThumbnail';

const GardenSheds = () => {
  const [sheds, setSheds] = useState(null);

  useEffect(() => {
    const getCurrentSheds = async () => {
      try {
        const res = await api.get('/api/sheds');
        setSheds(res.data);
      } catch (error) {
        console.log('error.response: ', error.response);
      }
    };
    getCurrentSheds();
  }, []);


  return (
    <div id="garden-sheds-container">
      {
        sheds && sheds.length > 0 &&
        sheds.map(shed => shed.plantRecords.length > 0 && <GardenShedThumbnail shed={shed} key={shed._id}/>)
      }
    </div>
  );
}

export default GardenSheds;
