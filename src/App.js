import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import About from './components/About';
import PlantRecord from './components/PlantRecord';
import SelectedPlantFirstEntry from './components/SelectedPlantFirstEntry';
import GardenSheds from './components/GardenSheds';
import PlantThumbnails from './components/PlantThumbnails';
import CreateNewRecord from './components/CreateNewRecord';
import SearchPlant from './components/SearchPlant';
import CreateNewLog from './components/CreateNewLog';
import api from './config/api';
import { useGlobalState } from './config/globalState';
import { SET_USER, AUTH_SIGN_IN } from './config/types';


const App = () => {
  const { dispatch } = useGlobalState();

  useEffect(() => {
    console.log('app started');
    const acquireUser = async () => {
      try {
        const resAcquiredUser = await api.get('/api/auth/userinfo');
        const acquiredUser = resAcquiredUser.data;
        console.log('acquiredUser:', acquiredUser);
        if (acquiredUser) {
          dispatch({
            type: SET_USER,
            payload: acquiredUser
          })
          dispatch({ type: AUTH_SIGN_IN });
        }
      } catch (err) {
        console.log('err: ', err.message);
      }
    }
    acquireUser();
  }, []);
  return (
    <div id="app-container">
      <BrowserRouter>
        <Navbar />
        <div className="body container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/about" component={About} />
            <Route path="/sheds/:shedId/records/:plantRecordId/first-entry" component={SelectedPlantFirstEntry} />
            <Route path="/sheds/:shedId/records/:plantRecordId" component={PlantRecord} />
            <Route path="/sheds/:shedId" component={PlantThumbnails} />
            <Route path="/sheds" component={GardenSheds} />
            <Route path="/new-record" component={CreateNewRecord} />
            <Route path="/search" component={SearchPlant} />
            <Route path="/new-log" component={CreateNewLog} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
