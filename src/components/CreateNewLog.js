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

const CreateNewLog = () => {
  const { shedId, plantRecordId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const [formData, setFormData] = useState({});
  const [filesToUpload, setFilesToUpload] = useState(null);
  const [filePaths, setFilePaths] = useState(null);
  let history = useHistory();

  useEffect(() => {
    const findPlantRecord = async () => {
      const res = await api(`/api/sheds/${shedId}/records/${plantRecordId}`);
      const foundPlantRecord = res.data;
      console.log('found Plant record:', foundPlantRecord);
      if(foundPlantRecord) {
        setPlantRecord(foundPlantRecord);
        console.log(new Date(foundPlantRecord.createdAt));
      }
    }
    findPlantRecord();
  }, []);

  useEffect(() => {
    if (filesToUpload && filePaths && filesToUpload.length !== 0 && filesToUpload.length > filePaths.length) {
      readAndPreview(filesToUpload[filePaths.length]);
    }
  }, [filePaths])

  const handleSubmit = async event => {
    let fileLocations = [];
    event.preventDefault();
    for(let i = 0; i < filesToUpload.length; i++) {
      try {
        const data = await uploadFile(filesToUpload[i], config);
        console.log(data);
        fileLocations.push(data.location);
      } catch (error) {
        console.log(error);
      }
    }
    console.log('fileLocations:', fileLocations);
    // const res = await api.post(`api/sheds/${shedId}/records/${plantRecordId}`,
      // {
      //   commonName: plants[plantIndex].common_name,
      //   scientificName: plants[plantIndex].scientific_name,
      //   familyCommonName: plants[plantIndex].family_common_name,
      //   recordPhoto: plants[plantIndex].image_url,
      //   description
      // });
      // console.log(res.data);
      // history.push(`/sheds/${shedId}/records/${res.data._id}`);
  };

  const handleChangeNotes = event => {
    setFormData(
      {...formData,
        note: event.target.value
      }
    );
  };

  const readAndPreview = file => {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      console.log('reader.result:', file.name);
      setFilePaths([...filePaths, reader.result]);
      console.log('filePaths.length:', filePaths.length);

    }, false);
    reader.readAsDataURL(file);
  };

  const handleChangeFiles = event => {
    console.log('event.target.files:', event.target.files);

    const { files } = event.target;
    setFilesToUpload(files);
    setFilePaths([]);
    // [].forEach.call(files, readAndPreview);
  };

  const { notes } = formData;

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
      <h1 className="title">Create New Log</h1>
      <p className="current-date">{`Date: ${getCurrentDate()}`}</p>
      <form onSubmit={handleSubmit}>
        <textarea id="description-input" name="description" rows="5" placeholder="Notes" value={notes} onChange={handleChangeNotes}/>
        <input multiple onChange={handleChangeFiles} type="file" name="image-upload"/>

        <p id="select-main-image">Select Main Image</p>
        <div className="radio-wrapper">
          {
            filePaths &&
            filePaths.map((file, index) => (
              <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button" key={index}/>
            ))
          }
          {/* <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button"/> */}
          {/* <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button"/>
          <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button"/>
          <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button"/> */}
          {/* <input type="radio" className="thumbnail-radio-button" name="thumbnail-radio-button"/> */}
        </div>
        <div className="thumbnails-wrapper">
          {
            filePaths &&
            filePaths.map((file, index) => (
              <img key={index} className="log-thumbnail" src={file} alt="thumbnail"/>
            ))
          }
          {/* <img className="log-thumbnail" src="http://placekitten.com/640/480" alt="first thumbnail"/> */}
          {/* <img className="log-thumbnail" src="http://placekitten.com/480/640" alt="second thumbnail"/>
          <img className="log-thumbnail" src="http://placekitten.com/1280/960" alt="third thumbnail"/>
          <img className="log-thumbnail" src="http://placekitten.com/960/1280" alt="fourth thumbnail"/> */}
          {/* <img className="log-thumbnail" src="http://placekitten.com/2568/1580" alt="fifth thumbnail"/> */}
        </div>
        {/* {
          temp && <img className="log-selected-thumbnail" src={temp} alt="seleted thumbnail main plant"/>
        } */}
        <img className="log-selected-thumbnail" src="http://placekitten.com/1280/960" alt="seleted thumbnail main plant"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateNewLog
