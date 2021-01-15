import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const GoogleCallback = () => {
  const param = useParams();
  let location = useLocation();
  let history = useHistory();
  console.log('param:', param);
  console.log('location:', location);
  console.log('param.id_token:', param.id_token);

  useEffect(() => {
    const locationHash = location.hash.substr(1)
    if (locationHash === '') {
      history.push('/');
    } else {
      const id_token = locationHash.substr(locationHash.search(/(?<=^|&)id_token=/))
        .split('&')[0]
        .split('=')[1];
      console.log('id_token:', id_token);
    }
  }, []);

  return (
    <>
      google callback
    </>
  );
};

export default GoogleCallback;
