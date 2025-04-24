import { NextResponse } from 'next/server';

// Sample orders data - in a real application, this would come from a database
const orders = [
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
  },
  {
    id: "o7",
    orderNumber: "ORD-2025-1007",
    customer: "Quantum Electronics",
    items: 20,
    total: "$7,450.00",
    status: "delivered",
    date: "April 15, 2025"
  },
  {
    id: "o8",
    orderNumber: "ORD-2025-1008",
    customer: "Sunshine Markets",
    items: 16,
    total: "$3,760.25",
    status: "shipped",
    date: "April 17, 2025"
  }
];

export async function GET(request: Request) {
  // Parse the URL to get query parameters
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const timeframe = searchParams.get('timeframe');
  const search = searchParams.get('search')?.toLowerCase();
  
  // Apply filters
  let filteredOrders = [...orders];
  
  if (status && status !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === status);
  }
  
  // Simple timeframe filtering (in a real app, this would use actual date parsing)
  if (timeframe) {
    switch (timeframe) {
      case 'week':
        // Filter to last 7 days (simplified)
        filteredOrders = filteredOrders.filter(order => 
          ['April 17, 2025', 'April 18, 2025', 'April 19, 2025', 'April 20, 2025', 
           'April 21, 2025', 'April 22, 2025', 'April 23, 2025'].includes(order.date)
        );
        break;
      case 'month':
        // All April orders are in the current month
        break;
      // Add more cases as needed
    }
  }
  
  if (search) {
    filteredOrders = filteredOrders.filter(order => 
      order.orderNumber.toLowerCase().includes(search) || 
      order.customer.toLowerCase().includes(search)
    );
  }
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    orders: filteredOrders,
    total: orders.length
  });
}

export async function POST(request: Request) {
  try {
    const newOrder = await request.json();
    
    // In a real application, validate the data and save to database
    // For now, just return the order with a generated ID
    const order = {
      id: `o${orders.length + 1}`,
      orderNumber: `ORD-2025-${1000 + orders.length + 1}`,
      ...newOrder,
      date: "April 23, 2025", // Today's date
    };
    
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
