import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';


const PlantThumbnails = () => {
  const { state, dispatch } = useGlobalState();
  const { sheds } = state;
  const [shed, setShed] = useState(null);
  const { shedId } = useParams();
  useEffect(() => {
    // const foundShed = sheds.find(element => element._id === shedId);
    const findShed = async () => {
      const res = await api(`/api/sheds/${shedId}`);
      const foundShed = res.data;
      console.log('foundShed:', foundShed);
      if(foundShed) {
        setShed(foundShed);
      }
    }
    findShed();
  }, []);
  console.log('shed:', shed);
  return (
    <div>
      <button type="button" onClick={async () => {
        const res = await api.get(`/api/sheds/${shedId}/toggle-follow`);
        console.log('res.data:', res.data);
      }}>follow</button>
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <div id="plant-thumbnails-container">
              {shed.plantRecords.map(plantRecord => (
                <Link to={`/sheds/${shedId}/records/${plantRecord._id}`} key={plantRecord._id}>
                  <div className="plant-thumbnail-wrapper">
                    <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
                    <p className="plant-thumbnail-name">{plantRecord.commonName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
      }
    </div>
  )
}

export default PlantThumbnails
