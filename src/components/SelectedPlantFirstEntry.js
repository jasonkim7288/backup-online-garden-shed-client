import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';

const SelectedPlantFirstEntry = () => {
  const { shedId, plantRecordId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  console.log('SelectedPlantFirstEntry is called!!!!');

  useEffect(() => {
    if (!isSignedIn) {
      history.push('/');
      return;
    }

    const findPlantRecord = async () => {
      try{
        const res = await api.get(`/api/sheds/${shedId}/records/${plantRecordId}`);
        const foundPlantRecord = res.data;
        console.log('found Plant record:', foundPlantRecord);
        if(foundPlantRecord) {
          setPlantRecord(foundPlantRecord);
        }
      } catch (error) {
        console.log("error.response: ", error.response);
      }
    }
    findPlantRecord();
  }, []);

  return (
    <>
      {
        plantRecord && 
        <>
          <p className="path">
            <Link to={`/sheds/${shedId}`}> {`${plantRecord.ownedShed.owner.email}`}</Link>
            <Link to={`/sheds/${shedId}/records/${plantRecordId}`}> {`> ${plantRecord.commonName}`}</Link>
            {` > About`}
          </p>
          <div>
            <div className="plant-log-main-wrapper">
              <img className="main-image" src={plantRecord.recordPhoto} alt=""/>
            </div>
            <p><strong>Common name:</strong>&nbsp;{plantRecord.commonName}</p>
            <p><strong>Scientific name:</strong>&nbsp;{plantRecord.scientificName}</p>
            <p><strong>Family common name:</strong>&nbsp;{plantRecord.familyCommonName}</p>
            <p><strong>Description:</strong>{plantRecord.description}</p>
          </div>
        </>     
      }
    </>
  );
};

export default SelectedPlantFirstEntry;
