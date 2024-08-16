import React, { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTransactionsUsingFetchFromJS();
        setData(response); // Adjust based on actual API response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Transactions Overview</h2>
      {loading ? <p>Loading...</p> : <BarChartComponentWrapper data={data} />}
    </div>
  );
};

export default TransactionsPage;

const BarChartComponentWrapper = (data) => {
  const aggregateDataByDate = (data) => {
    data = JSON.parse(data.data);
    
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

  if (data === null) return <div>No data to display</div>;
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

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw Error(error);
  }
};
