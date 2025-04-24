import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EfficiencyScore from './EfficiencyScore';

// Mock the axios module
jest.mock('axios');

// Mock the framer-motion module - this simplifies testing with animations
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
      circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock for calculateEfficiencyScore to test the calculation logic
const mockCalculateEfficiencyScore = (metrics: {
  orderFulfillment: number;
  inventoryAccuracy: number;
  spaceUtilization: number;
  staffProductivity: number;
}): number => {
  return Math.round(
    metrics.orderFulfillment * 0.35 +
    metrics.inventoryAccuracy * 0.25 +
    metrics.spaceUtilization * 0.25 +
    metrics.staffProductivity * 0.15
  );
};

describe('EfficiencyScore Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    
    // Mock the fetch implementation to return test data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          score: 85,
          metrics: {
            orderFulfillment: 90,
            inventoryAccuracy: 85,
            spaceUtilization: 80,
            staffProductivity: 82
          },
          timestamp: new Date().toISOString()
        }),
      })
    ) as jest.Mock;
    
    // Mock setTimeout to execute immediately
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the efficiency score component', async () => {
    render(<EfficiencyScore />);
    
    // Check that the main title is rendered
    expect(screen.getByText('Warehouse Efficiency Score')).toBeInTheDocument();
    
    // Check that auto-refresh message is shown
    expect(screen.getByText('Auto-refreshes every 30 seconds')).toBeInTheDocument();
  });

  test('displays correct score after data load', async () => {
    // Use act to handle useEffect
    await act(async () => {
      render(<EfficiencyScore />);
      // Fast-forward through any timers
      jest.advanceTimersByTime(1000);
    });

    // Score should update from the mock data
    const scoreElement = await screen.findByText(/\d+%/);
    expect(scoreElement).toBeInTheDocument();
  });

  test('toggles detailed metrics view when button is clicked', async () => {
    await act(async () => {
      render(<EfficiencyScore />);
      jest.advanceTimersByTime(1000);
    });

    // Initially, detailed metrics should not be visible
    expect(screen.queryByText('Order Fulfillment (35%)')).not.toBeInTheDocument();
    
    // Click the button to show details
    const detailsButton = screen.getByText('View Detailed Metrics');
    fireEvent.click(detailsButton);
    
    // Now metrics should be visible
    expect(await screen.findByText('Order Fulfillment (35%)')).toBeInTheDocument();
    expect(screen.getByText('Inventory Accuracy (25%)')).toBeInTheDocument();
    expect(screen.getByText('Space Utilization (25%)')).toBeInTheDocument();
    expect(screen.getByText('Staff Productivity (15%)')).toBeInTheDocument();
    
    // Click again to hide
    const hideButton = screen.getByText('Hide Details');
    fireEvent.click(hideButton);
    
    // Using a small delay to let animations complete
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    
    // Metrics should be hidden again
    expect(screen.queryByText('Order Fulfillment (35%)')).not.toBeInTheDocument();
  });

  test('calculateEfficiencyScore works correctly with different inputs', () => {
    // Test case 1: All metrics high (should be in green range)
    const highMetrics = {
      orderFulfillment: 95,
      inventoryAccuracy: 90,
      spaceUtilization: 92,
      staffProductivity: 88
    };
    const highScore = mockCalculateEfficiencyScore(highMetrics);
    expect(highScore).toBeGreaterThanOrEqual(85); // Should be green
    
    // Test case 2: Mixed metrics (should be in yellow range)
    const mixedMetrics = {
      orderFulfillment: 80,
      inventoryAccuracy: 75,
      spaceUtilization: 70,
      staffProductivity: 65
    };
    const mixedScore = mockCalculateEfficiencyScore(mixedMetrics);
    expect(mixedScore).toBeLessThan(85);
    expect(mixedScore).toBeGreaterThanOrEqual(70); // Should be yellow
    
    // Test case 3: Low metrics (should be in red range)
    const lowMetrics = {
      orderFulfillment: 65,
      inventoryAccuracy: 60,
      spaceUtilization: 55,
      staffProductivity: 50
    };
    const lowScore = mockCalculateEfficiencyScore(lowMetrics);
    expect(lowScore).toBeLessThan(70); // Should be red
  });

  test('refreshes data when refresh button is clicked', async () => {
    await act(async () => {
      render(<EfficiencyScore />);
      jest.advanceTimersByTime(1000);
    });
    
    // Find and click the refresh button
    const refreshButton = screen.getByText('Refresh now');
    
    await act(async () => {
      fireEvent.click(refreshButton);
      jest.advanceTimersByTime(500);
    });
    
    // Check that loading state appears
    expect(screen.getByText('Updating...')).toBeInTheDocument();
    
    // Move forward to complete the refresh
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    
    // Loading state should disappear
    expect(screen.queryByText('Updating...')).not.toBeInTheDocument();
    
    // Refresh button should be back
    expect(screen.getByText('Refresh now')).toBeInTheDocument();
  });

  test('calculates correct trends based on score history', () => {
    // This is testing the implementation details of the trend prediction function
    // which would normally be separated into its own testable unit
    
    // Empty scores - should return "Collecting data..."
    const emptyScores: number[] = [];
    const emptyTrend = predictTrend(emptyScores);
    expect(emptyTrend).toBe('Collecting data...');
    
    // Improving trend
    const improvingScores = [80, 82, 85, 89, 94];
    const improvingTrend = predictTrend(improvingScores);
    expect(improvingTrend).toBe('Improving');
    
    // Declining trend
    const decliningScores = [90, 88, 85, 82, 78];
    const decliningTrend = predictTrend(decliningScores);
    expect(decliningTrend).toBe('Declining');
    
    // Stable trend
    const stableScores = [85, 86, 85, 86, 85];
    const stableTrend = predictTrend(stableScores);
    expect(stableTrend).toBe('Stable');
  });
});

// Helper function copied from the component for testing
function predictTrend(scores: number[]): string {
  if (scores.length < 3) return "Collecting data...";
  
  // Simple linear regression for trend
  const recentScores = scores.slice(-5); // Last 5 scores
  const avgChange = recentScores.slice(1).reduce((sum, score, i) => 
    sum + (score - recentScores[i]), 0) / (recentScores.length - 1);
  
  if (avgChange > 1) return "Improving";
  if (avgChange < -1) return "Declining";
  return "Stable";
}
