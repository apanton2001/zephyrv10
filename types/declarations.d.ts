// Global type declarations

declare module '@/components/auth/LoginForm' {
  import React from 'react';
  
  export default function LoginForm(): React.ReactElement;
}

declare module 'next-themes' {
  import React from 'react';
  
  interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    storageKey?: string;
    forcedTheme?: string;
    enableSystem?: boolean;
    enableColorScheme?: boolean;
    disableTransitionOnChange?: boolean;
  }
  
  export interface UseThemeProps {
    themes: string[];
    setTheme: (theme: string) => void;
    theme?: string;
    resolvedTheme?: string;
    systemTheme?: string;
  }
  
  export function useTheme(): UseThemeProps;
  export function ThemeProvider(props: ThemeProviderProps): React.ReactElement;
}

declare module '@/components/layout/DashboardLayout' {
  import React, { ReactNode } from 'react';
  
  interface DashboardLayoutProps {
    children: ReactNode;
  }
  
  export default function DashboardLayout(props: DashboardLayoutProps): React.ReactElement;
}

declare module '@tabler/icons-react' {
  import React, { FC, SVGProps } from 'react';
  
  interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'stroke'> {
    size?: number | string;
    stroke?: number | string;
    color?: string;
  }
  
  export const IconSearch: FC<IconProps>;
  export const IconFilter: FC<IconProps>;
  export const IconPackage: FC<IconProps>;
  export const IconPlus: FC<IconProps>;
  export const IconTruckDelivery: FC<IconProps>;
  export const IconDashboard: FC<IconProps>;
  export const IconChartBar: FC<IconProps>;
  export const IconSettings: FC<IconProps>;
  export const IconMenu2: FC<IconProps>;
  export const IconX: FC<IconProps>;
  export const IconSun: FC<IconProps>;
  export const IconMoon: FC<IconProps>;
  export const IconUser: FC<IconProps>;
  export const IconCalendarEvent: FC<IconProps>;
  export const IconDownload: FC<IconProps>;
  export const IconSave: FC<IconProps>;
  export const IconBell: FC<IconProps>;
  export const IconWarehouse: FC<IconProps>;
  export const IconShield: FC<IconProps>;
  export const IconClock: FC<IconProps>;
  export const IconAlertTriangle: FC<IconProps>;
  export const IconArrowUpRight: FC<IconProps>;
  export const IconArrowDownRight: FC<IconProps>;
  export const IconRefresh: FC<IconProps>;
  export const IconClipboardCheck: FC<IconProps>;
  export const IconHistory: FC<IconProps>;
  export const IconLock: FC<IconProps>;
  export const IconMail: FC<IconProps>;
  export const IconLogin: FC<IconProps>;
}

declare module 'chart.js' {
  export const Chart: any;
  export const CategoryScale: any;
  export const LinearScale: any;
  export const PointElement: any;
  export const LineElement: any;
  export const BarElement: any;
  export const Title: any;
  export const Tooltip: any;
  export const Legend: any;
  export const ArcElement: any;
  
  export interface ChartData<TType = any, TData = any, TLabel = string> {
    labels?: TLabel[];
    datasets: {
      type?: TType;
      data: TData;
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      label?: string;
      tension?: number;
      fill?: boolean;
      [key: string]: any;
    }[];
  }
  
  export interface ChartOptions<TType = any> {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    plugins?: {
      legend?: {
        display?: boolean;
        position?: 'top' | 'bottom' | 'left' | 'right';
        [key: string]: any;
      };
      tooltip?: {
        mode?: string;
        intersect?: boolean;
        callbacks?: {
          label?: (context: any) => string;
          [key: string]: any;
        };
        [key: string]: any;
      };
      title?: {
        display?: boolean;
        text?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    scales?: {
      x?: {
        grid?: {
          display?: boolean;
          color?: string;
        };
        [key: string]: any;
      };
      y?: {
        beginAtZero?: boolean;
        grid?: {
          display?: boolean;
          color?: string;
        };
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  }
}

declare module 'react-chartjs-2' {
  import React, { FC } from 'react';
  import { ChartData, ChartOptions } from 'chart.js';
  
  interface ChartProps<TType = any, TData = any, TLabel = string> {
    data: ChartData<TType, TData, TLabel>;
    options?: ChartOptions<TType>;
    plugins?: any[];
    type?: string;
    width?: number;
    height?: number;
  }
  
  export const Bar: FC<ChartProps<'bar', number[], string>>;
  export const Line: FC<ChartProps<'line', number[], string>>;
  export const Pie: FC<ChartProps<'pie', number[], string>>;
  export const Doughnut: FC<ChartProps<'doughnut', number[], string>>;
  export const PolarArea: FC<ChartProps<'polarArea', number[], string>>;
  export const Radar: FC<ChartProps<'radar', number[], string>>;
  export const Scatter: FC<ChartProps<'scatter', { x: number; y: number }[], string>>;
  export const Bubble: FC<ChartProps<'bubble', { x: number; y: number; r: number }[], string>>;
}
