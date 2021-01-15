import React from 'react';
import { getUniquePlantName} from '../utilities/strings';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

const PlantRecordSummary = ({ plantRecord }) => {
  return (
    <>
    <h1 className="title">{getUniquePlantName(plantRecord)}</h1>
    <div className="summary-wrapper">
      <img className="plant-thumbnail" src={plantRecord.recordPhoto} alt=""/>
      <div className="summary-text-wrapper">
        <p><strong>Common name:</strong>&nbsp;{plantRecord.commonName}</p>
        <p><strong>Scientific name:</strong>&nbsp;{plantRecord.scientificName}</p>
        <p><strong>Family common name:</strong>&nbsp;{plantRecord.familyCommonName}</p>
        <p><strong>Description:&nbsp;</strong>{parse(plantRecord.description)}</p>
        <Link to={`/sheds/${plantRecord.ownedShed._id}/records/${plantRecord._id}/first-entry`} className="button-wrapper">
          <button className="btn btn-green about" type="button">More details</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default PlantRecordSummary;
