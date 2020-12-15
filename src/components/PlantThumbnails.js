import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';


const PlantThumbnails = () => {
  const { state, dispatch } = useGlobalState();
  const { sheds } = state;
  const [shed, setShed] = useState(null); 
  const { shedId } = useParams();
  console.log(shedId);
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
      {shed && shed.owner.email}
      <h1>Plant Thumbnails</h1>
      <div id="plant-thumbnails-container">
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 1</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 2</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 3</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 4</p>
        </div>
      </div>
    </div>
  )
}

export default PlantThumbnails
