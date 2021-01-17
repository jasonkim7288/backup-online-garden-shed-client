import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../config/api';
import { getCurrentDate } from '../utilities/date';
import { useGlobalState } from '../config/globalState';
import ProgressFullScreen from './ProgressFullScreen';
import { removeDomain } from '../utilities/strings';
import { handleError } from '../config/errorHandler';

// This compoment has two pages. The first one is search plant page.
// After selecting one of the search result, the second new record page will be displayed
const CreateNewRecord = () => {
  const [shed, setShed] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [resultText, setResultText] = useState('');
  const [errMsgSearch, setErrMsgSearch] = useState('');
  const [errMsgDescription, setErrMsgDescription] = useState('');
  const [plants, setPlants] = useState(null);
  const { shedId } = useParams();
  const [plantIndex, setPlantIndex] = useState(null);
  const [description, setDescription] = useState('');
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  const [isInProgress, setIsInProgress] = useState(false);
  let history = useHistory();

  useEffect(() => {
    // get the shed info and put it into shed
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
        handleError(error, history);
      }
    }
    findShed();
  }, [history, isSignedIn, shedId]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText === '') {
      setErrMsgSearch('Please input the keywords.');
    } else if (searchText.length > 100) {
      setErrMsgSearch('Please input the keywords maximum 100 characters.');
    } else {
      setErrMsgSearch('');
      const res = await api.get(`api/plants?q=${searchText}`);
      console.log(res);
      setPlants(res.data);
      setResultText(searchText);
      setSearchText('');
    }
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
    // description can be empty but should not exceed 1000 chars
    if (description.length > 1000) {
      setErrMsgDescription('Please input My notes maximum 1000 characters.');
    } else {
      setIsInProgress(true);
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
        console.log(error.response);
        handleError(error, history);
      } finally {
        setIsInProgress(false);
      }      
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
            <p className="path">{removeDomain(shed.owner.email)}</p>
            <h1 className="title">Create New Record</h1>
            <p className="current-date">{`Date: ${getCurrentDate()}`}</p>
            {
              plantIndex === null ?
                <>
                  <form onSubmit={handleSearch}>
                    {
                      errMsgSearch &&
                        <p className="err-msg-search">{errMsgSearch}</p>
                    }
                    
                    <div className="input-content-wrapper">
                      <input className="input-content" 
                        placeholder="Search keywords" 
                        autoFocus 
                        type="text" 
                        value={searchText} 
                        onChange={handleChangeSearch}
                      />
                      <button className="btn btn-blue" type="submit" data-cy="submit-plant-search">Search</button>
                    </div>
                  </form>
                  {
                    plants &&
                    <>
                      <h2 className="searched-results-title">{`Searched results for "${resultText}"`} </h2>
                      {
                        plants.length > 1 ? 
                            plants.map((plant, index) =>
                              plant.common_name && plant.image_url &&
                                <div className="summary-wrapper add-hover" key={plant.id} onClick={(event) => handleClick(event, index)}>
                                  <img className="plant-thumbnail" src={plant.image_url} alt="plant"/>
                                  <div className="summary-text-wrapper">
                                    <p><strong>Common name:</strong>&nbsp;{plant.common_name}</p>
                                    <p><strong>Scientific name:</strong>&nbsp;{plant.scientific_name}</p>
                                    <p><strong>Family common name:</strong>&nbsp;{plant.family_common_name}</p>
                                  </div>
                                </div>
                            )
                          :
                            <p className="no-results">No results</p>                            
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
                    <textarea className="description-input" 
                      name="description" 
                      rows="10" 
                      placeholder="Description" 
                      value={description} 
                      onChange={handleChangeDescription}
                      autoFocus   
                    />
                    {
                      errMsgDescription &&
                        <p className="err-msg-description">{errMsgDescription}</p>
                    }
                    <button className="btn btn-blue" type="submit">Create a new record</button>
                  </form>
                </div>
            }

          </>
      }
    </div>
  )
}

export default CreateNewRecord
