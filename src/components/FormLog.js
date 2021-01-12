import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { getCurrentDate } from '../utilities/date';
import { uploadFile } from 'react-s3';


const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  region: 'ap-southeast-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

const FormLog = ({ action }) => {
  const { shedId, plantRecordId, logId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const [notes, setNotes] = useState('');
  const [filesToUpload, setFilesToUpload] = useState(null);
  const [filePaths, setFilePaths] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  let history = useHistory();

  useEffect(() => {
    const findPlantRecord = async () => {
      const res = await api.get(`/api/sheds/${shedId}/records/${plantRecordId}`);
      const foundPlantRecord = res.data;
      console.log('found Plant record:', foundPlantRecord);
      if(foundPlantRecord) {
        setPlantRecord(foundPlantRecord);
        console.log(new Date(foundPlantRecord.createdAt));
      }
    }

    try{
      findPlantRecord();
    } catch (error) {
      console.log("error.response: ", error.response);
      history.push('/sheds');
    }
  }, [history, shedId, plantRecordId]);

  useEffect(() => {
    if (plantRecord !== null && action === 'edit') {
      const foundLog = plantRecord.plantLogs.find(plantLog => plantLog._id === logId);
      if (foundLog) {
        const { notes, photos, mainPhotoIndex } = foundLog; 
        setNotes(notes);
        setFilePaths(photos);
        setCurrentIndex(mainPhotoIndex);
      }
    }
  }, [plantRecord, action, logId]);

  useEffect(() => {
    const readAndPreview = file => {
      let reader = new FileReader();
  
      reader.addEventListener('load', () => {
        console.log('reader.result:', file.name);
        setFilePaths([...filePaths, reader.result]);
        console.log('filePaths.length:', filePaths.length);
  
      }, false);
      reader.readAsDataURL(file);
    };
  
    if (filesToUpload && filePaths && filesToUpload.length !== 0 && filesToUpload.length > filePaths.length) {
      readAndPreview(filesToUpload[filePaths.length]);
    }
  }, [filePaths, filesToUpload]);

  const handleSubmit = async event => {
    let fileLocations = [];
    event.preventDefault();

    if (filesToUpload) {
      for(let i = 0; i < filesToUpload.length; i++) {
        try {
          const data = await uploadFile(filesToUpload[i], config);
          console.log(data);
          fileLocations.push(data.location);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (action === 'edit') {
        fileLocations = filePaths;
      }
    }

    console.log('fileLocations:', fileLocations);
    let newLog = {
      photos: fileLocations,
      mainPhotoIndex: currentIndex,
      notes 
    };
    console.log('new log:', newLog);
    try {
      let res;
      if (action === 'edit') {
        res = await api.put(`api/sheds/${shedId}/records/${plantRecordId}/logs/${logId}`, newLog);  
      } else {
        res = await api.post(`api/sheds/${shedId}/records/${plantRecordId}/logs`, newLog);
      }
      console.log(res.data);
    } catch (error) {
      console.log("error:", error.response);
    };
    
    history.push(`/sheds/${shedId}/records/${plantRecordId}`);
  };

  const handleChangeNotes = event => {
    setNotes(event.target.value);
  };

  const handleChangeFiles = event => {
    console.log('event.target.files:', event.target.files);

    const { files } = event.target;
    setFilesToUpload(files);
    setFilePaths([]);
    setCurrentIndex(0);
    // [].forEach.call(files, readAndPreview);
  };

  const handleChangeMain = event => {
    console.log('event.target.value:', typeof event.target.value); 
    setCurrentIndex(parseInt(event.target.value));
  };

  return (
    <div>
      {
        plantRecord &&
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${plantRecord.ownedShed.owner.email}`}</Link>{` > ${plantRecord.commonName}`}
            </p>
          </>
      }
      <h1 className="title">{action === "edit" ? "Edit Log": "Create New Log"}</h1>
      <p className="current-date">{`Date: ${getCurrentDate()}`}</p>
      <form onSubmit={handleSubmit}>
        <textarea id="description-input" name="description" rows="5" placeholder="Notes" value={notes} onChange={handleChangeNotes}/>
        <input multiple onChange={handleChangeFiles} type="file" name="image-upload"/>

        {
          filePaths && filePaths.length > 0 && 
          <>
            <p id="select-main-image">Select Main Image</p>
            <div className="radio-wrapper">
              {
                filePaths.map((file, index) => (
                  <input 
                    type="radio" 
                    className="thumbnail-radio-button" 
                    name="thumbnail-radio-button" 
                    key={index}
                    value={index}
                    onChange={handleChangeMain}
                    checked={index === currentIndex}
                  />
                ))
              }
            </div>
            <div className="thumbnails-wrapper">
              {
                filePaths.map((file, index) => (
                  <img key={index} className="log-thumbnail" src={file} alt="thumbnail"/>
                ))
              }
            </div>

            <img className="log-selected-thumbnail" src={filePaths[currentIndex]} alt="seleted thumbnail main plant"/>
          </>
        }
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FormLog;
