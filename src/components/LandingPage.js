import React from 'react'


const GardenShed = () => {
  return (
    <div className="landing-page-container">
      <div className="guest-login-item" >
        <button type="button" className="button guest">Guest</button>
      </div>
      <div className="google-login-item">
        <button type="button" className="button google">Sign in with Google</button>
      </div>
    </div>
  )
}

export default GardenShed
