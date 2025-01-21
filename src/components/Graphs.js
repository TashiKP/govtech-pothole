import React, { useState } from "react";
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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphGrid = () => {
  // Dzongkhags data
  const dzongkhags = [
    "Thimphu",
    "Paro",
    "Punakha",
    "Wangdue",
    "Chukha",
  ];

  // Graph Data
  const [selectedDzongkhag, setSelectedDzongkhag] = useState(dzongkhags[0]);

  // Example time labels
  const timeLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

  // Total potholes in Bhutan
  const totalPotholesData = [100, 120, 140, 130, 150];

  // Dzongkhag-specific potholes
  const potholesByDzongkhag = {
    Thimphu: [20, 25, 30, 35, 40],
    Paro: [15, 20, 25, 30, 35],
    Punakha: [10, 15, 20, 25, 30],
    Wangdue: [5, 10, 15, 20, 25],
    Chukha: [8, 12, 18, 22, 28],
  };

  // Potholes repaired over time
  const repairedPotholesData = [50, 60, 70, 65, 75];

  // Potholes reported over time
  const reportedPotholesData = [30, 40, 50, 55, 60];

  return (
    <div className="grid-container">
      {/* Graph 1: Total Potholes in Bhutan */}
      <div className="graph-card">
        <Bar
          data={{
            labels: timeLabels,
            datasets: [
              {
                label: "Total Potholes in Bhutan",
                data: totalPotholesData,
                backgroundColor: "rgba(255, 99, 132, 0.7)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                borderRadius: 8,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Total Potholes in Bhutan",
              },
            },
          }}
        />
      </div>

      {/* Graph 2: Potholes in Selected Dzongkhag */}
      <div className="graph-card">
        <select
          value={selectedDzongkhag}
          onChange={(e) => setSelectedDzongkhag(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "5px",
            fontSize: "14px",
          }}
        >
          {dzongkhags.map((dzongkhag) => (
            <option key={dzongkhag} value={dzongkhag}>
              {dzongkhag}
            </option>
          ))}
        </select>
        <Bar
          data={{
            labels: timeLabels,
            datasets: [
              {
                label: `Potholes in ${selectedDzongkhag}`,
                data: potholesByDzongkhag[selectedDzongkhag],
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                borderRadius: 8,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: `Potholes in ${selectedDzongkhag}`,
              },
            },
          }}
        />
      </div>

      {/* Graph 3: Potholes Repaired Over Time */}
      <div className="graph-card">
        <Bar
          data={{
            labels: timeLabels,
            datasets: [
              {
                label: "Potholes Repaired Over Time",
                data: repairedPotholesData,
                backgroundColor: "rgba(75, 192, 192, 0.7)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                borderRadius: 8,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Potholes Repaired Over Time",
              },
            },
          }}
        />
      </div>

      {/* Graph 4: Potholes Reported Over Time */}
      <div className="graph-card">
        <Bar
          data={{
            labels: timeLabels,
            datasets: [
              {
                label: "Potholes Reported Over Time",
                data: reportedPotholesData,
                backgroundColor: "rgba(255, 206, 86, 0.7)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                borderRadius: 8,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Potholes Reported Over Time",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraphGrid;
