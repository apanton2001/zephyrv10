"use client";

import React, { Suspense, useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InventoryMetricsGrid from "@/components/dashboard/InventoryMetricsGrid";
import { IconSearch, IconFilter, IconPackage, IconPlus, IconMenu2 } from "@tabler/icons-react";

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

export default function InventoryPage() {
  // State for screen size
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set dimensions on mount
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Sample data - would come from API in real implementation
  const inventoryItems: InventoryItem[] = [
    {
      id: "i1",
      sku: "ELEC-001",
      name: "Dell XPS 13 Laptop",
      category: "Electronics",
      stock: 24,
      location: "Warehouse A - Section E2",
      status: "in_stock",
      lastUpdated: "2 hours ago"
    },
    {
      id: "i2",
      sku: "ELEC-002",
      name: "HP Printer Pro",
      category: "Electronics",
      stock: 12,
      location: "Warehouse A - Section E3",
      status: "in_stock",
      lastUpdated: "1 day ago"
    },
    {
      id: "i3",
      sku: "FURN-101",
      name: "Office Desk",
      category: "Furniture",
      stock: 5,
      location: "Warehouse B - Section F1",
      status: "low_stock",
      lastUpdated: "5 hours ago"
    },
    {
      id: "i4",
      sku: "FURN-102",
      name: "Ergonomic Chair",
      category: "Furniture",
      stock: 18,
      location: "Warehouse B - Section F2",
      status: "in_stock",
      lastUpdated: "3 days ago"
    },
    {
      id: "i5",
      sku: "ELEC-003",
      name: "Wireless Mouse",
      category: "Electronics",
      stock: 3,
      location: "Warehouse A - Section E1",
      status: "low_stock",
      lastUpdated: "6 hours ago"
    },
    {
      id: "i6",
      sku: "FOOD-001",
      name: "Organic Coffee Beans",
      category: "Food",
      stock: 0,
      location: "Warehouse C - Section P4",
      status: "out_of_stock",
      lastUpdated: "2 days ago"
    }
  ];

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in_stock":
        return <span className="px-2 py-1 rounded-full text-xs bg-[#34C759]/10 text-[#34C759]">In Stock</span>;
      case "low_stock":
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FF9500]/10 text-[#FF9500]">Low Stock</span>;
      case "out_of_stock":
        return <span className="px-2 py-1 rounded-full text-xs bg-[#FF3B30]/10 text-[#FF3B30]">Out of Stock</span>;
      default:
        return null;
    }
  };

  // Mobile card view for inventory items
  const MobileInventoryCard = ({ item }: { item: InventoryItem }) => (
    <div className="bg-background rounded-lg border border-border p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-sm">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.sku}</p>
        </div>
        {getStatusBadge(item.status)}
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div>
          <p className="text-muted-foreground">Category</p>
          <p>{item.category}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Stock</p>
          <p>{item.stock}</p>
        </div>
        <div className="col-span-2">
          <p className="text-muted-foreground">Location</p>
          <p>{item.location}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Updated {item.lastUpdated}</span>
        <button 
          className="p-1 hover:bg-muted rounded-full"
          aria-label="Item options"
          title="Item options">
          <IconMenu2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Inventory Management</h1>
          <button 
            aria-label="Add inventory item"
            className="bg-primary text-white px-3 sm:px-4 py-2 rounded-md flex items-center text-sm w-full sm:w-auto justify-center sm:justify-start">
            <IconPlus className="mr-2 h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Inventory Metrics Grid */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-[300px] sm:h-[600px] rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800"></div>}>
            <InventoryMetricsGrid />
          </Suspense>
        </div>

        <div className="bg-card rounded-lg shadow-sm border dark:border-border p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                aria-label="Search inventory"
                placeholder="Search inventory..."
                className="pl-9 sm:pl-10 h-10 w-full rounded-md border border-input bg-background text-xs sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                aria-label="Category filter"
                className="h-10 rounded-md border border-input bg-background px-2 sm:px-3 py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-1 sm:flex-none">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Food</option>
                <option>Clothing</option>
              </select>
              <select
                aria-label="Status filter"
                className="h-10 rounded-md border border-input bg-background px-2 sm:px-3 py-2 text-xs sm:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-1 sm:flex-none">
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <button 
                aria-label="Additional filters"
                className="h-10 w-10 flex items-center justify-center rounded-md border border-input bg-background ring-offset-background hover:bg-muted">
                <IconFilter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Inventory Items - Responsive Table/Cards */}
        <div className="bg-card rounded-lg shadow-sm border dark:border-border overflow-hidden">
          {/* Desktop Table View */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">SKU</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">Item Name</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">Category</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">In Stock</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">Location</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground text-xs sm:text-sm">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50">
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm font-medium">{item.sku}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm">{item.name}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm">{item.category}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm">{item.stock}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm">{item.location}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-xs sm:text-sm text-muted-foreground">{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Mobile Card View */}
          {isMobile && (
            <div className="p-4">
              {inventoryItems.map((item) => (
                <MobileInventoryCard key={item.id} item={item} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-3 sm:gap-0">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing <strong>6</strong> of <strong>24</strong> items
            </p>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button 
                aria-label="Go to page 1" 
                className="h-7 sm:h-8 w-7 sm:w-8 rounded-md border border-input bg-background flex items-center justify-center text-xs sm:text-sm">
                1
              </button>
              <button 
                aria-label="Go to page 2" 
                aria-current="page"
                className="h-7 sm:h-8 w-7 sm:w-8 rounded-md border border-muted bg-muted flex items-center justify-center text-xs sm:text-sm">
                2
              </button>
              <button 
                aria-label="Go to page 3" 
                className="h-7 sm:h-8 w-7 sm:w-8 rounded-md border border-input bg-background flex items-center justify-center text-xs sm:text-sm">
                3
              </button>
              <span className="text-muted-foreground text-xs sm:text-sm" aria-hidden="true">...</span>
              <button 
                aria-label="Go to page 8" 
                className="h-7 sm:h-8 w-7 sm:w-8 rounded-md border border-input bg-background flex items-center justify-center text-xs sm:text-sm">
                8
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
