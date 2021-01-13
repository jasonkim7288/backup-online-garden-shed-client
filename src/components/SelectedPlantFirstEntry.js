import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SelectedPlantFirstEntry = () => {
  const { shedId, plantRecordId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState('');
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
  }, [history, isSignedIn, plantRecordId, shedId]);

  const handleClickEdit = () => {
    setIsEditMode(true);
    setDescription(plantRecord.description);
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value);
  }

  const handleClickCancel = () => {
    setIsEditMode(false);
  }
  const handleClickEditButton = async () => {
    try {
      const editPlantRecord = {
        description
      }
      const res = await api.put(`api/sheds/${shedId}/records/${plantRecordId}`, editPlantRecord);
      console.log('resData', res.data);
      setPlantRecord(res.data);
      setIsEditMode(false);
    } catch (error) {
        console.log(error.response);
    }
  }

  const handleClickDelete = event => {
    confirmAlert({
      title: 'Warning!',
      message: 'This will delete the entire plant record which includes all logs. Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await api.delete(`api/sheds/${shedId}/records/${plantRecordId}`);
              history.push(`/sheds/${shedId}`);
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
  };

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
            <div className="selected-thumbnail">
              <img className="main-image" src={plantRecord.recordPhoto} alt=""/>
            </div>
            <div className="icon icon-record">
              <i onClick={handleClickDelete} className="far fa-trash-alt add-hover icon-record-delete"></i>
            </div>
            <div className="icon icon-record">
              <i onClick={handleClickEdit} className="far fa-edit add-hover icon-record-edit"></i>
            </div>
            <p><strong>Common name:</strong>&nbsp;{plantRecord.commonName}</p>
            <p><strong>Scientific name:</strong>&nbsp;{plantRecord.scientificName}</p>
            <p><strong>Family common name:</strong>&nbsp;{plantRecord.familyCommonName}</p>
            {
              isEditMode ?
                <>
                  <textarea onChange={handleChangeDescription} value={description} className="description-input"/>
                  <button className ="button-confirm" onClick={handleClickEditButton} >Confirm</button>
                  <button className="button-cancel" onClick={handleClickCancel}>Cancel</button>
                </>
              :
                <p><strong>Description:</strong>{plantRecord.description}</p>
            }
          </div>
        </>
      }
    </>
  );
};

export default SelectedPlantFirstEntry;
