import React, { useEffect } from 'react';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { SET_SHEDS, SET_USER } from '../config/types';
import { Link } from 'react-router-dom'
import { removeDomain } from '../utilities/strings';


const GardenSheds = () => {
  const { state, dispatch } = useGlobalState();
  const { sheds, isSignedIn, currentUser } = state;



  useEffect(() => {
    const getCurrentSheds = async () => {
      try {
        const res = await api.get('/api/sheds');
        dispatch({
          type: SET_SHEDS,
          payload: res.data
        });
      } catch (error) {
        console.log('error.response: ', error.response);
      }
    };
    getCurrentSheds();
  }, []);

  console.log('sheds: ',sheds)

  const handleClickFollow = async event => {
    event.preventDefault();
    try {
      const res = await api.get(`/api/sheds/${event.target.dataset.value}/toggle-follow`);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (error) {
      console.log('error.response: ', error.response);
    }
  }

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
                  {
                    isSignedIn && currentUser &&
                    <div className="garden-shed-follow">
                      {
                        (currentUser.followingSheds.find(followingShed => followingShed === shed._id)) ?
                          <i onClick={handleClickFollow} data-value={shed._id} className="fas fa-home"></i>
                        :
                          <i onClick={handleClickFollow} data-value={shed._id} className="far fa-star"></i>
                      }
                    </div>
                  }
                </div>
                <div>
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
