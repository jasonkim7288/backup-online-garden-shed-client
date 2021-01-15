import React from 'react';
import { Link } from 'react-router-dom';
import { getUniquePlantName, removeDomain } from '../utilities/strings';
import FollowIconPlant from './FollowIconPlant';

const PlantThumbnail = ({ plantRecord, withOwner }) => {
  const shedId = plantRecord.ownedShed._id;

  return (
    <Link to={`/sheds/${shedId}/records/${plantRecord._id}`}>
      <FollowIconPlant plantRecord={plantRecord} position="absolute"/>
      <div className="plant-thumbnail-wrapper">
        <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
        {
          withOwner &&
            <p className="garden-shed-owner">{removeDomain(plantRecord.ownedShed.owner.email)}</p>
        }
        <p className="plant-thumbnail-name">{getUniquePlantName(plantRecord)}</p>
      </div>
    </Link>
  );
};

export default PlantThumbnail;
