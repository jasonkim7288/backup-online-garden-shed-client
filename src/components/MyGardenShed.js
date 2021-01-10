import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../config/globalState';

const MyGardenShed = () => {
  const { state } = useGlobalState();
  const { isSignedIn } = state;
  let history = useHistory();

  useEffect(() => {
    if (!isSignedIn) {
      history.push('/');
    }
  }, []);

  return (
    <div>
      My Garden Shed
    </div>
  );
};

export default MyGardenShed;
