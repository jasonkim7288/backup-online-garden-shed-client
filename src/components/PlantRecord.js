import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../config/api';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PlantLog from './PlantLog';
import { getUniquePlantName, removeDomain } from '../utilities/strings';
import PlantRecordSummary from './PlantRecordSummary';
import FollowIconPlant from './FollowIconPlant';
import { useGlobalState } from '../config/globalState';

const PlantRecord = () => {
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [plantRecord, setPlantRecord] = useState(null);
  const { shedId, plantRecordId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const findPlantRecord = async () => {
      try {
        const res = await api(`/api/sheds/${shedId}/records/${plantRecordId}`);
        const foundPlantRecord = res.data;
        console.log('found Plant record:', foundPlantRecord);
        if(foundPlantRecord) {
          setPlantRecord(foundPlantRecord);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    findPlantRecord();
  }, [shedId, plantRecordId]);

  const handleClickNewLog = () => {
    history.push(`/sheds/${shedId}/records/${plantRecordId}/logs/new`);
  }

  return (
    <div>
      {
        plantRecord &&
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${removeDomain(plantRecord.ownedShed.owner.email)}`}</Link>
              {` > ${getUniquePlantName(plantRecord)}`}
            </p>

            <FollowIconPlant plantRecord={plantRecord} position="relative"/>

            <PlantRecordSummary plantRecord={plantRecord}/>

            {
              isSignedIn && currentUser && currentUser.shed === plantRecord.ownedShed._id &&
                <div className="button-wrapper">
                  <button onClick={handleClickNewLog} className="btn btn-blue button-new-log" type="button">Creat a new log</button>
                </div>
            }

            {
              plantRecord.plantLogs.map((plantLog, index) =>
                <PlantLog key={index}
                  shedId={shedId}
                  plantRecordId={plantRecordId}
                  plantLog={plantLog}
                  plantRecord={plantRecord}
                  setPlantRecord={setPlantRecord}/>
              )
            }
          </>
      }
    </div>
  )
}

export default PlantRecord;
