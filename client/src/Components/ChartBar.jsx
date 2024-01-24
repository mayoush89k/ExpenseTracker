import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartBar = ({ recentDates, prices }) => {
  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Function to create the bar chart
  const createBarChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: recentDates.map(formatDate),
        datasets: [{
          label: 'Prices',
          data: prices,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
          borderColor: '#ffa500', // Border color
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    createBarChart();
  }, []); // Run once when the component mounts

  return (
    <div className="chart-container ">
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartBar;
