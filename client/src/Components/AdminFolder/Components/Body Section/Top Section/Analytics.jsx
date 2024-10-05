import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2'; // Importing Line component
import 'chart.js/auto';
import './Analytics.css';

const Analytics = () => {
    // Simulating data
    const [conversionRate, setConversionRate] = useState(19.12);
    const [predictedPurchases, setPredictedPurchases] = useState([180, 210, 250, 280]); // Updated for 4 weeks
    const [selectedWidget, setSelectedWidget] = useState('');

    const [widgetVisibility, setWidgetVisibility] = useState({
        conversionWidget: true,
        predictionWidget: true,
        featureWidget: true,
        alertWidget: true
    });

    // Dummy Feature Importance data
    const featureImportanceData = {
        labels: ['Credit Score', 'Driving History', 'Vehicle Age', 'Annual Income', 'Vehicle Type'],
        datasets: [{
            label: 'Feature Importance',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: '#ffffff',
            borderWidth: 2,
            data: [25, 15, 30, 10, 20]
        }]
    };

    // Model Alert - Simulating a random accuracy drop
    const [modelAlert, setModelAlert] = useState('');

    useEffect(() => {
        const simulateAlert = () => {
            const randomAccuracy = Math.random() * 100;
            if (randomAccuracy < 80) {
                setModelAlert('⚠️ Alert: Model accuracy dropped below 80%!');
            } else {
                setModelAlert('Model performing optimally.');
            }
        };
        simulateAlert();
    }, []);

    // Handle dropdown selection
    const handleWidgetSelect = (event) => {
        const selected = event.target.value;
        setSelectedWidget(selected);
    };

    // Reset to the 2x2 layout
    const resetLayout = () => {
        setSelectedWidget('');
    };

    // Widget Toggle Function
    const toggleWidget = (widgetName) => {
        setWidgetVisibility((prev) => ({
            ...prev,
            [widgetName]: !prev[widgetName]
        }));
    };

    // Define data for predicted purchases line chart
    const predictedPurchasesData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Changed to weeks
        datasets: [{
            label: 'Predicted Purchases',
            data: predictedPurchases, // Using the updated data
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Transparent fill
            borderColor: 'rgba(54, 162, 235, 1)', // Solid line
            borderWidth: 2,
            tension: 0.3, // Smooth curve
        }]
    };

    return (
        <div className="analytics-container">
                <div className="customization-menu">
                <select onChange={handleWidgetSelect} value={selectedWidget}>
                    <option value="">Select a Widget</option>
                    <option value="conversionWidget">Conversion Rate</option>
                    <option value="predictionWidget">Predicted Purchases</option>
                    <option value="featureWidget">Feature Importance</option>
                    <option value="alertWidget">Model Alerts</option>
                </select>
            </div>

            {/* Full-Screen Widget */}
            {selectedWidget && (
                <div className="widget full-screen">
                    {selectedWidget === 'conversionWidget' && (
                        <div className="conversion-widget">
                            <h3>Conversion Rate</h3>
                            <p>{conversionRate}% of users predicted likely to purchase actually bought insurance.</p>
                        </div>
                    )}
                    {selectedWidget === 'predictionWidget' && (
                        <div className="prediction-widget">
                            <h3>Predicted Purchases (Next 4 Weeks)</h3>
                            {/* Render the Line graph */}
                            <Line
                                data={predictedPurchasesData}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: function(value) {
                                                    return value; // Show raw values
                                                }
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'bottom'
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(tooltipItem) {
                                                    return `Predicted: ${tooltipItem.raw}`; // Enhanced tooltip
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                    {selectedWidget === 'featureWidget' && (
                        <div className="feature-widget">
                            <h3>Feature Importance</h3>
                            <Pie
                                data={featureImportanceData}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Most Influential Features',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'bottom'
                                    }
                                }}
                            />
                        </div>
                    )}
                    {selectedWidget === 'alertWidget' && (
                        <div className="alert-widget">
                            <h3>Model Alerts</h3>
                            <p>{modelAlert}</p>
                        </div>
                    )}
                    <button className="reset-button" onClick={resetLayout}>Back to 2x2 Layout</button>
                </div>
            )}

            {/* 2x2 Grid Layout */}
            {!selectedWidget && (
                <div className="grid-layout">
                    {widgetVisibility.conversionWidget && (
                        <div className="widget conversion-widget small-widget">
                            <h3 className="conv-rate">Conversion Rate</h3>
                            <p>{conversionRate}% of users predicted likely to purchase actually bought insurance.</p>
                        </div>
                    )}
                    {widgetVisibility.predictionWidget && (
                        <div className="widget prediction-widget small-widget">
                            <h3 className="conv-rate">Predicted Purchases (Next 4 Weeks)</h3>
                            <Line
                                data={predictedPurchasesData}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        </div>
                    )}
                    {widgetVisibility.featureWidget && (
                        <div className="widget feature-widget small-widget">
                            <h3 className="feat-imp">Feature Importance</h3>
                            <Bar
                                data={featureImportanceData}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Feature Importance',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: false
                                    },
                                    scales: {
                                        y: {
                                            ticks: {
                                                callback: function(value) {
                                                    return value + '%'; // Add percentage symbol
                                                }
                                            }
                                        }
                                    },
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function(tooltipItem) {
                                                    return tooltipItem.raw + '%'; // Show percentage in tooltips
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                    {widgetVisibility.alertWidget && (
                        <div className="widget alert-widget small-widget">
                            <h3 className="model-alerts">Model Alerts</h3>
                            <p>{modelAlert}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Analytics;
