"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StockDistributionChart() {
  // State for screen size
  const [isMobile, setIsMobile] = useState(false);
  const [chartHeight, setChartHeight] = useState(300);
  
  // Sample data - would come from API in real implementation
  const warehouses = ["Main Warehouse", "North Facility", "South Facility", "East Storage"];
  const categories = ["Electronics", "Furniture", "Clothing", "Food", "Equipment"];
  
  // Effect to handle window resize
  useEffect(() => {
    // Function to update dimensions
    const updateDimensions = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust chart height based on screen size
      if (window.innerWidth < 640) {
        setChartHeight(250); // Smaller height for phones
      } else if (window.innerWidth < 1024) {
        setChartHeight(280); // Medium height for tablets
      } else {
        setChartHeight(300); // Default height for desktops
      }
    };
    
    // Set dimensions on mount
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Generate random data for demo
  const generateRandomData = () => {
    return categories.map(() => Math.floor(Math.random() * 500) + 100);
  };
  
  // Simplify data for mobile if needed
  const getMobileOptimizedData = () => {
    if (isMobile) {
      // For mobile, we might want to show fewer datasets to avoid overcrowding
      return {
        labels: categories,
        datasets: [
          {
            label: warehouses[0],
            data: generateRandomData(),
            backgroundColor: "rgba(53, 162, 235, 0.6)",
          },
          {
            label: warehouses[1],
            data: generateRandomData(),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          }
        ]
      };
    }
    
    // Full data for larger screens
    return {
      labels: categories,
      datasets: [
        {
          label: warehouses[0],
          data: generateRandomData(),
          backgroundColor: "rgba(53, 162, 235, 0.6)",
        },
        {
          label: warehouses[1],
          data: generateRandomData(),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: warehouses[2],
          data: generateRandomData(),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: warehouses[3],
          data: generateRandomData(),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ],
    };
  };
  
  const data: ChartData<"bar"> = getMobileOptimizedData();
  
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? "bottom" as const : "top" as const,
        labels: {
          // Smaller boxes and font on mobile
          boxWidth: isMobile ? 12 : 20,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} units`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          // Smaller font on mobile
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          // Smaller font on mobile
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
    },
  };
  
  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 h-full shadow-sm border dark:border-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold">Stock Distribution</h2>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <label htmlFor="warehouse-select" className="sr-only">Filter by warehouse</label>
          <select 
            id="warehouse-select"
            className="text-xs sm:text-sm border rounded-md px-2 py-1 bg-background w-full sm:w-auto"
            aria-label="Filter by warehouse"
          >
            <option>All Warehouses</option>
            {warehouses.map((wh) => (
              <option key={wh}>{wh}</option>
            ))}
          </select>
          
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <select 
            id="category-select"
            className="text-xs sm:text-sm border rounded-md px-2 py-1 bg-background w-full sm:w-auto"
            aria-label="Filter by category"
          >
            <option>All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ height: `${chartHeight}px` }} className="w-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
