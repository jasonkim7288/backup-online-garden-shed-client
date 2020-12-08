import React from 'react'

const PlantRecord = () => {
  return (
    <div>
      <h1>Plant Record</h1>
      <div id="plant-record-container">

        <div className="button">
          <button id="new-log" type="button">Creat a new log</button>
        </div>
        <div className="button">
          <button id="about" type="button about">About</button>
        </div>

        <div id="image-wrapper">
          <img class="main-image" src="http://placekitten.com/1000/600"  alt=""/>
        </div>

        <div className="thumbnail thumbnail-1">
          <img src="http://placekitten.com/70/50" width="70" alt=""/>
        </div>
        <div className="thumbnail thumbnail-2">
          <img src="http://placekitten.com/70/50" width="70" alt=""/>
        </div>
        <div className="thumbnail thumbnail-3">
          <img src="http://placekitten.com/70/50" width="70" alt=""/>
        </div>
        <div className="thumbnail thumbnail-4">
          <img src="http://placekitten.com/70/50" width="70" alt=""/>
        </div>
        <div className="thumbnail thumbnail-5">
          <img src="http://placekitten.com/70/50" width="70" alt=""/>
        </div>

      </div>
    </div>
  )
}

export default PlantRecord
