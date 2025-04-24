"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { IconSearch, IconFilter, IconTruckDelivery, IconPlus } from "@tabler/icons-react";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
}

export default function OrdersPage() {
  // Sample data - would come from API in real implementation
  const orders: Order[] = [
    {
      id: "o1",
      orderNumber: "ORD-2025-1001",
      customer: "Acme Corporation",
      items: 12,
      total: "$3,250.00",
      status: "processing",
      date: "April 21, 2025"
    },
    {
      id: "o2",
      orderNumber: "ORD-2025-1002",
      customer: "TechSolutions Inc.",
      items: 5,
      total: "$1,875.50",
      status: "pending",
      date: "April 22, 2025"
    },
    {
      id: "o3",
      orderNumber: "ORD-2025-1003",
      customer: "Global Industries",
      items: 8,
      total: "$4,320.75",
      status: "shipped",
      date: "April 20, 2025"
    },
    {
      id: "o4",
      orderNumber: "ORD-2025-1004",
      customer: "Retail Partners LLC",
      items: 15,
      total: "$6,125.25",
      status: "delivered",
      date: "April 18, 2025"
    },
    {
      id: "o5",
      orderNumber: "ORD-2025-1005",
      customer: "Innovate Supplies",
      items: 3,
      total: "$950.00",
      status: "cancelled",
      date: "April 19, 2025"
    },
    {
      id: "o6",
      orderNumber: "ORD-2025-1006",
      customer: "Metro Distributors",
      items: 7,
      total: "$2,840.30",
      status: "processing",
      date: "April 23, 2025"
    }
  ];

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Pending</span>;
      case "processing":
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Processing</span>;
      case "shipped":
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Shipped</span>;
      case "delivered":
        return <span className="px-2 py-1 rounded-full text-xs bg-[#34C759]/10 text-[#34C759]">Delivered</span>;
      case "cancelled":
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FF3B30]/10 text-[#FF3B30]">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center">
            <IconPlus className="mr-2 h-4 w-4" />
            New Order
          </button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search orders by number, customer..."
                className="pl-10 h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Filter by status"
              >
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Filter by date range"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
              <button 
                className="h-10 w-10 flex items-center justify-center rounded-md border border-input bg-background ring-offset-background hover:bg-muted"
                aria-label="Additional filters"
              >
                <IconFilter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-lg shadow-sm border dark:border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Order #</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Customer</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Items</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Total</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Status</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Date</th>
                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">{order.orderNumber}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">{order.customer}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">{order.items}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">{order.total}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-300">
                          View
                        </button>
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-sm text-muted-foreground">
              Showing <strong>6</strong> of <strong>42</strong> orders
            </p>
            
            <div className="flex items-center space-x-2">
              <button 
                className="h-8 w-8 rounded-md border border-input bg-background flex items-center justify-center text-sm"
                aria-label="Go to page 1"
                aria-current="false"
              >
                1
              </button>
              <button 
                className="h-8 w-8 rounded-md border border-muted bg-muted flex items-center justify-center text-sm"
                aria-label="Go to page 2"
                aria-current="true"
              >
                2
              </button>
              <button 
                className="h-8 w-8 rounded-md border border-input bg-background flex items-center justify-center text-sm"
                aria-label="Go to page 3"
                aria-current="false"
              >
                3
              </button>
              <span className="text-muted-foreground" aria-hidden="true">...</span>
              <button 
                className="h-8 w-8 rounded-md border border-input bg-background flex items-center justify-center text-sm"
                aria-label="Go to page 7"
                aria-current="false"
              >
                7
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
