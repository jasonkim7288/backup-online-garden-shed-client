import React, { useEffect } from 'react';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { SET_SHEDS } from '../config/types';
import { Link } from 'react-router-dom'


const GardenSheds = () => {
  const { state, dispatch } = useGlobalState();
  const { sheds } = state;

  useEffect(() => {
    api.get('/api/sheds')
      .then(res => {
        dispatch({
          type: SET_SHEDS,
          payload: res.data
        })
      });
  }, []);

  console.log('sheds: ',sheds)

  return (
    <div>
      <h1>Garden Sheds</h1>
      <div id="garden-sheds-container">
        {
          sheds.length > 0 &&
          sheds.map(shed => (
            <div key={shed._id}>
              {
                shed.plantRecords.length > 0 && (
                  <Link to={ `/sheds/${shed._id}` }>
                    <img className="garden-shed" src={shed.plantRecords[0].recordPhoto} alt=""/>
                  </Link>
                )
              }
              <p>{shed.owner.email}</p>
              {
                shed.plantRecords.length > 0 && (
                  <p>
                    {shed.plantRecords.map(plantRecord => plantRecord.commonName).join(', ')}
                  </p>
                )
              }
            </div>
          ))
        }
      </div>
    </div> 
  );
}

export default GardenSheds;
