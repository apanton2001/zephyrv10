"use client";

import React from "react";
import { Suspense } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EfficiencyScore from "@/components/dashboard/EfficiencyScore";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import StockDistributionChart from "@/components/dashboard/StockDistributionChart";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Warehouse Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Efficiency Score - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-64 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
              <EfficiencyScore />
            </Suspense>
          </div>
          
          {/* Stock Distribution - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-64 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
              <StockDistributionChart />
            </Suspense>
          </div>
        </div>
        
        {/* Metrics Grid - Full width */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-40 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
            <MetricsGrid />
          </Suspense>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Critical Alerts - Takes 1/2 of the space */}
          <div>
            <Suspense fallback={<div className="h-80 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
              <CriticalAlerts />
            </Suspense>
          </div>
          
          {/* Recent Activity - Takes 1/2 of the space */}
          <div>
            <Suspense fallback={<div className="h-80 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
              <RecentActivity />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
