import React, { useEffect } from 'react';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { SET_SHEDS } from '../config/types';
import { Link } from 'react-router-dom'
import { removeDomain } from '../utilities/strings';


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
      <div id="garden-sheds-container">
        {
          sheds.length > 0 &&
          sheds.map(shed => (
            shed.plantRecords.length > 0 && (
              <Link to={`/sheds/${shed._id}`} key={shed._id} className="garden-shed-wrapper">
                <div className="garden-shed-image-wrapper">
                  <img className="garden-shed-image"
                    src={shed.plantRecords[0].recordPhoto}
                    alt="Garden shed"
                  />
                  <img className="garden-shed-image-frame"
                    src={`${process.env.PUBLIC_URL}/gardenShedFrame.png`}
                    alt="Garden shed frame"
                  />
                </div>
                <div className="garden-shed-text-wrapper">
                <p className="garden-shed-owner">{removeDomain(shed.owner.email)}</p>
                {
                  shed.plantRecords.length > 0 && (
                    <p className="garden-shed-plants-list">
                      {shed.plantRecords.map(plantRecord => plantRecord.commonName).join(', ')}
                    </p>
                  )
                }
                </div>
              </Link>
            )
          ))
        }

      </div>
    </div>
  );
}

export default GardenSheds;
