import React from 'react'

const PlantRecord = () => {
  return (
    <div>
      <h1>Plant Record</h1>
      
      <div className="button">
          <button type="button new-log">Creat a new log</button>
        </div>
        <div className="button">
          <button type="button about">About</button>
        </div>

      <div id="plant-record-container">
        <div id="image-wrapper">
          <img class="main-image" src="http://placekitten.com/1000/600"  alt=""/>
        </div>

        <div className="thumbnail-1">
          <img className="thumbnail" src="http://placekitten.com/70/50" alt=""/>
        </div>
        <div className="thumbnail-2">
          <img className="thumbnail" src="http://placekitten.com/70/50" alt=""/>
        </div>
        <div className="thumbnail-3">
          <img className="thumbnail" src="http://placekitten.com/70/50" alt=""/>
        </div>
        <div className="thumbnail-4">
          <img className="thumbnail" src="http://placekitten.com/70/50" alt=""/>
        </div>
        <div className="thumbnail-5">
          <img className="thumbnail" src="http://placekitten.com/70/50" alt=""/>
        </div>

      </div>
    </div>
  )
}

export default PlantRecord
