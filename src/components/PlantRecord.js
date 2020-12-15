import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';
import api from '../config/api';
import { Link } from 'react-router-dom';

const PlantRecord = () => {
  const [plantRecord, setPlantRecord] = useState(null); 
  const { shedId, plantRecordId } = useParams();
  
  useEffect(() => {
    const findPlantRecord = async () => {
      const res = await api(`/api/sheds/${shedId}/records/${plantRecordId}`); 
      const foundPlantRecord = res.data;
      console.log('found Plant record:', foundPlantRecord);
      if(foundPlantRecord) {
        setPlantRecord(foundPlantRecord);
      } 
    }
    findPlantRecord();
  }, []);
  return (
    <div>
      { 
        plantRecord && 
          <>
            <p className="path">
              <Link to={`/sheds/${shedId}`}> {`${plantRecord.ownedShed.owner.email}`}</Link>
              {` > ${plantRecord.commonName}`}
            </p>
            <div className="icon icon-record icon-record-follow">
              <i class="fas fa-leaf"></i>
            </div>
            
            <div className="button-wrapper">
              <button className="about" type="button">About</button>
            </div>
            <div className="button-wrapper">
              <button className="new-log" type="button">Creat a new log</button>
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
            
            <div className="icon icon-record icon-record-delete">
              <i className="far fa-trash-alt"></i>
            </div>
            <div className="icon icon-record icon-record-edit">
              <i className="far fa-edit"></i>
            </div>
            
            <p className="sub-headings"><strong>Date:</strong> 17/11/2020 (Day 1)</p>
            <p className="sub-headings"><strong>My Notes:</strong></p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper vitae magna eget mattis. 
              Vivamus posuere iaculis consequat. Pellentesque euismod elementum bibendum.
              Quisque tincidunt nisi a ligula sagittis accumsan. Fusce sed luctus elit. 
              Aenean at ipsum iaculis, facilisis lectus et, interdum nisi. Pellentesque quis fermentum ante. 
              In id massa eu nisi dignissim elementum in vitae quam. Duis eros ante, pulvinar ut est et, maximus consequat augue. 
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae tellus lacus. 
            </p>
          </>
      }
    </div>
  )
}

export default PlantRecord
