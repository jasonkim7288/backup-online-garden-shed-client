import React from 'react'


const PlantRecords = () => {
  return (
    <div>
      <h1>Plant Records</h1>
      <div id="plant-records-container">
        <div>
          <img className="plant-image" src="http://placekitten.com/200/300" width="200" alt=""/>
          <p>Daisy 1</p>
        </div>
        <div>
          <img className="plant-image" src="http://placekitten.com/1200/800" width="200" alt=""/>
          <p>Daisy 2</p>
        </div>

        <div>
          <img className="plant-image" src="http://placekitten.com/200/300" width="200" alt=""/>
          <p>Daisy 3</p>
        </div>
        <div>
          <img className="plant-image" src="http://placekitten.com/1200/800" width="200" alt=""/>
          <p>Daisy 4</p>
        </div>
      </div>
    </div>
  )
}

export default PlantRecords
