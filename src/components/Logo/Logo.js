import React from 'react';
import Tilt from 'react-tilt'
import chip from './chip.png';


const Logo =() => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 210, width: 150 }} >
            <div style ={{fontFamily:'Comic Sans MS'}}className="f4"> 
             <p>Face Recognition</p> 
            </div>
            <div className="Tilt-inner pa2"> 
             <img style={{paddingTop:'5px'}}alt ='logo' src={chip}/> 
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;