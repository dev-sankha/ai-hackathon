'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface StockData {
  date: string;
  price: number;
  volume?: number;
}

interface StockChartProps {
  symbol: string;
  name: string;
  data: StockData[];
  currentPrice: number;
  change: number;
  changePercent: number;
  timeframe: string;
}

export default function StockChart({ 
  symbol, 
  name, 
  data, 
  currentPrice, 
  change, 
  changePercent, 
  timeframe 
}: StockChartProps) {
  const isPositive = change >= 0;
  const chartColor = isPositive ? '#10B981' : '#EF4444';
  
  // Determine currency format based on symbol
  const formatPrice = (price: number) => {
    const isIndianStock = ['TCS', 'RELIANCE', 'INFY'].includes(symbol);
    const currency = isIndianStock ? '₹' : '$';
    return `${currency}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate key statistics
  const prices = data.map(d => d.price);
  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const volatility = ((highPrice - lowPrice) / avgPrice * 100);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900">{symbol}</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Live
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{name}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatPrice(currentPrice)}
          </div>
          <div className={`flex items-center gap-2 text-lg font-semibold ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span>
              {isPositive ? '+' : ''}{formatPrice(change)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <span className="text-lg font-semibold text-gray-800">
            {timeframe} Performance
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="h-80 w-full bg-white rounded-lg border border-gray-100 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4}/>
                  <stop offset="50%" stopColor={chartColor} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(value) => formatPrice(value)}
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value: any) => [formatPrice(value), 'Price']}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={3}
                fill={`url(#gradient-${symbol})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">High</p>
          <p className="text-lg font-bold text-green-600 mt-1">
            {formatPrice(highPrice)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Low</p>
          <p className="text-lg font-bold text-red-600 mt-1">
            {formatPrice(lowPrice)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Average</p>
          <p className="text-lg font-bold text-gray-800 mt-1">
            {formatPrice(avgPrice)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Volatility</p>
          <p className="text-lg font-bold text-purple-600 mt-1">
            {volatility.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}