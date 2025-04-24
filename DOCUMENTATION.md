# Zephyr Warehouse Management System - Documentation

This comprehensive documentation covers all aspects of the Zephyr Warehouse Management System, from architecture to deployment with Cline integration.

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Project Structure](#3-project-structure)
4. [Core Components](#4-core-components)
5. [PGSD Framework Integration](#5-pgsd-framework-integration)
6. [API Documentation](#6-api-documentation)
7. [Authentication](#7-authentication)
8. [Deployment Process](#8-deployment-process)
9. [Cline Integration](#9-cline-integration)
10. [Maintenance](#10-maintenance)
11. [Troubleshooting](#11-troubleshooting)
12. [Future Development](#12-future-development)

---

## 1. Project Overview

The Zephyr Warehouse Management System is a modern, full-featured application built with Next.js 15 and Tailwind CSS. It provides comprehensive warehouse management capabilities including inventory tracking, order processing, and analytics dashboards.

### Key Features

- **Dashboard**: Centralized view of warehouse performance metrics
- **Inventory Management**: Track, filter, and manage warehouse stock
- **Order Processing**: Handle customer orders from receipt to fulfillment
- **Analytics**: Data visualization for business intelligence
- **User Management**: Role-based access control
- **Settings**: System configuration and preferences

### Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Visualization**: Chart.js with React-ChartJS-2
- **Forms**: React Hook Form with Zod validation
- **Authentication**: JWT-based authentication (demo mode)
- **API**: Next.js API Routes

---

## 2. Architecture

The application follows a modern, component-based architecture with clear separation of concerns.

### Next.js App Router Structure

The application uses Next.js 15's App Router for routing, which provides:
- Route groups and layouts
- Server and client components
- Route handlers for API endpoints
- Static and dynamic rendering options

### Data Flow

```
Client Request → Next.js Router → Component Rendering → API Request → Data Processing → UI Rendering
```

### State Management

- Local component state with useState
- Context API for theme and authentication
- React Query for server state (planned)

### Rendering Strategy

- Static rendering for stable content
- Dynamic rendering for personalized content
- Server components for data-heavy pages

---

## 3. Project Structure

```
zephyrv10/
├── app/                   # Next.js App Router pages
│   ├── analytics/         # Analytics dashboard
│   ├── api/               # API endpoints
│   ├── dashboard/         # Main dashboard
│   ├── inventory/         # Inventory management
│   ├── login/             # Authentication
│   ├── orders/            # Order processing
│   ├── settings/          # User settings
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── analytics/         # Analytics components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard widgets
│   ├── inventory/         # Inventory components
│   ├── layout/            # Layout components
│   ├── orders/            # Order components
│   ├── shared/            # Shared components
│   └── ui/                # Basic UI components
├── constants/             # Application constants
├── context/               # React contexts
├── hooks/                 # Custom React hooks
├── layouts/               # Page layouts
├── lib/                   # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript types
```

---

## 4. Core Components

### Dashboard Components

- **EfficiencyScore**: Visual gauge showing warehouse efficiency
- **MetricsGrid**: Key performance indicators in a grid layout
- **StockDistributionChart**: Visualization of inventory distribution
- **CriticalAlerts**: High-priority notifications
- **RecentActivity**: Timeline of recent warehouse actions

### Inventory Components

- **InventoryTable**: Data grid of all inventory items
- **InventoryFilters**: Filtering options for inventory
- **ItemDetails**: Detailed view of a single inventory item
- **StockLevelIndicator**: Visual indicator of stock status

### Order Components

- **OrderList**: List of all orders with status
- **OrderDetails**: Detailed view of a single order
- **OrderStatusFlow**: Visual representation of order progress
- **OrderFilters**: Filtering options for orders

### Analytics Components

- **PerformanceMetrics**: Key analytics data points
- **OrderTrendsChart**: Visualization of order patterns
- **CategoryDistribution**: Breakdown of inventory by category
- **WarehouseEfficiency**: Metrics for warehouse performance

### Auth Components

- **LoginForm**: User authentication form
- **UserProfile**: User information and preferences

### Layout Components

- **DashboardLayout**: Main application layout with navigation
- **ThemeProvider**: Dark/light mode support

---

## 5. PGSD Framework Integration

The PGSD (Probability, Game Theory, Supply and Demand) framework is central to the Zephyr WMS design philosophy:

### Probability

- **Implementation**: Risk assessment and prediction
  - **Components**: 
    - EfficiencyScore (prediction of warehouse performance)
    - CriticalAlerts (probability-based risk indicators)
    - StockLevelIndicator (risk categorization)
  
- **User Interface**: 
  - Color-coded indicators (red, yellow, green) for risk levels
  - Percentage-based efficiency scores
  - Time-series forecasting in analytics charts

### Game Theory

- **Implementation**: Strategic decision-making and resource allocation
  - **Components**:
    - RecentActivity (priority-based task allocation)
    - WarehouseEfficiency (strategic resource usage)
    - OrderStatusFlow (optimization of fulfillment paths)
  
- **User Interface**:
  - Priority indicators for tasks
  - Resource allocation visualizations
  - Optimization recommendations in analytics

### Supply and Demand

- **Implementation**: Inventory management and demand forecasting
  - **Components**:
    - StockDistributionChart (supply visualization)
    - OrderTrendsChart (demand patterns)
    - CategoryDistribution (supply categorization)
  
- **User Interface**:
  - Supply/demand balance indicators
  - Trend visualization for demand patterns
  - Bottleneck identification in warehouse flow

### PGSD Data Models

```typescript
// Example of PGSD data structure
interface PGSDMetrics {
  probability: {
    riskScore: number;
    confidenceLevel: number;
    forecastAccuracy: number;
  };
  gameTheory: {
    resourceUtilization: number;
    taskPriorities: Record<string, number>;
    optimizationScore: number;
  };
  supplyDemand: {
    stockLevels: Record<string, number>;
    demandForecast: Record<string, number>;
    bottlenecks: string[];
  };
}
```

---

## 6. API Documentation

### API Endpoints

#### Inventory API

- **GET /api/inventory**
  - Description: Retrieve inventory items
  - Query Parameters:
    - `search`: Search term
    - `category`: Filter by category
    - `status`: Filter by status
    - `page`: Page number
    - `limit`: Items per page
  - Response: Array of inventory items with metadata

- **GET /api/inventory/[id]**
  - Description: Get a single inventory item
  - Response: Detailed inventory item data

- **POST /api/inventory**
  - Description: Create a new inventory item
  - Request Body: Inventory item data
  - Response: Created inventory item

- **PUT /api/inventory/[id]**
  - Description: Update an inventory item
  - Request Body: Updated inventory data
  - Response: Updated inventory item

- **DELETE /api/inventory/[id]**
  - Description: Delete an inventory item
  - Response: Success message

#### Orders API

- **GET /api/orders**
  - Description: Retrieve orders
  - Query Parameters:
    - `search`: Search term
    - `status`: Filter by status
    - `date`: Filter by date range
    - `page`: Page number
    - `limit`: Items per page
  - Response: Array of orders with metadata

- **GET /api/orders/[id]**
  - Description: Get a single order
  - Response: Detailed order data

- **POST /api/orders**
  - Description: Create a new order
  - Request Body: Order data
  - Response: Created order

- **PUT /api/orders/[id]**
  - Description: Update an order
  - Request Body: Updated order data
  - Response: Updated order

- **PUT /api/orders/[id]/status**
  - Description: Update order status
  - Request Body: New status
  - Response: Updated order

#### Analytics API

- **GET /api/analytics/dashboard**
  - Description: Get dashboard analytics data
  - Response: Dashboard metrics

- **GET /api/analytics/inventory**
  - Description: Get inventory analytics
  - Response: Inventory metrics

- **GET /api/analytics/orders**
  - Description: Get order analytics
  - Response: Order metrics

- **GET /api/analytics/efficiency**
  - Description: Get warehouse efficiency data
  - Response: Efficiency metrics

### Response Models

```typescript
// Example inventory item model
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
  minimumStock: number;
  supplierInfo: {
    id: string;
    name: string;
    leadTime: number;
  };
}

// Example order model
interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}
```

---

## 7. Authentication

The system uses a client-side authentication approach (for demo purposes):

### Authentication Flow

1. User enters credentials on the login page
2. Credentials are validated against stored values
3. On successful login, a JWT token is generated
4. Token is stored in localStorage and added to request headers
5. Protected routes check for valid token
6. Session expires after 24 hours

### Role-Based Access

- **Admin**: Full system access
- **Manager**: Access to dashboard, inventory, orders
- **Staff**: Limited access to inventory and orders
- **Viewer**: Read-only access to dashboard

### Security Considerations

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt (in a real implementation)
- HTTPS enforcement for all requests
- Protection against CSRF attacks

---

## 8. Deployment Process

The application is deployed to Vercel for production use. See the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed deployment steps.

### Environment Setup

- Production environment variables configured in Vercel
- Next.js optimization features enabled
- Continuous deployment from git repository

### Build Process

1. Code is pushed to the production branch
2. Vercel automatically detects changes
3. Build process runs (`next build`)
4. Application is deployed to Vercel's edge network
5. Domain is updated to point to the new deployment

### Monitoring

- Vercel analytics for performance monitoring
- Error tracking via logging service
- Uptime monitoring

---

## 9. Cline Integration

The system is designed to be updated and deployed using Cline as the deployment assistant.

### Cline Deployment Flow

1. Developer makes changes to the codebase
2. Developer uses Cline to commit and push changes
3. Cline executes Git commands to update the repository
4. Vercel detects the changes and triggers a deployment
5. Cline reports back on deployment status

### Cline Commands for Deployment

```
# Example Cline command to deploy changes
git add .
git commit -m "Description of changes"
git push origin production
```

### Cline Deployment Verification

Cline can verify deployments by:
1. Checking Vercel deployment status through API
2. Running basic smoke tests against the deployed URL
3. Reporting any build or deployment errors

---

## 10. Maintenance

### Regular Maintenance Tasks

- Dependency updates (npm packages)
- Security patches
- Performance optimization
- Content updates
- Analytics review

### Backup Strategy

- Code repository backup
- Database backup (when implemented)
- Environment configuration backup

### Monitoring

- Performance monitoring
- Error tracking
- User activity monitoring
- Security monitoring

---

## 11. Troubleshooting

### Common Issues

#### Build Errors

- **Issue**: Build fails on Vercel
- **Solution**: Check build logs, fix code issues, ensure dependencies are compatible

#### API Errors

- **Issue**: API endpoints returning errors
- **Solution**: Check server logs, verify request format, ensure environment variables are set

#### Authentication Issues

- **Issue**: Users unable to log in
- **Solution**: Check authentication flow, reset demo credentials, clear browser cache

#### Performance Issues

- **Issue**: Slow page loads
- **Solution**: Optimize component rendering, implement caching, reduce bundle size

### Debugging Tools

- Browser Developer Tools
- Next.js Error Overlay
- Vercel Logs
- React DevTools

---

## 12. Future Development

### Planned Features

- Integration with real backend database
- Barcode scanning functionality
- Mobile app development
- Advanced reporting capabilities
- Integration with shipping providers
- Machine learning for demand forecasting
- Real-time collaborative features

### Technical Roadmap

- Implement server-side authentication
- Add comprehensive test suite
- Optimize for mobile devices
- Implement internationalization
- Add accessibility enhancements
- Implement advanced caching strategies

---

## Appendix

### Glossary

- **WMS**: Warehouse Management System
- **PGSD**: Probability, Game Theory, Supply and Demand
- **SKU**: Stock Keeping Unit
- **KPI**: Key Performance Indicator
- **JWT**: JSON Web Token

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Vercel Documentation](https://vercel.com/docs)
