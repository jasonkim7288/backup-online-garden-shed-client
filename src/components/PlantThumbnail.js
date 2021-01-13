import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { SET_USER } from '../config/types';
import { getUniquePlantName } from '../utilities/strings';

const PlantThumbnail = ({ shedId, plantRecord }) => {
  const { state, dispatch } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [isInProgress, setIsInProgress] = useState(false);

  const handleClickFollow = async event => {
    setIsInProgress(true);
    event.preventDefault();
    try {
      const res = await api.get(`/api/sheds/${shedId}/records/${event.target.dataset.value}/toggle-follow`);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    } catch (error) {
      console.log('error.response: ', error.response);
    } finally {
      setIsInProgress(false);
    }
  }

  console.log('isInProgress:', isInProgress);

  return (
    <Link to={`/sheds/${shedId}/records/${plantRecord._id}`}>
      {
        isSignedIn && currentUser &&
          <div className="plant-thumbnail-follow">
            {
              isInProgress ?
                <i className="fas fa-spinner spin"></i>
              :
                (
                  (currentUser.followingPlantRecords.find(followingPlantRecord => followingPlantRecord === plantRecord._id)) ?
                    <img
                      onClick={handleClickFollow}
                      data-value={plantRecord._id}
                      src={`${process.env.PUBLIC_URL}/iconPlantFollowDark.PNG`}
                      alt="follow plant"
                    />
                  :
                    <img
                      onClick={handleClickFollow}
                      data-value={plantRecord._id}
                      src={`${process.env.PUBLIC_URL}/iconPlantFollowLight.PNG`}
                      alt="follow plant"
                    />
                )
            }
          </div>
      }
      <div className="plant-thumbnail-wrapper">
        <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
        <p className="plant-thumbnail-name">{getUniquePlantName(plantRecord)}</p>
      </div>
    </Link>
  );
};

export default PlantThumbnail;
