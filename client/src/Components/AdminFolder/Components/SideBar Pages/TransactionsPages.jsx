import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "../SideBar Pages/SideBar-CSS/TransactionsPages.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTransactionsUsingFetchFromJS();
        if (response) {
          setData(response); // Adjust based on actual API response structure
        } else {
          setError("No data available"); // Set error if response is null
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data"); // Set error in case of a fetch failure
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="transaction-title">Transactions Overview</h2>
      <div className="trans-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <BarChartComponentWrapper data={data} />
      )}
      </div>
    </div>
  );
};

export default TransactionsPage;

const BarChartComponentWrapper = ({ data }) => {
  const aggregateDataByDate = (data) => {
    if (!data || !data.data) return { chartData: null, options: null };

    // Group and sum amounts by date
    const dateMap = data.data.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount / 100; // Convert to correct units
      return acc;
    }, {});

    // Convert aggregated data to arrays for Chart.js
    const labels = Object.keys(dateMap);
    const amounts = Object.values(dateMap);

    return {
      chartData: {
        labels: labels,
        datasets: [
          {
            label: "Transaction Amount",
            data: amounts,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => `Amount: ${context.raw}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10, // Adjust as needed
            },
          },
          y: {
            title: {
              display: true,
              text: "Amount",
            },
            beginAtZero: true,
          },
        },
      },
    };
  };

  if (!data || !data.data) return <div>No data to display</div>; // Handle null or invalid data
  const { chartData, options } = aggregateDataByDate(data);
  return <Bar data={chartData} options={options} />;
};

const fetchTransactionsUsingFetchFromJS = async () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/transaction?status=success`;
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`, // Use the secret key from environment variables
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
    console.error("Error fetching transactions:", error);
    return null; // Return null in case of an error
  }
};
