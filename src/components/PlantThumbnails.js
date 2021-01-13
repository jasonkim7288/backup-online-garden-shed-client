import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';
import { getUniquePlantName } from '../utilities/strings';
import { SET_USER } from '../config/types';


const PlantThumbnails = () => {
  const { state, dispatch } = useGlobalState();
  const { sheds, isSignedIn, currentUser } = state;
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

  const handleClickFollow = async event => {
    event.preventDefault();
    try {
      const res = await api.get(`/api/sheds/${shedId}/records/${event.target.dataset.value}/toggle-follow`);
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
      <button type="button" onClick={async () => {
        const res = await api.get(`/api/sheds/${shedId}/toggle-follow`);
        console.log('res.data:', res.data);
      }}>follow</button>
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <div id="plant-thumbnails-container">
              {
                shed.plantRecords.map(plantRecord =>
                  <Link to={`/sheds/${shedId}/records/${plantRecord._id}`} key={plantRecord._id}>
                    {
                      isSignedIn && currentUser &&
                        <div className="plant-thumbnail-follow">
                          {
                            (currentUser.followingPlantRecords.find(followingPlantRecord => followingPlantRecord === plantRecord._id)) ?
                              <i onClick={handleClickFollow} data-value={plantRecord._id} className="fas fa-leaf"></i>
                            :
                              <i onClick={handleClickFollow} data-value={plantRecord._id} className="far fa-star"></i>
                          }
                        </div>
                    }
                    <div className="plant-thumbnail-wrapper">

                      <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
                      <p className="plant-thumbnail-name">{getUniquePlantName(plantRecord)}</p>
                    </div>
                  </Link>
                )
              }
            </div>
          </>
      }
    </div>
  )
}

export default PlantThumbnails
