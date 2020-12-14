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
        console.log(res);
        console.log(res.data[0].plantRecords.length);
        console.log(res.data[0].plantRecords[0].commonName);
        console.log(res.data[0].plantRecords[1].commonName);
        console.log(res.data[0].plantRecords[0].recordPhoto);
        console.log(res.data[0].plantRecords[1].recordPhoto);
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
        <div>
          <img className="garden-shed" src="http://placekitten.com/800/400" alt=""/>
          <p>some email</p>
          <p>Daisy, Sun flower, Peace Lilly</p>
        </div>
        <div>
          <img className="garden-shed" src="http://placekitten.com/800/400" alt=""/>
          <p>some email</p>
          <p>Daisy, Sun flower, Peace Lilly</p>
        </div>
        <div>
          <img className="garden-shed" src="http://placekitten.com/800/400" alt=""/>
          <p>some email</p>
          <p>Daisy, Sun flower, Peace Lilly</p>
        </div>
        <div>
          <img className="garden-shed" src="http://placekitten.com/800/400" alt=""/>
          <p>Hello</p>
        </div>
      </div>
    </div> 
  );
}

export default GardenSheds;
