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
      <div id="garden-sheds-container">
        {
          sheds.length > 0 &&
          sheds.map(shed => (
            shed.plantRecords.length > 0 && (
            <div key={shed._id}>
                  <Link to={ `/sheds/${shed._id}` }>
                    <div className="garden-shed-wrapper">
                      <div className="garden-shed-image-wrapper">
                        <img className="garden-shed-image"
                          src={shed.plantRecords[0].recordPhoto}
                          alt="Garden shed"
                          style={{position: "absolute"}}
                        />
                        <img className="garden-shed-image-frame"
                          src={`${process.env.PUBLIC_URL}/gardenShedFrame.png`}
                          alt="Garden shed frame"
                        />
                      </div>
                      <p>{shed.owner.email}</p>
                      {
                        shed.plantRecords.length > 0 && (
                          <p>
                            {shed.plantRecords.map(plantRecord => plantRecord.commonName).join(', ')}
                          </p>
                        )
                      }
                    </div>
                  </Link>
            </div>
            )
          ))
        }

      </div>
    </div>
  );
}

export default GardenSheds;
