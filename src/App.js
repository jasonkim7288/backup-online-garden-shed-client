import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import NavbarMobile from './components/NavbarMobile'
import GardenShedList from './components/GardenShedList'
import './styles/app.css'

const App = () => {
  return (
    <div id="entier-view">
      <div id="grid-item-navbar">
        <NavbarMobile />
      </div>
      <div id="grid-item-body">
      <BrowserRouter>
        <Switch>
          <Route exact path ="/" component={LandingPage} />
          <Route exact path ="/sheds" component={GardenShedList} />    
        </Switch>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default App
