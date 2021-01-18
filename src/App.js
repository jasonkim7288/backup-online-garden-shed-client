import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PlantRecord from './components/PlantRecord';
import SelectedPlantFirstEntry from './components/SelectedPlantFirstEntry';
import GardenSheds from './components/GardenSheds';
import PlantRecords from './components/PlantRecords';
import CreateNewRecord from './components/CreateNewRecord';
import SearchPlant from './components/SearchPlant';
import FormLog from './components/FormLog';
import api from './config/api';
import { useGlobalState } from './config/globalState';
import { SET_USER, AUTH_SIGN_IN } from './config/types';
import Sidebar from './components/Sidebar';
import FollowingSheds from './components/FollowingSheds';
import MyGardenShed from './components/MyGardenShed';
import FollowingPlants from './components/FollowingPlants';
import MissionStatement from './components/MissionStatement';
import HamburgerMenu from './components/HamburgerMenu';
import PageError from './components/PageError';
import GoogleCallback from './components/GoogleCallback';
import Profile from './components/Profile';
import UserGuide from './components/UserGuide';



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
          });
          dispatch({ type: AUTH_SIGN_IN });
        } else {
          console.log('not logged in');
        }
      } catch (err) {
        console.log('err: ', err.response);
      }
    }
    acquireUser();
  }, [dispatch]);
  return (
    <div id="app-container">
      <BrowserRouter>
        <Navbar />
        <HamburgerMenu/>
        <Sidebar />
        <section>
          <div className="container mb-50">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/auth/google/callback" component={GoogleCallback} />
              <Route path="/user/my-shed" component={MyGardenShed} />
              <Route path="/user/following-sheds" component={FollowingSheds} />
              <Route path="/user/following-plants" component={FollowingPlants} />
              <Route path="/user/profile" component={Profile} />
              <Route path="/user-guide" component={UserGuide} />
              <Route path="/mission-statement" component={MissionStatement} />
              <Route path="/sheds/:shedId/records/new" component={CreateNewRecord} />
              <Route path="/sheds/:shedId/records/:plantRecordId/logs/new" render={() => <FormLog action="new"/>} />
              <Route path="/sheds/:shedId/records/:plantRecordId/logs/:logId/edit" render={() => <FormLog action="edit"/>} />
              <Route path="/sheds/:shedId/records/:plantRecordId/first-entry" component={SelectedPlantFirstEntry} />
              <Route path="/sheds/:shedId/records/:plantRecordId" component={PlantRecord} />
              <Route path="/sheds/:shedId" component={PlantRecords} />
              <Route path="/sheds" component={GardenSheds} />
              <Route path="/search" component={SearchPlant} />
              <Route path="/error/404" render={() => <PageError code={404}/>} />
              <Route path="/error/401" render={() => <PageError code={401}/>} />
              <Route path="/error/400" render={() => <PageError code={400}/>} />
              <Route render={() => <PageError code={404}/>} />
            </Switch>
          </div>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
