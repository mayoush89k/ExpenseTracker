import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const ChartBar = ({ recentDates, prices }) => {
  const bg = window.matchMedia("(prefers-color-scheme:dark").matches
    ? "#F5E8C7"
    : "#83A2FF";

  const border = window.matchMedia("(prefers-color-scheme:dark").matches
    ? "#435585"
    : "#FFD28F";
  const hoverBG = window.matchMedia("(prefers-color-scheme:dark").matches
    ? "#435585"
    : "#FFD28F";

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
  };

  // Function to create the bar chart
  const createBarChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: recentDates.map(formatDate),
        datasets: [
          {
            label: "Prices",
            data: prices,
            hoverBackgroundColor: hoverBG,
            backgroundColor: bg, // Bar color
            borderColor: border, // Border color
            borderWidth: 2,
          },
        ],
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
    <div className="chart-container w-[800px]">
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default ChartBar;
