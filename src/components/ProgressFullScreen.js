import React, { useEffect, useState } from 'react';

const ProgressFullScreen = () => {
  const [rainClass, setRainClass] = useState(false);

  useEffect(() => {
    let runTimeout;
    const runAnimation = () => {
      setRainClass(true);
      runTimeout = setTimeout(() => {
        setRainClass(false);
      }, 1200);
    };

    console.log('started');
    runAnimation();

    const growingInterval = setInterval(() => {
      runAnimation();
    }, 2000);

    return (() => {
      clearTimeout(runTimeout);
      clearInterval(growingInterval);
    })
  }, []);

  return (
    <div className="progress-full-screen">
      <div className="box">
        <div className={`stem ${rainClass ? 'rain' : ''}`}>
          <div className="leaf leaf01">
            <div className="line"></div>
          </div>
          <div className="leaf leaf02">
            <div className="line"></div>
          </div>
          <div className="leaf leaf03">
            <div className="line"></div>
          </div>
          <div className="leaf leaf04">
            <div className="line"></div>
          </div>
          <div className="leaf leaf05">
            <div className="line"></div>
          </div>
          <div className="leaf leaf06">
            <div className="line"></div>
          </div>
        </div>
        <div className="pot"></div>
        <div className="pot-top"></div>
      </div>
    </div>
  );
};

export default ProgressFullScreen;
