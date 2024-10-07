import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import '../../Components/SideBar Pages/SideBar-CSS/CustomerPage.css' // Import the CSS file

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const CustomersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCustomersUsingFetchFromJS();
        if (response) {
          setData(response);
        } else {
          setError("No data available");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="customers-page">
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="chart-container">
          <h2 className="cust-title">Customers Overview</h2>
          < DoughnutChartComponentWrapper data={data} />
        </div>
      )}
    </div>
  );
};

export default CustomersPage;

const DoughnutChartComponentWrapper = ({ data }) => {
  const { chartData, options } = prepareDoughnutChartData(data);
  return chartData && options ? <Doughnut data={chartData} options={options} /> : <div>No data to display</div>;
};

const prepareDoughnutChartData = (data) => {
  if (!data || !data.data) return { chartData: null, options: null };

  // Group and count customers by the date they were added
  const dateMap = data.data.reduce((acc, customer) => {
    const date = new Date(customer.createdAt).toLocaleDateString(); // Adjust date format as needed
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  // Convert aggregated data to arrays for Chart.js
  const labels = Object.keys(dateMap);
  const counts = Object.values(dateMap);

  return {
   
    chartData: {
      labels: labels,
      datasets: [
        {
          data: counts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Customer Distribution by Date Added',
        },
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (context) => `Date: ${context.label} - Count: ${context.raw}`,
          },
        }
      },
      layout: {
        padding: {
          bottom:20,
        },
        padding: {
          top:-40,
        }
      },
    },
    
  };
};

const fetchCustomersUsingFetchFromJS = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL_2}/customer`; // Ensure this is the correct endpoint
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY_2}`, // Use the secret key from environment variables
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Unexpected content type: " + contentType);
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    return null;
  }
};
