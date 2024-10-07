import React, { useContext, useRef, useState,useEffect } from 'react';
import { FileContext } from '../../User Section/Functions/FileContext'; // Corrected the import path
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import xlsx library for handling Excel files
import '../../User Section/CSS/Home.css';
import Axios from 'axios';
import sales from '../../../../../LoginAssets/salesGraphics.jpg';
import logo2 from '../../../../../LoginAssets/logosolidblack.png';

function Home() {
  const { setFile } = useContext(FileContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [subscription, setSubscription] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const OpenFileExplora = () => {
    // Prevent file explorer from opening if subscription is inactive
    if (subscriptionStatus === 'inactive') {
      alert('You must have an active subscription to add a file.');
      return;
    }
    fileInputRef.current.click();
  };

  const HandleFile = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      // Check file extension
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'xlsx') {
        setErrorMessage('Invalid file type. Please upload an Excel (.xlsx) file.');

        return;
      }
  
      // Read and parse the file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
  
        // Handle the first sheet (data)
        const sheetName1 = workbook.SheetNames[0];
        const worksheet1 = workbook.Sheets[sheetName1];
        const jsonData1 = XLSX.utils.sheet_to_json(worksheet1, { header: 1 }); // Read data as an array of arrays
  
        // Extract headers and rows from the first sheet
        const headers = jsonData1[0].map(header => header.trim()); // Trim headers to remove extra spaces
        // const rows = jsonData1.slice(1);
  
        // Print headers to the console
        console.log('File Headers:', headers);
  
        // Define expected headers
        const expectedHeaders = [
          'ID', 'PTI_AUTHORITY', 'PTI_BUY_MARSTAT', 'PTI_SP', 'PTI_EXTENT', 'PTI_TDN',
          'PTI_PROVINCE', 'PTI_CIT', 'PTI_MUNSUB', 'CURRENTOWNER', 'GENDER', 'ADDRESSPROVINCE',
          'OCCUPATION', 'LSM', 'SALARY', 'INSURANCE', 'HOMEOWNER', 'VEHICLEOWNER', 'CAR',
          'SPEC', 'YEAR', 'PRICE', 'OM_FUN_TAKEUP', 'OM_FUN_TAKEUP_DATE',
          'OM_FUN_DIDNOT_TAKEUP', 'OM_FUN_DIDNOT_TAKEUP_DATE', 'OTHER_FUN_TAKEUP', 'OTHER_FUN_TAKEUP_DATE'
        ];
  
        // Trim expected headers to remove any extra spaces
        const trimmedExpectedHeaders = expectedHeaders.map(header => header.trim());
  
        // Validate headers
        const headersMatch = headers.length === trimmedExpectedHeaders.length;
  
        if (headersMatch) {
          // File is valid, convert to base64 and save to localStorage
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            localStorage.setItem('uploadedFile', fileReader.result); // Save file to localStorage
            setFile(selectedFile); // Save file to context
            setErrorMessage(''); // Clear error message
            console.log('File headers and content are valid');
            navigate('/user-page/dashboard'); // Navigate to dashboard
          };
          fileReader.readAsDataURL(selectedFile); // Convert file to base64 string
        } else {
          // Handle invalid file scenario
          setErrorMessage('Invalid file. Ensure headers and content match the required format.');
          console.log('Invalid file. Ensure headers and content match the required format.');
        }
      };
  
      reader.readAsArrayBuffer(selectedFile);
    } else {
      setErrorMessage('No file selected');
      console.log("No file selected");
    }
  };
  
  useEffect(() => {
    const fetchSubscription = async () => {
      const entityNumber = localStorage.getItem('entityNumber'); // Get the entityNumber from localStorage

      if (entityNumber) {
        try {
          const response = await Axios.get(`http://localhost:3002/subscription/${entityNumber}`);
          const subscriptionPlan = response.data.subscription;

          setSubscription(subscriptionPlan);

          // Check if the subscription is inactive and set status
          if (subscriptionPlan === 'Inactive Subscription') {
            setSubscriptionStatus('inactive');
          } else {
            setSubscriptionStatus('active');
          }
        } catch (error) {
          console.error('Error fetching subscription:', error);
          setSubscription('No active subscription found');
          setSubscriptionStatus('inactive');
        }
      }
    };

    fetchSubscription();
  }, []);
  

  return (
 
      <div className='RightSide'>
          <img
                  src={sales} 
                  alt="AI and Sales"
                  className="graphics-image" // Applying the CSS class
         />
          {/* <img className='logo_img2' src={logo} alt="Logo2"/> */}
          <h1 className='h1_letsGetStarted'>Let's get started</h1>
          {/* Conditional rendering based on subscription status */}
          {subscriptionStatus === 'inactive' ? (
            <h1 className='subscriptionStatus inactive'>
              Inactive subscription: You must subscribe to AI in order to access AI
            </h1>
          ) : (
            <h1 className='subscriptionStatus active'>
              Current Subscription: {subscription}
            </h1>
          )}
          <button className='addFile_btn' onClick={OpenFileExplora}
          disabled={subscriptionStatus === 'inactive'} // Disable button for inactive subscriptions
          style={{ 
            cursor: subscriptionStatus === 'inactive' ? 'not-allowed' : 'pointer',
            opacity: subscriptionStatus === 'inactive' ? 0.5 : 1 
          }}
          >Upload a file </button>
          <input 
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={HandleFile}
          />
          {errorMessage && <p className='errorMessage'>{errorMessage}</p>} {/* Display error message */}
        
      </div>
   
  );
}

export default Home;