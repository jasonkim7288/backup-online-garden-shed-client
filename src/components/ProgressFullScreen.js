import React from 'react';

const ProgressFullScreen = ({ isInProgress }) => {
  return (
    <>
      {
        isInProgress &&
          <div className="progress-full-screen">
            <i className="fas fa-spinner spin"></i>
          </div>
      }
    </>
  );
};

export default ProgressFullScreen;
