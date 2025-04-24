"use client";

import React from "react";
import { IconAlertTriangle, IconPackage, IconRefresh } from "@tabler/icons-react";

interface AlertItem {
  id: string;
  type: "low_stock" | "expiring" | "damaged" | "overstock";
  title: string;
  details: string;
  level: "critical" | "warning" | "info";
  timestamp: string;
}

export default function CriticalAlerts() {
  // Sample data - would come from API in real implementation
  const alerts: AlertItem[] = [
    {
      id: "a1",
      type: "low_stock",
      title: "Low Stock: Dell XPS Laptops",
      details: "Only 2 units remaining (threshold: 5)",
      level: "critical",
      timestamp: "2 hours ago"
    },
    {
      id: "a2",
      type: "expiring",
      title: "Expiring Items: Dairy Products",
      details: "12 items expiring in 3 days",
      level: "warning",
      timestamp: "5 hours ago"
    },
    {
      id: "a3",
      type: "damaged",
      title: "Damaged Inventory: Furniture Section",
      details: "3 items reported damaged during transit",
      level: "warning",
      timestamp: "1 day ago"
    },
    {
      id: "a4",
      type: "low_stock",
      title: "Low Stock: Office Supplies",
      details: "Paper stock below threshold",
      level: "warning",
      timestamp: "1 day ago"
    },
    {
      id: "a5",
      type: "overstock",
      title: "Overstock Alert: Electronics",
      details: "Bluetooth speakers exceeding capacity",
      level: "info",
      timestamp: "2 days ago"
    }
  ];

  const getAlertIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "low_stock":
      case "overstock":
        return <IconPackage className="h-5 w-5" />;
      default:
        return <IconAlertTriangle className="h-5 w-5" />;
    }
  };

  const getAlertClass = (level: AlertItem["level"]) => {
    switch (level) {
      case "critical":
        return "bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20";
      case "warning":
        return "bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 h-full shadow-sm border dark:border-border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Critical Alerts</h2>
        <button 
          className="text-muted-foreground hover:text-foreground" 
          aria-label="Refresh alerts"
        >
          <IconRefresh className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 scrollbar-hide">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-3 rounded-md border ${getAlertClass(alert.level)} flex items-start`}
          >
            <div className="mr-3 mt-0.5" aria-hidden="true">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{alert.title}</h3>
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{alert.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button 
          className="text-primary text-sm font-medium hover:underline"
          aria-label="View all alert notifications"
          onClick={() => {}}
        >
          View All Alerts
        </button>
      </div>
    </div>
  );
}
