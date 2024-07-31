import React, { useContext, useRef } from 'react';
import { FileContext } from '../Functions/FileContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';
import image2 from '../../../../LoginAssets/logosolid.jpeg'
import image from '../../../../LoginAssets/AI.gif'

function Home() {
  const { setFile } = useContext(FileContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const OpenFileExplora = () => {
    fileInputRef.current.click();
  };

  const HandleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(event.target.files[0]);
      navigate('/user-page/dashboard'); // Ensure the correct path for navigation
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className='HomeContainer'>
      <div className='LeftSide'>
        <img className='logo_img' src={image} alt="Logo" />
      </div>
      <div className='RightSide'>
        <div className='btnContainer'>
          <img className='logo_img2' src={image2} alt="Logo2" />
          <h1 className='h1_letsGetStarted'>Lets get started</h1>
          <button className='addFile_btn' onClick={OpenFileExplora}>Add a file</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={HandleFile}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
