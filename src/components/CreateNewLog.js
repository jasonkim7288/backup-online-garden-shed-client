import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { getCurrentDate } from '../utilities/date';

const CreateNewLog = () => {
  const { shedId, plantRecordId } = useParams();
  const [plantRecord, setPlantRecord] = useState(null);
  const [formData, setFormData] = useState({});
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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  }

  const handleChangeNotes = (event) => {
    setFormData(
      {...formData,
        note: event.target.value
      }
    );
  }

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
        
        <input type="file" name="image-upload"/>
        <button type="submit">Submit</button>
        <p>Select Main Image</p>
      </form>
    </div>
  )
}

export default CreateNewLog
