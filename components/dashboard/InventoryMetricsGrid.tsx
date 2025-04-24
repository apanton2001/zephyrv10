"use client";

import React, { useState, useEffect } from "react";
import { 
  IconPackage, 
  IconTruckDelivery, 
  IconAlertTriangle,
  IconClock, 
  IconCurrency,
  IconArrowUpRight, 
  IconArrowDownRight,
  IconRefresh
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types for inventory data and metrics
interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  location: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastUpdated: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactElement;
  description?: string;
  bgColor?: string;
}

interface CategoryData {
  category: string;
  count: number;
  value: number;
}

interface WarehouseData {
  name: string;
  stockCount: number;
}

interface InventoryMetrics {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  turnoverRate: number;
  daysOfSupply: number;
  totalValue: number;
  categoryBreakdown: CategoryData[];
  warehouseBreakdown: WarehouseData[];
}

// Helper function to calculate color based on value
const getColorForStatus = (status: string): string => {
  switch (status) {
    case "in_stock":
      return "#34C759"; // Green
    case "low_stock":
      return "#FF9500"; // Yellow/Orange
    case "out_of_stock":
      return "#FF3B30"; // Red
    default:
      return "#999999"; // Gray
  }
};

// MetricCard component for displaying individual metrics
const MetricCard = ({ title, value, trend, icon, description, bgColor }: MetricCardProps) => {
  return (
    <motion.div 
      className={`bg-card rounded-lg p-5 border dark:border-border hover:shadow-md transition-shadow`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            
            {trend && (
              <span 
                className={`ml-2 flex items-center text-sm font-medium ${
                  trend.isPositive ? "text-[#34C759]" : "text-[#FF3B30]"
                }`}
                aria-label={`${trend.isPositive ? 'Increased' : 'Decreased'} by ${trend.value}%`}
              >
                {trend.isPositive ? (
                  <IconArrowUpRight className="h-4 w-4 mr-1" aria-hidden="true" />
                ) : (
                  <IconArrowDownRight className="h-4 w-4 mr-1" aria-hidden="true" />
                )}
                {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={`p-2 ${bgColor || 'bg-primary/10'} rounded-md ${bgColor ? 'text-white' : 'text-primary'}`} aria-hidden="true">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// PGSD Insights Panel component
const PGSDInsightsPanel = ({ metrics }: { metrics: InventoryMetrics }) => {
  const lowStockPercentage = (metrics.lowStockItems / metrics.totalItems) * 100;
  const outOfStockPercentage = (metrics.outOfStockItems / metrics.totalItems) * 100;
  
  // Calculate top category by quantity
  const topCategory = metrics.categoryBreakdown.reduce((prev, current) => 
    (current.count > prev.count) ? current : prev, 
    metrics.categoryBreakdown[0] || { category: 'None', count: 0, value: 0 }
  );
  
  return (
    <motion.div 
      className="bg-card rounded-lg p-5 border dark:border-border mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-3">PGSD Insights</h3>
      
      <div className="space-y-4">
        {/* Probability Insights */}
        <div className="border-l-4 border-[#34C759] pl-3">
          <h4 className="text-sm font-medium">Probability</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Based on current trends, there's a {Math.round(85 - outOfStockPercentage)}% probability of maintaining adequate stock levels. 
            {lowStockPercentage > 15 ? 
              " Consider replenishing items that are running low to avoid stockouts." : 
              " Current inventory levels are well-balanced for expected demand."}
          </p>
        </div>
        
        {/* Game Theory Insights */}
        <div className="border-l-4 border-[#FF9500] pl-3">
          <h4 className="text-sm font-medium">Game Theory</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Optimal resource allocation suggests focusing on {metrics.turnoverRate > 4 ? "maintaining high turnover items" : "diversifying your inventory"}.
            {metrics.daysOfSupply < 30 ? 
              " Consider increasing bulk orders to optimize shipping costs and prevent stockouts." : 
              " Current allocation strategy is balancing holding costs and availability well."}
          </p>
        </div>
        
        {/* Supply & Demand Insights */}
        <div className="border-l-4 border-[#FF3B30] pl-3">
          <h4 className="text-sm font-medium">Supply & Demand</h4>
          <p className="text-sm text-muted-foreground mt-1">
            The {topCategory.category} category shows highest demand with {topCategory.count} units in inventory.
            {metrics.turnoverRate > 5 ? 
              " Market demand is high with rapid inventory turnover - consider increasing supply." : 
              " Current supply levels appear balanced with demand patterns."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function InventoryMetricsGrid() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [metrics, setMetrics] = useState<InventoryMetrics>({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    turnoverRate: 0,
    daysOfSupply: 0,
    totalValue: 0,
    categoryBreakdown: [],
    warehouseBreakdown: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedView, setSelectedView] = useState<'category' | 'warehouse'>('category');

  // Fetch inventory data from API
  const fetchInventoryData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/inventory');
      const data = await response.json();
      
      setInventoryItems(data.items);
      calculateMetrics(data.items);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate inventory metrics from items
  const calculateMetrics = (items: InventoryItem[]) => {
    // Count items by status
    const lowStockItems = items.filter(item => item.status === "low_stock").length;
    const outOfStockItems = items.filter(item => item.status === "out_of_stock").length;

    // Calculate category breakdown
    const categories: Record<string, { count: number, value: number }> = {};
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { count: 0, value: 0 };
      }
      categories[item.category].count += item.stock;
      // Mock value calculation - would use actual prices in a real implementation
      categories[item.category].value += item.stock * (Math.random() * 50 + 10);
    });
    
    // Calculate warehouse breakdown
    const warehouses: Record<string, number> = {};
    items.forEach(item => {
      const warehouse = item.location.split(' - ')[0];
      if (!warehouses[warehouse]) {
        warehouses[warehouse] = 0;
      }
      warehouses[warehouse] += item.stock;
    });

    // Calculate turnover rate and days of supply using mock data
    // In a real implementation, these would use historical sales data
    const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
    const mockMonthlySales = totalStock * (Math.random() * 0.3 + 0.1); // 10-40% of total stock
    const turnoverRate = totalStock > 0 ? (mockMonthlySales * 12) / totalStock : 0;
    const daysOfSupply = mockMonthlySales > 0 ? (totalStock / mockMonthlySales) * 30 : 0;
    
    // Calculate total inventory value
    const totalValue = Object.values(categories).reduce((sum, cat) => sum + cat.value, 0);

    setMetrics({
      totalItems: totalStock,
      lowStockItems,
      outOfStockItems,
      turnoverRate,
      daysOfSupply,
      totalValue,
      categoryBreakdown: Object.entries(categories).map(([category, data]) => ({
        category,
        count: data.count,
        value: data.value
      })),
      warehouseBreakdown: Object.entries(warehouses).map(([name, stockCount]) => ({
        name,
        stockCount
      }))
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Prepare chart data for category breakdown
  const categoryChartData = {
    labels: metrics.categoryBreakdown.map(cat => cat.category),
    datasets: [
      {
        data: metrics.categoryBreakdown.map(cat => cat.count),
        backgroundColor: [
          'rgba(53, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare chart data for warehouse breakdown
  const warehouseChartData = {
    labels: metrics.warehouseBreakdown.map(wh => wh.name),
    datasets: [
      {
        label: 'Stock Count',
        data: metrics.warehouseBreakdown.map(wh => wh.stockCount),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} units (${percentage}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Inventory" 
          value={metrics.totalItems.toLocaleString()}
          icon={<IconPackage className="h-5 w-5" />}
          description="Total units across all warehouses"
        />
        
        <MetricCard 
          title="Inventory Turnover" 
          value={metrics.turnoverRate.toFixed(2)}
          trend={{ 
            value: 8, 
            isPositive: true 
          }}
          icon={<IconRefresh className="h-5 w-5" />}
          description="Annual turnover rate"
        />
        
        <MetricCard 
          title="Days of Supply" 
          value={Math.round(metrics.daysOfSupply)}
          icon={<IconClock className="h-5 w-5" />}
          description="Estimated days until stockout"
        />
        
        <MetricCard 
          title="Inventory Value" 
          value={`$${Math.round(metrics.totalValue).toLocaleString()}`}
          trend={{ 
            value: 5, 
            isPositive: true 
          }}
          icon={<IconCurrency className="h-5 w-5" />}
          description="Total estimated value"
        />
        
        <MetricCard 
          title="Low Stock Items" 
          value={metrics.lowStockItems}
          trend={{ 
            value: 3, 
            isPositive: false 
          }}
          icon={<IconAlertTriangle className="h-5 w-5" />}
          description="Items below safety stock level"
          bgColor="bg-[#FF9500]"
        />
        
        <MetricCard 
          title="Out of Stock Items" 
          value={metrics.outOfStockItems}
          icon={<IconAlertTriangle className="h-5 w-5" />}
          description="Items with zero inventory"
          bgColor="bg-[#FF3B30]"
        />
        
        <MetricCard 
          title="Category Count" 
          value={metrics.categoryBreakdown.length}
          icon={<IconPackage className="h-5 w-5" />}
          description="Number of product categories"
        />
        
        <MetricCard 
          title="Warehouse Count" 
          value={metrics.warehouseBreakdown.length}
          icon={<IconTruckDelivery className="h-5 w-5" />}
          description="Number of storage locations"
        />
      </div>
      
      {/* Visualization and PGSD Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category/Warehouse Distribution Chart */}
        <div className="bg-card rounded-lg p-5 border dark:border-border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Inventory Distribution</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedView('category')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedView === 'category' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
                aria-pressed="true"
                data-state={selectedView === 'category' ? 'active' : 'inactive'}
                aria-label="View by category"
              >
                By Category
              </button>
              <button 
                onClick={() => setSelectedView('warehouse')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedView === 'warehouse' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
                aria-pressed="false"
                data-state={selectedView === 'warehouse' ? 'active' : 'inactive'}
                aria-label="View by warehouse"
              >
                By Warehouse
              </button>
            </div>
          </div>
          
          <div className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-muted-foreground">Loading chart data...</div>
            ) : (
              <>
                {selectedView === 'category' ? (
                  <Doughnut data={categoryChartData} options={doughnutOptions} />
                ) : (
                  <Bar data={warehouseChartData} options={barOptions} />
                )}
              </>
            )}
          </div>
        </div>
        
        {/* PGSD Insights Panel */}
        <div className="flex flex-col">
          <div className="bg-card rounded-lg p-5 border dark:border-border">
            <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
            
            <div className="space-y-4">
              {/* Stock Status Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stock Status</span>
                  <span>{metrics.totalItems} units total</span>
                </div>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
                  {/* In stock */}
                  <div 
                    className="h-full bg-[#34C759]" 
                    style={{ 
                      width: `${100 - ((metrics.lowStockItems + metrics.outOfStockItems) / inventoryItems.length) * 100}%` 
                    }}
                    aria-label={`In stock: ${inventoryItems.length - metrics.lowStockItems - metrics.outOfStockItems} items`}
                  ></div>
                  {/* Low stock */}
                  <div 
                    className="h-full bg-[#FF9500]" 
                    style={{ 
                      width: `${(metrics.lowStockItems / inventoryItems.length) * 100}%` 
                    }}
                    aria-label={`Low stock: ${metrics.lowStockItems} items`}
                  ></div>
                  {/* Out of stock */}
                  <div 
                    className="h-full bg-[#FF3B30]" 
                    style={{ 
                      width: `${(metrics.outOfStockItems / inventoryItems.length) * 100}%` 
                    }}
                    aria-label={`Out of stock: ${metrics.outOfStockItems} items`}
                  ></div>
                </div>
                <div className="flex text-xs mt-1 justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#34C759] mr-1"></div>
                    <span>In Stock</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#FF9500] mr-1"></div>
                    <span>Low Stock</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#FF3B30] mr-1"></div>
                    <span>Out of Stock</span>
                  </div>
                </div>
              </div>
              
              {/* Category Value Comparison */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Categories by Value</span>
                </div>
                {metrics.categoryBreakdown.slice(0, 3).map((category, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{category.category}</span>
                      <span>${Math.round(category.value).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-blue-${500 - index * 100}`}
                        style={{ 
                          width: `${(category.value / metrics.totalValue) * 100}%`,
                          backgroundColor: `rgba(${53 + index * 50}, ${162 - index * 40}, ${235 - index * 50}, 0.7)`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* PGSD Insights */}
          <PGSDInsightsPanel metrics={metrics} />
        </div>
      </div>
      
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchInventoryData}
          disabled={isLoading}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconRefresh className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Updating..." : "Refresh Data"}
        </button>
      </div>
    </div>
  );
}
