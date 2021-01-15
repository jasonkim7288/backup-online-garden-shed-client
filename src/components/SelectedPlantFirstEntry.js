import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { useGlobalState } from '../config/globalState';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import parse from 'html-react-parser';
import { getUniquePlantName, removeDomain } from '../utilities/strings';

const SelectedPlantFirstEntry = () => {
  const { shedId, plantRecordId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const { state } = useGlobalState();
  const { isSignedIn, currentUser } = state;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState('');
  let history = useHistory();

  console.log('SelectedPlantFirstEntry is called!!!!');

  useEffect(() => {
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
    setDescription(parse(plantRecord.description.replace(/<br>/g, '&#10;')));
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
        description: description.replace(/\n/g, '<br>')
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
        <div>
          <p className="path">
            <Link to={`/sheds/${shedId}`}> {`${removeDomain(plantRecord.ownedShed.owner.email)}`}</Link>
            <Link to={`/sheds/${shedId}/records/${plantRecordId}`}> {`> ${getUniquePlantName(plantRecord)}`}</Link>
            {` > About`}
          </p>
          <div>
            <div className="selected-thumbnail">
              <img className="main-image" src={plantRecord.recordPhoto} alt=""/>
            </div>
            <div className="description-wrapper">
              {
                isSignedIn && currentUser && (currentUser.shed === plantRecord.ownedShed._id) &&
                  <>
                    <div className="icon icon-record">
                      <i onClick={handleClickDelete} className="far fa-trash-alt add-hover icon-record-delete"></i>
                    </div>
                    <div className="icon icon-record">
                      <i onClick={handleClickEdit} className="far fa-edit add-hover icon-record-edit"></i>
                    </div>
                  </>
              }
              <p className="sub-headings"><strong>Common name:</strong>&nbsp;{plantRecord.commonName}</p>
              <p className="sub-headings"><strong>Scientific name:</strong>&nbsp;{plantRecord.scientificName}</p>
              <p className="sub-headings"><strong>Family common name:</strong>&nbsp;{plantRecord.familyCommonName}</p>
              <p className="sub-headings mt-10"><strong className="my-notes">My notes:</strong></p>
              {
                isEditMode ?
                  <>
                    <textarea onChange={handleChangeDescription} rows="10" value={description} className="description-input"/>
                    <button className ="btn btn-green button-confirm" onClick={handleClickEditButton} >Confirm</button>
                    <button className="btn btn-red button-cancel" onClick={handleClickCancel}>Cancel</button>
                  </>
                :
                  <p>{parse(plantRecord.description)}</p>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SelectedPlantFirstEntry;
