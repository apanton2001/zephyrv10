# Zephyr Warehouse Management System

A modern warehouse management system built with Next.js 15 and Tailwind CSS that helps businesses efficiently manage inventory, process orders, and gain actionable analytics insights.

## Features

- **Responsive Dashboard:** A comprehensive dashboard showing key warehouse metrics, efficiency scores, stock distribution, alerts, and recent activity.
- **Inventory Management:** Complete inventory tracking with filtering, searching, and status indicators.
- **Order Processing:** Order management system with status tracking and filtering capabilities.
- **Analytics & Reporting:** Data visualization with charts showing performance trends and insights.
- **User Settings:** Customizable preferences for warehouse configuration and notifications.
- **Authentication:** Secure login system with role-based access control.
- **Dark/Light Mode:** Theme switching support for different viewing preferences.
- **Accessibility:** ARIA-compliant components and keyboard navigation support.
- **API Integration:** RESTful API endpoints for inventory, orders, and analytics data.

## Technology Stack

- **Frontend:** Next.js 15 with App Router and TypeScript
- **Styling:** Tailwind CSS with custom warehouse-specific color tokens
- **State Management:** React Hooks
- **Authentication:** Client-side with localStorage (demo only)
- **Form Handling:** React Hook Form with Zod validation
- **Data Visualization:** Chart.js with React-ChartJS-2
- **Icons:** Tabler Icons
- **API:** Next.js Route Handlers

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable UI components
  - `/auth`: Authentication-related components
  - `/dashboard`: Dashboard widgets and visualizations
  - `/inventory`: Inventory management components
  - `/layout`: Layout components like DashboardLayout
  - `/shared`: Shared UI elements
  - `/ui`: Basic UI components
- `/types`: TypeScript type declarations
- `/public`: Static assets

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zephyr-wms.git
cd zephyr-wms
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Login Credentials

For demo purposes, use the following credentials:
- **Email:** admin@zephyrwms.com
- **Password:** admin123

## PGSD Framework Implementation

The Zephyr Warehouse Management System is built around the PGSD (Probability, Game Theory, Supply and Demand) framework:

### Probability
- Risk assessment through color-coded status indicators for inventory levels
- Efficiency scores that predict warehouse performance trends
- Stock forecasting based on historical data patterns

### Game Theory
- Priority-based task allocation shown in the Recent Activity feed
- Strategic resource allocation represented in the warehouse configuration
- Collaborative optimization strategies in order processing workflows

### Supply and Demand
- Real-time inventory tracking with low stock alerts
- Visual representation of stock distribution across warehouses
- Order volume analytics to identify peak demand periods
- Supply chain bottleneck identification in warehouse insights

## Documentation & Deployment

This project includes comprehensive documentation to help with deployment, configuration, and maintenance:

- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist for deploying to Vercel
- [Complete Documentation](./DOCUMENTATION.md) - Comprehensive guide to architecture, components, and APIs
- [Cline Deployment Guide](./CLINE_DEPLOYMENT_GUIDE.md) - How to use Cline to manage deployments

## Next Steps

- Full database integration (replace mock API data)
- Advanced reporting capabilities
- Mobile app development
- Integration with shipping providers
- Barcode/QR code scanning support
- Advanced notification system

## License

[MIT](https://choosealicense.com/licenses/mit/)
