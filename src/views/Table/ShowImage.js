import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';

const Modals = (props) => {
  
 const [path, setPath] = useState('');
 const [types, setTypes] = useState('');

  useEffect(() => {
    setPath(props.path);
    setTypes(props.type);
},[props.path, props.type]);

 const onError =()=>{
   
 }
  return (
    <div className='m-auto p-auto d-block justify-content-center'>
    {types === 1 ?
    <img
        src={path}
        height={props.height ? '100':'250'}
        width={props.width ? '100':'250'}
        alt={path}
    />:''}
    {types === 2 ?
    <audio controls>
      <source 
      src={path}
      type="audio/mpeg" />
      </audio>:
     ''}
    {types === 3 ?
    <VideoPlayer
      url={path}
      onError={onError}
      width='100%'
      height='100%'
      light
      controls
    />:''}
    </div>
  );
}

export default Modals;