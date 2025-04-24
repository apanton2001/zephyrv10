"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  IconDashboard, 
  IconPackage, 
  IconTruckDelivery, 
  IconChartBar, 
  IconSettings, 
  IconMenu2, 
  IconX, 
  IconSun, 
  IconMoon, 
  IconUser
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: typeof IconDashboard;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: IconDashboard },
  { name: "Inventory", href: "/inventory", icon: IconPackage },
  { name: "Orders", href: "/orders", icon: IconTruckDelivery },
  { name: "Analytics", href: "/analytics", icon: IconChartBar },
  { name: "Settings", href: "/settings", icon: IconSettings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar for mobile */}
      <div
        className={`${
          sidebarOpen ? "fixed inset-0 z-40 flex md:hidden" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>

        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-card dark:border-r dark:border-border pt-5 pb-4">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Close sidebar menu"
            >
              <IconX className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 px-4 flex items-center">
            <h1 className="text-xl font-bold">Zephyr WMS</h1>
          </div>

          <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } group flex items-center px-2 py-2 text-base rounded-md`}
                >
                  <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-card dark:border-r dark:border-border">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold">Zephyr WMS</h1>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } group flex items-center px-2 py-2 text-sm rounded-md`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t dark:border-border p-4 gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground"
                  aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                  {theme === "dark" ? (
                    <IconSun className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <IconMoon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              <button 
                className="flex-shrink-0 w-full group block"
                aria-label="View user profile"
                onClick={() => {}}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <IconUser className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-sm font-medium text-foreground">Admin User</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={toggleSidebar}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Open navigation menu"
          >
            <IconMenu2 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
