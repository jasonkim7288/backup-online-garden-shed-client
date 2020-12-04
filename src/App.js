import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LandingPage from './components/LandingPage'
import About from './components/About'
import SelectedPlantRecord from './components/SelectedPlantRecord'
import SelectedPlantFirstEntry from './components/SelectedPlantFirstEntry'
import GardenShedList from './components/GardenShedList'
import SelectedGardenShed from './components/SelectedGardenShed'
import CreateNewRecord from './components/CreateNewRecord'
import SearchPlant from './components/SearchPlant'
import CreateNewLog from './components/CreateNewLog'

import './styles/app.css'

const App = () => {
  return (
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/sheds/shed-id/plant-id/first-entry" component={SelectedPlantFirstEntry} />  
          <Route path="/sheds/shed-id/plant-id" component={SelectedPlantRecord} /> 
          <Route path="/sheds/shed-id" component={SelectedGardenShed} /> 
          <Route path="/sheds" component={GardenShedList} />  
          <Route path="/new-record" component={CreateNewRecord} />  
          <Route path="/search" component={SearchPlant} />
          <Route path="/new-log" component={CreateNewLog} />
        </Switch>
      </BrowserRouter>
      </div>
  )
}

export default App
