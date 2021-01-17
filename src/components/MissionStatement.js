import React from 'react';

const MissionStatement = () => {
  return (
    <div>
      <h1 className="title">Mission Statement</h1>
      <img id="mission-statement-image" src="/missionStatement.jpg" alt="cartoon gardeners'"></img>
      <p className="mission-statement">
        Started from within Australia, Online Garden Shed is for improving your gardening skills by 
        keeping track of a plant's growth history and learning from other gardeners' experiences. 
        It also provides a way for gardeners to be a part of a much bigger community by bringing their 
        records and experiences online. By having access to the online garden sheds and being able to 
        follow other plant records and setting up notifications, gardeners can be more actively involved 
        in their gardening community whilst not being restricted by their geographic location.
        </p>
        <p className="mission-statement last-line">
          Lets help each other and the planet.
        </p>
    </div>
  );
};

export default MissionStatement;
