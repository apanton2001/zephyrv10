import { NextResponse } from 'next/server';

// Sample analytics data - in a real application, this would come from a database
export async function GET(request: Request) {
  // Performance metrics data
  const performanceMetrics = [
    { metric: "Orders Processed", value: "1,284", change: "+12.5%", trend: "up" },
    { metric: "Avg. Processing Time", value: "2.5 hours", change: "-15.2%", trend: "down" },
    { metric: "Order Accuracy", value: "98.7%", change: "+1.2%", trend: "up" },
    { metric: "Inventory Turnover", value: "5.3x", change: "+0.4x", trend: "up" }
  ];
  
  // Monthly orders data
  const monthlyOrdersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [65, 78, 52, 91, 43, 56],
        backgroundColor: 'hsl(var(--primary) / 0.6)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
      },
    ],
  };
  
  // Category distribution data
  const categoryDistributionData = {
    labels: ['Electronics', 'Furniture', 'Food', 'Clothing', 'Office Supplies'],
    datasets: [
      {
        label: 'Category Distribution',
        data: [35, 25, 15, 12, 13],
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
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Processing Time (hours)',
        data: [4.5, 3.8, 3.2, 3.0, 2.8, 2.5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Error Rate (%)',
        data: [3.2, 2.8, 2.1, 1.9, 1.5, 1.2],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  // Warehouse insights data
  const warehouseInsights = {
    topPerforming: [
      { area: "Order Processing Efficiency", change: "+15.2%" },
      { area: "Inventory Accuracy", change: "+8.7%" },
      { area: "Warehouse Utilization", change: "+6.3%" }
    ],
    needsImprovement: [
      { area: "Shipping Times", change: "+4.6%" },
      { area: "Return Processing", change: "+1.2%" },
      { area: "Stock Forecasting Accuracy", change: "-3.5%" }
    ]
  };
  
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe') || 'month';
  
  // In a real application, we would use the timeframe to filter data based on date ranges
  // For this example, we'll return the same data regardless of timeframe
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    performanceMetrics,
    monthlyOrdersData,
    categoryDistributionData,
    warehouseEfficiencyData,
    warehouseInsights,
    timeframe
  });
}
