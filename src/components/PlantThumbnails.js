import React from 'react'


const PlantThumbnails = () => {
  return (
    <div>
      <h1>Plant Thumbnails</h1>
      <div id="plant-thumbnails-container">
        <div>
          <img className="plant-thumbnail" src="http://placekitten.com/200/300" width="200" alt=""/>
          <p>Daisy 1</p>
        </div>
        <div>
          <img className="plant-thumbnail" src="http://placekitten.com/1200/800" width="200" alt=""/>
          <p>Daisy 2</p>
        </div>

        <div>
          <img className="plant-thumbnail" src="http://placekitten.com/200/300" width="200" alt=""/>
          <p>Daisy 3</p>
        </div>
        <div>
          <img className="plant-thumbnail" src="http://placekitten.com/1200/800" width="200" alt=""/>
          <p>Daisy 4</p>
        </div>
      </div>
    </div>
  )
}

export default PlantThumbnails
