import React from 'react';
import { useHistory } from 'react-router-dom';


const PageError = ({ code }) => {
  let history = useHistory();

  const title = code ? code : 404;
  let msg = '';

  switch (code) {
    case 400:
      msg = 'Bad Request';
      break;
    case 404:
    default:
      msg = 'Page Not Found';
      break;
  }

  const handleClick = () => {
    history.push('/');
  }

  return (
    <div>
      <h1 className="not-found-title">{title}</h1>
      <p  className="not-found-message">{msg}</p>
      <div className="not-found-button">
        <button className="guest-button add-hover" onClick={handleClick}>Go back to the homepage</button>
      </div>
    </div>
  );
};

export default PageError;
