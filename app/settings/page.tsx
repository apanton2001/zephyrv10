"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { IconSave, IconBell, IconUser, IconWarehouse, IconShield, IconClock } from "@tabler/icons-react";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
            aria-label="Save settings"
          >
            <IconSave className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: User & Account */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile */}
            <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconUser className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">User Profile</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-medium">
                      AW
                    </div>
                    <button 
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                      aria-label="Change profile picture"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue="Admin Warehouse"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="admin@zephyrwms.com"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="User role selector"
                  >
                    <option>Administrator</option>
                    <option>Warehouse Manager</option>
                    <option>Inventory Specialist</option>
                    <option>Order Processor</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Security Settings */}
            <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconShield className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">Security</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <button 
                  className="w-full h-10 bg-primary/10 text-primary rounded-md text-sm font-medium"
                  aria-label="Update password"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle + Right Columns: System Settings & Notifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Warehouse Configuration */}
            <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconWarehouse className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">Warehouse Configuration</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="warehouseName" className="block text-sm font-medium text-muted-foreground mb-1">
                    Warehouse Name
                  </label>
                  <input
                    type="text"
                    id="warehouseName"
                    defaultValue="Zephyr Central Distribution"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    defaultValue="Chicago, IL"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Timezone selector"
                  >
                    <option>America/Chicago (UTC-06:00)</option>
                    <option>America/New_York (UTC-05:00)</option>
                    <option>America/Los_Angeles (UTC-08:00)</option>
                    <option>Europe/London (UTC+00:00)</option>
                    <option>Asia/Tokyo (UTC+09:00)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="capacityUnits" className="block text-sm font-medium text-muted-foreground mb-1">
                    Capacity Units
                  </label>
                  <select
                    id="capacityUnits"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Capacity units selector"
                  >
                    <option>Square Feet</option>
                    <option>Square Meters</option>
                    <option>Pallets</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-muted-foreground mb-1">
                  Low Stock Threshold (%)
                </label>
                <input
                  type="range"
                  id="lowStockThreshold"
                  min="5"
                  max="50"
                  step="5"
                  defaultValue="15"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5%</span>
                  <span>15%</span>
                  <span>25%</span>
                  <span>35%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
            
            {/* System Preferences */}
            <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconClock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">System Preferences</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-muted-foreground mb-1">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Date format selector"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-muted-foreground mb-1">
                    Currency
                  </label>
                  <select
                    id="currency"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Currency selector"
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                    <option>CAD (C$)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="weightUnit" className="block text-sm font-medium text-muted-foreground mb-1">
                    Weight Unit
                  </label>
                  <select
                    id="weightUnit"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Weight unit selector"
                  >
                    <option>Pounds (lbs)</option>
                    <option>Kilograms (kg)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dimensionUnit" className="block text-sm font-medium text-muted-foreground mb-1">
                    Dimension Unit
                  </label>
                  <select
                    id="dimensionUnit"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Dimension unit selector"
                  >
                    <option>Inches (in)</option>
                    <option>Centimeters (cm)</option>
                    <option>Meters (m)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <fieldset>
                  <legend className="text-sm font-medium text-muted-foreground mb-3">Default Views</legend>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showInventoryImages"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="showInventoryImages" className="ml-2 block text-sm">
                        Show product images in inventory list
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="compactView"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="compactView" className="ml-2 block text-sm">
                        Use compact view in tables
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showMetrics"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="showMetrics" className="ml-2 block text-sm">
                        Show metrics on dashboard
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="bg-card rounded-lg shadow-sm border dark:border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <IconBell className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">Notifications</h2>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="enableAllNotifications" className="text-sm cursor-pointer">Enable All Notifications</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="enableAllNotifications"
                    className="sr-only peer" 
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    aria-label="Enable all notifications toggle"
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                    ${notificationsEnabled ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                  </div>
                </label>
              </div>
              
              <fieldset disabled={!notificationsEnabled} className={notificationsEnabled ? '' : 'opacity-50'}>
                <legend className="text-sm font-medium text-muted-foreground mb-3">Notification Preferences</legend>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="stockAlerts" className="text-sm">
                      Low stock alerts
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="stockAlerts"
                        className="sr-only peer" 
                        checked={stockAlerts}
                        onChange={() => setStockAlerts(!stockAlerts)}
                        aria-label="Toggle low stock alerts"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                        ${stockAlerts ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="orderAlerts" className="text-sm">
                      New order notifications
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="orderAlerts"
                        className="sr-only peer" 
                        checked={orderAlerts}
                        onChange={() => setOrderAlerts(!orderAlerts)}
                        aria-label="Toggle order notifications"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                        ${orderAlerts ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="dailyReports" className="text-sm">
                      Daily summary reports
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="dailyReports"
                        className="sr-only peer" 
                        checked={dailyReports}
                        onChange={() => setDailyReports(!dailyReports)}
                        aria-label="Toggle daily summary reports"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                        ${dailyReports ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="weeklyReports" className="text-sm">
                      Weekly analytics reports
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="weeklyReports"
                        className="sr-only peer" 
                        checked={weeklyReports}
                        onChange={() => setWeeklyReports(!weeklyReports)}
                        aria-label="Toggle weekly analytics reports"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                        ${weeklyReports ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="monthlyReports" className="text-sm">
                      Monthly performance reports
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="monthlyReports"
                        className="sr-only peer" 
                        checked={monthlyReports}
                        onChange={() => setMonthlyReports(!monthlyReports)}
                        aria-label="Toggle monthly performance reports"
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                        ${monthlyReports ? 'after:translate-x-full after:border-white bg-primary' : 'after:border-gray-300 bg-gray-200 dark:bg-gray-700'} 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600`}>
                      </div>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
