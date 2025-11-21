'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AssetAllocation } from '@/types';

interface Props {
  allocation: AssetAllocation;
}

const COLORS = {
  stocks: '#3b82f6',
  etfs: '#10b981',
  bonds: '#f59e0b',
  crypto: '#8b5cf6',
  cash: '#6b7280'
};

export default function AssetAllocationChart({ allocation }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { name: 'Stocks', value: allocation.stocks, color: COLORS.stocks },
    { name: 'ETFs', value: allocation.etfs, color: COLORS.etfs },
    { name: 'Crypto', value: allocation.crypto, color: COLORS.crypto },
    { name: 'Cash', value: allocation.cash, color: COLORS.cash }
  ].filter(item => item.value > 0);

  if (!isClient) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-gray-500">Loading allocation chart...</div>
      </div>
    );
  }

  return (
    <div className="h-80 flex items-center">
      <div className="w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="w-1/2 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{item.value}%</span>
          </div>
        ))}
        
        <div className="pt-3 mt-3 border-t">
          <div className="text-sm text-gray-600">
            <p>Total Allocation: 100%</p>
            <p className="text-xs mt-1">Well diversified across {data.length} asset classes</p>
          </div>
        </div>
      </div>
    </div>
  );
}