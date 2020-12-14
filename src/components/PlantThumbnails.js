import React from 'react';
import { useParams } from 'react-router-dom';


const PlantThumbnails = () => {
  const { shedId } = useParams();
  console.log(shedId);
  return (
    <div>
      <h1>Plant Thumbnails</h1>
      <div id="plant-thumbnails-container">
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 1</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 2</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 3</p>
        </div>
        <div className="plant-thumbnail-wrapper">
          <img className="plant-thumbnail" src="http://placekitten.com/400/300" alt=""/>
          <p>Daisy 4</p>
        </div>
      </div>
    </div>
  )
}

export default PlantThumbnails
