import React, { useContext, useState } from 'react';
import { FileContext } from '../Functions/FileContext.jsx'; // Ensure correct import path
import axios from 'axios';
import '../CSS/Dashboard.css';
import Papa from 'papaparse';

function Dashboard() {
    const { file } = useContext(FileContext); // File received from Home.JSX
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [top50Data, setTop50Data] = useState([]);

    const handleFileUpload = async () => {
        const fileToUpload = retrieveFileFromLocalStorage();
        if (!fileToUpload) {
            console.error('No file found in local storage');
            return;
        }

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            setLoading(true);
            setError('');

            // Post the file to the server
            const response = await axios.post('https://flask-ml-api.onrender.com//upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Handling file downloads
            });

            // Create a new Blob object using the response data
            const blob = new Blob([response.data], { type: 'text/csv' });

            // Create a link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'results.csv'; // Name of the downloaded file

            // Append the link to the body
            document.body.appendChild(link);

            // Trigger a click on the link to start download
            link.click();

            // Clean up
            document.body.removeChild(link);

            // Fetch the top 50 results
            fetchTop50Results();
        } catch (error) {
            console.error('Error processing the file', error);
            setError('Failed to upload or process the file. Please ensure it is in the correct format.');
        } finally {
            setLoading(false);
        }
    };

    const fetchTop50Results = async () => {
        try {
            const response = await axios.get('https://flask-ml-api.onrender.com//top50', {
                responseType: 'text', // Expecting text for CSV
            });

            // Parse CSV data using PapaParse
            Papa.parse(response.data, {
                header: true,
                complete: (result) => {
                    // Take the first 50 rows
                    setTop50Data(result.data.slice(0, 50));
                },
                error: (parseError) => {
                    setError('Failed to parse the top 50 results.');
                },
            });
        } catch (error) {
            setError('Failed to fetch top 50 results.');
        }
    };

    // const storeFileInLocalStorage = (file) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         localStorage.setItem('file', reader.result);
    //     };
    //     reader.readAsDataURL(file);
    // };

    const retrieveFileFromLocalStorage = () => {
        const fileData = localStorage.getItem('file');
        if (fileData) {
            const base64String = fileData.split(',')[1];
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new File([byteArray], file ? file.name : 'file.csv', { type: 'text/csv' });
        }
        return null;
    };

    return (
        <div className="DashboardContainer">
            {!file && (<h1 className="BaseH1">Return to homepage and add a file</h1>)}
            {file && (
                <div>
                    <p>Selected File: {file.name}</p>
                    <button className="loading-btn" onClick={handleFileUpload} disabled={loading}>
                        {loading ? 'Processing...' : 'Download file'}
                    </button>
                </div>
            )}
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {top50Data.length > 0 && (
                <div>
                    <h2 className="resultslabel">Top 50 Results</h2>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(top50Data[0] || {}).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {top50Data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;