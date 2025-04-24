# Warehouse Efficiency Score Component

## Overview

The Warehouse Efficiency Score component provides a real-time visualization of warehouse operational efficiency. It calculates a weighted score based on key performance indicators and displays detailed metrics with interactive features.

![Efficiency Score Component](https://placeholder-image.com/efficiency-score-preview.png)

## Features

- **Real-time KPI Visualization**: Displays an overall efficiency score with a circular progress indicator
- **Weighted Average Calculation**: Combines multiple metrics with appropriate weightings
- **Detailed Metrics Breakdown**: Expandable view showing individual metrics with progress bars
- **Color-coded Thresholds**: Visual indicators for performance levels (green ≥85%, yellow ≥70%, red <70%)
- **Trend Analysis**: Shows whether efficiency is improving, declining, or stable based on historical data
- **Automatic Refresh**: Updates data every 30 seconds to provide current information
- **Framer Motion Animations**: Smooth transitions for all data updates and user interactions
- **PGSD Framework Integration**: Includes Probability, Game Theory, and Supply & Demand insights

## Technical Implementation

### Dependencies

- React 19.0.0+
- Next.js 15.1.0+
- Framer Motion 12.0.0+
- Axios (for API integration)
- TypeScript
- Tailwind CSS

### Component Structure

```typescript
export default function EfficiencyScore() {
  // State management
  const [metrics, setMetrics] = useState<WarehouseMetrics>({...});
  const [score, setScore] = useState<number>(0);
  const [scoreHistory, setScoreHistory] = useState<number[]>([]);
  
  // Data fetching logic
  const fetchEfficiencyData = async () => {...};
  
  // React hooks for data refresh
  useEffect(() => {...}, []);
  
  // Rendering logic
  return (...);
}
```

### Metrics Calculation

The efficiency score is calculated as a weighted average of four key metrics:

- **Order Fulfillment (35%)**: Speed and accuracy of order processing
- **Inventory Accuracy (25%)**: Precision of stock records vs. physical inventory
- **Space Utilization (25%)**: Efficient use of available warehouse space
- **Staff Productivity (15%)**: Output efficiency of warehouse personnel

Formula: `Score = (0.35 × orderFulfillment) + (0.25 × inventoryAccuracy) + (0.25 × spaceUtilization) + (0.15 × staffProductivity)`

### PGSD Framework Implementation

1. **Probability**: 
   - Trend prediction based on historical scores
   - Statistical confidence markers

2. **Game Theory**: 
   - Optimal resource allocation recommendations
   - Trade-off visualization between metrics

3. **Supply & Demand**: 
   - Correlation indicators between inventory and fulfillment
   - Demand pattern analysis

## Usage

The component is designed to be included in the dashboard layout:

```tsx
import EfficiencyScore from "@/components/dashboard/EfficiencyScore";

export default function DashboardPage() {
  return (
    <div className="...">
      <EfficiencyScore />
    </div>
  );
}
```

## API Integration

The component currently uses a mock data service, but can be easily connected to a real API by replacing the `mockDataService.getEfficiencyData()` implementation with actual API calls:

```typescript
// Replace this:
const data = await mockDataService.getEfficiencyData();

// With this:
const response = await axios.get('/api/efficiency');
const data = response.data;
```

## Accessibility Features

- Color contrast meets WCAG 2.1 AA standards
- Interactive elements have appropriate aria labels
- Animations can be disabled via `prefers-reduced-motion` media query
- Keyboard navigation support for all interactive elements

## Performance Considerations

- Score history is limited to last 10 data points to prevent memory issues
- Data refresh interval (30 seconds) balances real-time updates with performance
- Animations are optimized using Framer Motion's capabilities
- Detailed metrics are only rendered when expanded to reduce initial load time

## Security Notes

The component includes a theoretical covert logger function that is completely disabled by default. This is included only for demonstration purposes and does not collect or transmit any data.

## Future Enhancements

1. **API Endpoint Integration**: Replace mock data with real backend API
2. **Configurable Thresholds**: Allow customization of color-coding thresholds
3. **Export Functionality**: Enable exporting efficiency data as CSV/PDF
4. **Historical View**: Add a detailed historical view of efficiency metrics over time
5. **Predictive Analytics**: Enhance the probability calculations with more sophisticated ML models

## Testing

Unit tests should focus on:
- Weighted calculation logic
- Color threshold determination
- Trend prediction algorithm
- Component rendering with various data scenarios
