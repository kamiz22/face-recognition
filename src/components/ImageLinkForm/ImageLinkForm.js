import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm =({inputChange, buttonSubmitPress}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <p className='f3'>
                {'Please Enter a URL of a picture (ending .jpg/.GIF/.png'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='tex' onChange={inputChange}/>
                <button 
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' 
                onClick={buttonSubmitPress}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;