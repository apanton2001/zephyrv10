"use client";

import React, { ReactElement } from "react";
import { 
  IconPackage, 
  IconTruckDelivery, 
  IconAlertTriangle, 
  IconArrowUpRight, 
  IconArrowDownRight 
} from "@tabler/icons-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: ReactElement;
  description?: string;
}

const MetricCard = ({ title, value, trend, icon, description }: MetricCardProps) => {
  return (
    <div className="bg-card rounded-lg p-5 border dark:border-border">
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
        <div className="p-2 bg-primary/10 rounded-md text-primary" aria-hidden="true">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function MetricsGrid() {
  // Sample data - would come from API in real implementation
  const metrics = [
    {
      title: "Total Inventory",
      value: "5,283",
      trend: { value: 12, isPositive: true },
      icon: <IconPackage className="h-5 w-5" aria-hidden="true" />,
      description: "Total SKUs in warehouse"
    },
    {
      title: "Pending Orders",
      value: "148",
      trend: { value: 8, isPositive: true },
      icon: <IconTruckDelivery className="h-5 w-5" aria-hidden="true" />,
      description: "Orders to be processed"
    },
    {
      title: "Low Stock Items",
      value: "32",
      trend: { value: 5, isPositive: false },
      icon: <IconAlertTriangle className="h-5 w-5" aria-hidden="true" />,
      description: "Items below threshold"
    },
    {
      title: "Outgoing Today",
      value: "67",
      icon: <IconTruckDelivery className="h-5 w-5" aria-hidden="true" />,
      description: "Shipments scheduled today"
    }
  ];
  
  return (
    <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
      <h2 className="text-xl font-semibold mb-5">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}
