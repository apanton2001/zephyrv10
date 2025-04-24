import { NextResponse } from 'next/server';

// Sample inventory data - in a real application, this would come from a database
const inventoryItems = [
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
  },
  {
    id: "i7",
    sku: "CLOTH-001",
    name: "Cotton T-Shirts (Pack of 5)",
    category: "Clothing",
    stock: 42,
    location: "Warehouse D - Section C2",
    status: "in_stock",
    lastUpdated: "1 day ago"
  },
  {
    id: "i8",
    sku: "ELEC-004",
    name: "Smart Watch",
    category: "Electronics",
    stock: 8,
    location: "Warehouse A - Section E5",
    status: "in_stock",
    lastUpdated: "4 hours ago"
  }
];

export async function GET(request: Request) {
  // Parse the URL to get query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();
  
  // Apply filters
  let filteredItems = [...inventoryItems];
  
  if (category && category !== 'all') {
    filteredItems = filteredItems.filter(item => item.category === category);
  }
  
  if (status && status !== 'all') {
    filteredItems = filteredItems.filter(item => item.status === status);
  }
  
  if (search) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(search) || 
      item.sku.toLowerCase().includes(search) || 
      item.location.toLowerCase().includes(search)
    );
  }
  
  // Simulate delay for network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json({
    items: filteredItems,
    total: inventoryItems.length
  });
}

export async function POST(request: Request) {
  try {
    const newItem = await request.json();
    
    // In a real application, validate the data and save to database
    // For now, just return the item with a generated ID
    const item = {
      id: `i${inventoryItems.length + 1}`,
      ...newItem,
      lastUpdated: "Just now"
    };
    
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
