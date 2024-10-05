import React from 'react';
import './body.css';
import Top from './Top Section/Top';
import Analytics from './Top Section/Analytics';


const Body = () => {
  return (
    <div className='mainContent'>
      <Top />
    <Analytics/>
    </div>
  );
}

export default Body;
