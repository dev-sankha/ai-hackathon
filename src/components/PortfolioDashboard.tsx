'use client';

import { useState } from 'react';
import { mockPortfolioSummary, mockAssets, mockAssetAllocation } from '@/data/mockPortfolio';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import PerformanceChart from './PerformanceChart';
import AssetAllocationChart from './AssetAllocationChart';
import AssetTable from './AssetTable';

export default function PortfolioDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'allocation'>('overview');
  const summary = mockPortfolioSummary;

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total P&L</p>
              <p className={`text-2xl font-bold ${
                summary.totalUnrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${summary.totalUnrealizedPnL >= 0 ? '+' : ''}${summary.totalUnrealizedPnL.toLocaleString()}
              </p>
              <p className={`text-sm ${
                summary.totalUnrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summary.totalUnrealizedPnLPercent >= 0 ? '+' : ''}{summary.totalUnrealizedPnLPercent}%
              </p>
            </div>
            <div className={`p-2 rounded-lg ${
              summary.totalUnrealizedPnL >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {summary.totalUnrealizedPnL >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Day Change</p>
              <p className={`text-2xl font-bold ${
                summary.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${summary.dayChange >= 0 ? '+' : ''}${summary.dayChange.toLocaleString()}
              </p>
              <p className={`text-sm ${
                summary.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {summary.dayChangePercent >= 0 ? '+' : ''}{summary.dayChangePercent}%
              </p>
            </div>
            <div className={`p-2 rounded-lg ${
              summary.dayChange >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {summary.dayChange >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assets</p>
              <p className="text-2xl font-bold text-gray-900">{mockAssets.length}</p>
              <p className="text-sm text-gray-600">Holdings</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'assets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Holdings
          </button>
          <button
            onClick={() => setActiveTab('allocation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'allocation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Allocation
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Performance</h3>
            <PerformanceChart />
          </div>
        )}
        
        {activeTab === 'assets' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Your Holdings</h3>
              <p className="text-sm text-gray-600">Current positions and performance</p>
            </div>
            <AssetTable assets={mockAssets} />
          </div>
        )}
        
        {activeTab === 'allocation' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Allocation</h3>
            <AssetAllocationChart allocation={mockAssetAllocation} />
          </div>
        )}
      </div>
    </div>
  );
}