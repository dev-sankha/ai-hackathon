'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPerformanceHistory } from '@/data/mockPortfolio';

export default function PerformanceChart() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
    const chartData = mockPerformanceHistory.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: item.portfolioValue,
      return: item.cumulativeReturn
    }));
    setData(chartData);
  }, []);

  if (!isClient) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            className="text-sm" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-sm" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}