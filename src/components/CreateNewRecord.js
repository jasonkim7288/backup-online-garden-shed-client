import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import axios from 'axios';
import { getCurrentDate } from '../utilities/date';

const CreateNewRecord = () => {
  const [shed, setShed] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [plants, setPlants] = useState(null);
  const { shedId } = useParams();
  const [plantIndex, setPlantIndex] = useState(null);
  const [description, setDescription] = useState('');
  let history = useHistory();

  useEffect(() => {
    const findShed = async () => {
      const res = await api(`/api/sheds/${shedId}`);
      const foundShed = res.data;
      console.log('foundShed:', foundShed);
      if(foundShed) {
        setShed(foundShed);
      }
    }
    findShed();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await api.get(`api/plants?q=${searchText}`);
    console.log(res);
    setPlants(res.data);
  }

  const handleChangeSearch = (event) => {
    setSearchText(event.target.value);
  }

  const handleClick = (event, index) => {
    console.log(index);
    setPlantIndex(index);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await api.post(`api/sheds/${shedId}/records`,
      {
        commonName: plants[plantIndex].common_name,
        scientificName: plants[plantIndex].scientific_name,
        familyCommonName: plants[plantIndex].family_common_name,
        recordPhoto: plants[plantIndex].image_url,
        description
      });
      console.log(res.data);
      history.push(`/sheds/${shedId}/records/${res.data._id}`);
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  }
  return (
    <div>
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <h1>Create New Record</h1>
            <p>{`Date: ${getCurrentDate()}`}</p>
            {
              plantIndex === null ?
                <>
                  <form onSubmit={handleSearch}>
                    <input autoFocus type="text" value={searchText} onChange={handleChangeSearch}/>
                    <button type="submit">Search</button>
                  </form>
                  {
                    plants &&
                    <>
                      <h2>{`Searched results for "${searchText}"`} </h2>
                      {
                        plants.map((plant, index) => (
                          <div className="api-wrapper" key={plant.id} onClick={(event) => handleClick(event, index)}>
                            <img className="api-image" src={plant.image_url} alt=""/>
                            <p><strong>Common name:</strong>&nbsp;{plant.common_name}</p>
                            <p><strong>Scientific name:</strong>&nbsp;{plant.scientific_name}</p>
                            <p><strong>Family common name:</strong>&nbsp;{plant.family_common_name}</p>
                          </div>  
                        ))
                      }
                    </>
                  }
                </>
              :
                <div className="api-wrapper" key={plants[plantIndex].id}>
                  <img className="api-image" src={plants[plantIndex].image_url} alt=""/>
                  <p><strong>Common name:</strong>{plants[plantIndex].common_name}</p>
                  <p><strong>Scientific name:</strong>{plants[plantIndex].scientific_name}</p>
                  <p><strong>Family common name:</strong>{plants[plantIndex].family_common_name}</p>
                  <form onSubmit={handleSubmit}>
                    <textarea id="description-input" name="description" rows="10" placeholder="Description" value={description} onChange={handleChangeDescription}/>
                    <button type="submit">Create a new record</button>
                  </form>
                </div>
            }
            
          </>
      }
    </div>
  )
}

export default CreateNewRecord
