"use client";

import React from "react";
import { 
  IconPackage, 
  IconTruckDelivery, 
  IconArrowUpRight, 
  IconArrowDownRight, 
  IconClipboardCheck,
  IconUser,
  IconHistory
} from "@tabler/icons-react";

interface ActivityItem {
  id: string;
  type: "inventory" | "order" | "system" | "user";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

export default function RecentActivity() {
  // Sample data - would come from API in real implementation
  const activities: ActivityItem[] = [
    {
      id: "act1",
      type: "inventory",
      title: "Inventory Updated",
      description: "Added 24 units of Dell XPS 13 laptops",
      timestamp: "15 minutes ago",
      user: "John Smith"
    },
    {
      id: "act2",
      type: "order",
      title: "Order #45982 Shipped",
      description: "Electronics package sent to Tesla Inc.",
      timestamp: "2 hours ago",
      user: "Sara Johnson"
    },
    {
      id: "act3",
      type: "inventory",
      title: "Stock Count Adjusted",
      description: "Discrepancy resolved in Zone B-12",
      timestamp: "Yesterday, 4:25 PM",
      user: "Mike Williams"
    },
    {
      id: "act4",
      type: "order",
      title: "New Order Received",
      description: "Order #46001 from Amazon",
      timestamp: "Yesterday, 1:30 PM"
    },
    {
      id: "act5",
      type: "system",
      title: "System Maintenance",
      description: "Automatic inventory reconciliation complete",
      timestamp: "2 days ago"
    },
    {
      id: "act6",
      type: "user",
      title: "User Action",
      description: "Jane Doe logged in from new device",
      timestamp: "2 days ago"
    }
  ];

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "inventory":
        return <IconPackage className="h-5 w-5" />;
      case "order":
        return <IconTruckDelivery className="h-5 w-5" />;
      case "system":
        return <IconClipboardCheck className="h-5 w-5" />;
      case "user":
        return <IconUser className="h-5 w-5" />;
      default:
        return <IconHistory className="h-5 w-5" />;
    }
  };

  const getActivityClass = (type: ActivityItem["type"]) => {
    switch (type) {
      case "inventory":
        return "bg-blue-500/10 text-blue-500";
      case "order":
        return "bg-green-500/10 text-green-500";
      case "system":
        return "bg-purple-500/10 text-purple-500";
      case "user":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 h-full shadow-sm border dark:border-border">
      <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-hide">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div 
              className={`${getActivityClass(activity.type)} p-2 rounded-md flex-shrink-0`}
              aria-hidden="true"
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {activity.timestamp}
                </span>
              </div>
              {activity.user && (
                <div className="flex items-center mt-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-1.5">
                    <IconUser className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button 
          className="text-primary text-sm font-medium hover:underline"
          aria-label="View complete activity history"
          onClick={() => {}}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Handle click action
            }
          }}
        >
          View All Activity
        </button>
      </div>
    </div>
  );
}
