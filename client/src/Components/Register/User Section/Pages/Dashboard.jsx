import React, { useContext } from 'react';
import { FileContext } from '../Functions/FileContext';
import '../CSS/Dashboard.css';

function Dashboard() {
  const { file } = useContext(FileContext);

  const redirectToStripe = () => {
    const stripeUpdateUrl = "https://paystack.com/pay/r55xex-wp6";
    window.location.href = stripeUpdateUrl;
  };

  return (
    

    
    <div className="DashboardContainer">
      <h4 class="filetittle">File</h4>
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          {/* Additional file information or processing can go here */}
        </div>
      )}
      <button class="uploadButton" onClick={redirectToStripe}>Upload to A.I</button>
    </div>
    
  );
}

export default Dashboard;
