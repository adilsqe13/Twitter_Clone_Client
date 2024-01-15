import React from 'react';
import spinner_1 from './../spinner_1.gif';

export default function Spinner_1(props) {
  return (
      <div className='text-center'>
          <img height={props.height} width={props.width} src={spinner_1} alt="" />
      </div>
    
  )
}
