import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../config/api';
import { convertStringToDateString, dayCount } from '../utilities/date';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  }, [shedId, plantRecordId]);

  const handleClickNewLog = () => {
    history.push(`/sheds/${shedId}/records/${plantRecordId}/logs/new`);
  }

  const handleClickDelete = (event) => {
    const index = parseInt(event.target.dataset.value);

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`api/sheds/${shedId}/records/${plantRecordId}/logs/${plantRecord.plantLogs[index]._id}`)
              setPlantRecord({
                ...plantRecord,
                plantLogs:  plantRecord.plantLogs.filter((element, idx) => idx !== index)
              });
            } catch (error) {
              console.log(error.response);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
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
              <button onClick={handleClickNewLog} className="button-new-log" type="button">Creat a new log</button>
            </div>

            {
              plantRecord.plantLogs.map((plantLog, index) =>
                <div key={index}>
                  {
                    plantLog.photos && plantLog.photos.length > 0 &&
                      <div>
                        <img className="selected-thumbnail" src={plantLog.photos[plantLog.mainPhotoIndex]}  alt="main"/>
                        <div className="thumbnails-wrapper add-hover">
                          {
                            plantLog.photos.map((photo, photoIndex) =>
                              <img key={photoIndex}
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
                                  className="thumbnail-image"
                                  src={photo}
                                  alt="thumbnail"
                              />
                            )
                          }
                        </div>
                      </div>
                  }

                  <div className="icon icon-record icon-record-delete">
                    <i onClick={handleClickDelete} className="far fa-trash-alt add-hover" data-value={index}></i>
                  </div>
                  <Link to={`/sheds/${shedId}/records/${plantRecordId}/logs/${plantLog._id}/edit`} className="icon icon-record">
                    <i className="far fa-edit add-hover icon-record-edit"></i>
                  </Link>

                  <p className="sub-headings"><strong>Date:</strong> {`${convertStringToDateString(plantLog.createdAt)} (Day ${dayCount(plantRecord.createdAt, plantLog.createdAt)})`}</p>
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

export default PlantRecord;
