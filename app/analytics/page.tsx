"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { IconCalendarEvent, IconDownload } from "@tabler/icons-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  // State for screen size
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [chartHeights, setChartHeights] = useState({
    bar: 250,
    pie: 250,
    line: 300
  });

  // Effect to handle window resize
  useEffect(() => {
    // Function to update dimensions
    const updateDimensions = () => {
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Adjust chart heights based on screen size
      setChartHeights({
        bar: mobile ? 200 : tablet ? 220 : 250,
        pie: mobile ? 200 : tablet ? 220 : 250,
        line: mobile ? 250 : tablet ? 280 : 300
      });
    };
    
    // Set dimensions on mount
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Monthly orders data - simplified for mobile if needed
  const monthlyOrdersData = {
    labels: isMobile ? ['Jan', 'Mar', 'May'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: isMobile 
          ? [65, 52, 43] 
          : [65, 78, 52, 91, 43, 56],
        backgroundColor: 'hsl(var(--primary) / 0.6)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
      },
    ],
  };
  
  // Category distribution data
  const categoryDistributionData = {
    labels: isMobile 
      ? ['Electronics', 'Furniture', 'Other'] 
      : ['Electronics', 'Furniture', 'Food', 'Clothing', 'Office Supplies'],
    datasets: [
      {
        label: 'Category Distribution',
        data: isMobile 
          ? [35, 25, 40] // Simplified data for mobile (combining smaller categories)
          : [35, 25, 15, 12, 13],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Warehouse efficiency data
  const warehouseEfficiencyData = {
    labels: isMobile 
      ? ['Week 1', 'Week 3', 'Week 5'] 
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Processing Time (hours)',
        data: isMobile 
          ? [4.5, 3.2, 2.8] 
          : [4.5, 3.8, 3.2, 3.0, 2.8, 2.5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Error Rate (%)',
        data: isMobile 
          ? [3.2, 2.1, 1.5] 
          : [3.2, 2.8, 2.1, 1.9, 1.5, 1.2],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Performance metrics data
  const performanceMetrics = [
    { metric: "Orders Processed", value: "1,284", change: "+12.5%", trend: "up" },
    { metric: "Avg. Processing Time", value: "2.5 hours", change: "-15.2%", trend: "down" },
    { metric: "Order Accuracy", value: "98.7%", change: "+1.2%", trend: "up" },
    { metric: "Inventory Turnover", value: "5.3x", change: "+0.4x", trend: "up" }
  ];

  // Chart options with responsive adjustments
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: (isMobile ? 'bottom' : 'right') as 'bottom' | 'right',
        labels: {
          boxWidth: isMobile ? 12 : 20,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        labels: {
          boxWidth: isMobile ? 12 : 20,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex items-center space-x-2 border border-input p-2 rounded-md bg-background w-full sm:w-auto">
              <IconCalendarEvent className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-transparent border-none text-xs sm:text-sm appearance-none focus:outline-none focus:ring-0 w-full"
                aria-label="Date range selector"
                id="dateRangeSelector"
              >
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>Last Month</option>
                <option>Last Week</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            <button 
              className="border border-input p-2 rounded-md bg-background hover:bg-muted flex items-center text-xs sm:text-sm"
              aria-label="Export data"
              title="Export analytics data"
            >
              <IconDownload className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
          {performanceMetrics.map((item, index) => (
            <div key={index} className="bg-card rounded-lg shadow-sm border dark:border-border p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{item.metric}</p>
              <div className="flex justify-between items-end">
                <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
                <span className={`
                  text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${item.trend === 'up' 
                    ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20' 
                    : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'}
                `}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Monthly Orders */}
          <div className="bg-card rounded-lg shadow-sm border dark:border-border p-3 sm:p-4">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Monthly Orders</h2>
            <div style={{ height: `${chartHeights.bar}px` }}>
              <Bar 
                data={monthlyOrdersData} 
                options={barChartOptions}
              />
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="bg-card rounded-lg shadow-sm border dark:border-border p-3 sm:p-4">
            <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Category Distribution</h2>
            <div style={{ height: `${chartHeights.pie}px` }} className="flex items-center justify-center">
              <div className={`${isMobile ? 'w-full' : 'w-3/4'} h-full flex items-center justify-center`}>
                <Pie 
                  data={categoryDistributionData} 
                  options={pieChartOptions}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Warehouse Efficiency Trends */}
        <div className="bg-card rounded-lg shadow-sm border dark:border-border p-3 sm:p-4 mb-6">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Warehouse Efficiency Trends</h2>
          <div style={{ height: `${chartHeights.line}px` }}>
            <Line 
              data={warehouseEfficiencyData} 
              options={lineChartOptions}
            />
          </div>
        </div>
        
        {/* Insights Section */}
        <div className="bg-card rounded-lg shadow-sm border dark:border-border p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Warehouse Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-sm sm:text-md font-medium">Top Performing Areas</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Order Processing Efficiency</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">+15.2%</span>
                </li>
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Inventory Accuracy</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">+8.7%</span>
                </li>
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Warehouse Utilization</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">+6.3%</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-sm sm:text-md font-medium">Areas Needing Improvement</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Shipping Times</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">+4.6%</span>
                </li>
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Return Processing</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">+1.2%</span>
                </li>
                <li className="flex justify-between items-center p-1.5 sm:p-2 bg-background rounded text-xs sm:text-sm">
                  <span>Stock Forecasting Accuracy</span>
                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">-3.5%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
