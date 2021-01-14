import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { getCurrentDate } from '../utilities/date';
import { useGlobalState } from '../config/globalState';
import ProgressFullScreen from './ProgressFullScreen';

const CreateNewRecord = () => {
  const [shed, setShed] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [plants, setPlants] = useState(null);
  const { shedId } = useParams();
  const [plantIndex, setPlantIndex] = useState(null);
  const [description, setDescription] = useState('');
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  const [isInProgress, setIsInProgress] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!isSignedIn) {
      history.push('/');
      return;
    }

    const findShed = async () => {
      try {
        const res = await api.get(`/api/sheds/${shedId}`);
        const foundShed = res.data;
        console.log('foundShed:', foundShed);
        if(foundShed) {
          setShed(foundShed);
        }
      } catch (error) {
        console.log('error.response: ', error.response);
      }
    }
    findShed();
  }, [history, isSignedIn, shedId]);

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
    setIsInProgress(true);
    event.preventDefault();
    try {
      const res = await api.post(`api/sheds/${shedId}/records`,
        {
          commonName: plants[plantIndex].common_name,
          scientificName: plants[plantIndex].scientific_name,
          familyCommonName: plants[plantIndex].family_common_name,
          recordPhoto: plants[plantIndex].image_url,
          description: description.replace(/\n/g, '<br>')
        });
      console.log(res.data);
      history.push(`/sheds/${shedId}/records/${res.data._id}`);
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsInProgress(false);
    }
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  }
  return (
    <div>
      { isInProgress && <ProgressFullScreen />}
      {
        shed &&
          <>
            <p className="path">{shed.owner.email}</p>
            <h1 className="title">Create New Record</h1>
            <p className="current-date">{`Date: ${getCurrentDate()}`}</p>
            {
              plantIndex === null ?
                <>
                  <form onSubmit={handleSearch}>
                    <div className="input-content-wrapper">
                      <input className="input-content" placeholder="Search keywords" autoFocus type="text" value={searchText} onChange={handleChangeSearch}/>
                      <button className="input-button" type="submit">Search</button>
                    </div>
                  </form>
                  {
                    plants &&
                    <>
                      <h2>{`Searched results for "${searchText}"`} </h2>
                      {
                        plants.map((plant, index) => (
                          <div className="api-wrapper add-hover" key={plant.id} onClick={(event) => handleClick(event, index)}>
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
                  <p><strong>Common name:</strong>&nbsp;{plants[plantIndex].common_name}</p>
                  <p><strong>Scientific name:</strong>&nbsp;{plants[plantIndex].scientific_name}</p>
                  <p><strong>Family common name:</strong>&nbsp;{plants[plantIndex].family_common_name}</p>
                  <form onSubmit={handleSubmit}>
                    <textarea className="description-input" name="description" rows="10" placeholder="Description" value={description} onChange={handleChangeDescription}/>
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
