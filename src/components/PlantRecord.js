import React from 'react'

const PlantRecord = () => {
  return (
    <div>
      <h1>Plant Record</h1>
      
      <div className="button-wrapper">
          <button className="new-log" type="button new-log">Creat a new log</button>
        </div>
        <div className="button-wrapper">
          <button className="about" type="button about">About</button>
        </div>

      <div id="plant-record-container">
        <div id="image-wrapper">
          <img class="main-image" src="http://placekitten.com/400/400"  alt=""/>
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
        <h1>Date:</h1> 17/11/2020 (Day 1)
        <h1>My Notes:</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper vitae magna eget mattis. 
          Vivamus posuere iaculis consequat. Pellentesque euismod elementum bibendum.
          Quisque tincidunt nisi a ligula sagittis accumsan. Fusce sed luctus elit. 
          Aenean at ipsum iaculis, facilisis lectus et, interdum nisi. Pellentesque quis fermentum ante. 
          In id massa eu nisi dignissim elementum in vitae quam. Duis eros ante, pulvinar ut est et, maximus consequat augue. 
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae tellus lacus. 
        </p>
    </div>
  )
}

export default PlantRecord
