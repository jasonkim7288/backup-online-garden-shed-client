import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';
import { convertStringToDateString } from '../utilities/date';

const PlantRecord = () => {
  const [plantRecord, setPlantRecord] = useState(null);
  const { shedId, plantRecordId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const findPlantRecord = async () => {
      const res = await api(`/api/sheds/${shedId}/records/${plantRecordId}`);
      const foundPlantRecord = res.data;
      console.log('found Plant record:', foundPlantRecord);
      if(foundPlantRecord) {
        setPlantRecord(foundPlantRecord);
      }
    }
    findPlantRecord();
  }, []);

  const handleClickNewLog = () => {
    history.push(`/sheds/${shedId}/records/${plantRecordId}/logs/new`);
  }
  return (
    <div>
      {
        plantRecord &&
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${plantRecord.ownedShed.owner.email}`}</Link>
              {` > ${plantRecord.commonName}`}
            </p>
            <div className="icon icon-record icon-record-follow">
              <i className="fas fa-leaf"></i>
            </div>

            <Link to={`/sheds/${shedId}/records/${plantRecordId}/first-entry`} className="button-wrapper">
              <button className="about" type="button">About</button>
            </Link>
            <div className="button-wrapper">
              <button onClick={handleClickNewLog} className="new-log" type="button">Creat a new log</button>
            </div>

            {
              plantRecord.plantLogs.map((plantLog, index) =>
                <div key={index}>
                  {
                    plantLog.photos && plantLog.photos.length > 0 &&
                      <div className="plant-log-container">
                        <div className="plant-log-main-wrapper">
                          <img className="main-image" src={plantLog.photos[plantLog.mainPhotoIndex]}  alt="main"/>
                        </div>

                        {
                          plantLog.photos.map((photo, photoIndex) =>
                            <div key={photoIndex}
                              onClick={() => {
                                setPlantRecord({
                                  ...plantRecord,
                                  plantLogs:  plantRecord.plantLogs.map((element, idx) =>
                                    (idx === index) ?
                                      ({
                                        ...element,
                                        mainPhotoIndex: photoIndex
                                      })
                                    :
                                      element
                                  )
                                });
                              }}
                              className={`thumbnail-${photoIndex + 1} add-hover`}>
                              <img className="thumbnail" src={photo} alt="thumbnail"/>
                            </div>
                          )
                        }
                      </div>
                  }

                  <div className="icon icon-record icon-record-delete">
                    <i className="far fa-trash-alt"></i>
                  </div>
                  <div className="icon icon-record icon-record-edit">
                    <i className="far fa-edit"></i>
                  </div>

                  <p className="sub-headings"><strong>Date:</strong> {convertStringToDateString(plantLog.createdAt)} (Day 1) Need to make this dynamic</p>
                  <p className="sub-headings"><strong>My Notes:</strong></p>
                  <p className="my-notes">{plantLog.notes}</p>
                </div>
              )
            }
          </>
      }
    </div>
  )
}

export default PlantRecord
