import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../config/api';
import axios from 'axios';

const CreateNewRecord = () => {
  const [shed, setShed] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [plants, setPlants] = useState(null);
  const { shedId } = useParams();
  const [plantIndex, setPlantIndex] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await api.get(`api/plants?q=${searchText}`);
    console.log(res);
    setPlants(res.data);
  }

  const handleChange = (event) => {
    setSearchText(event.target.value);
  }

  const handleClick = (event, index) => {
    console.log(index);
    setPlantIndex(index);
  } 
  return (
    <div>
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <h1>Create New Record</h1>
            <p>Date: 21/12/2020</p>
            {
              plantIndex === null ?
                <>
                  <form onSubmit={handleSubmit}>
                    <input autoFocus type="text" value={searchText} onChange={handleChange}/>
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
                </div>
            }
            
          </>
      }
    </div>
  )
}

export default CreateNewRecord
