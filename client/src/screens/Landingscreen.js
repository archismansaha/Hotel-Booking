import React from 'react'
import {Link} from 'react-router-dom'

const Landingscreen = () => {
  return (
    <div className="row landing justify-content-center" data-aos="zoom-in-up">
    
    
    <div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>
    
    
    <h2 style={{color:'white',fontSize:'130px'}}>Hotel Rooms</h2>
    <h2 style={{color:'white'}}>"There is only one Boss Guest"</h2>
    <Link to='/home'>
    
    <button className="btn landing-button" style={{color:'black'}}>Get Started</button>
    </Link>
    
    </div>
    
    
    
    
    
    </div>
  )
}

export default Landingscreen