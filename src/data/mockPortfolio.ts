import {
  PortfolioSummary,
  Asset,
  Transaction,
  AssetAllocation,
  PerformanceData,
} from "@/types";

export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 487650.42,
  totalUnrealizedPnL: 72850.67,
  totalUnrealizedPnLPercent: 17.5,
  dayChange: -2134.56,
  dayChangePercent: -0.43,
  weekChange: 5456.78,
  weekChangePercent: 1.12,
  monthChange: 12765.43,
  monthChangePercent: 2.69,
};

export const mockAssets: Asset[] = [
  // Large Cap Technology Stocks
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 150,
    avgCost: 145.32,
    currentPrice: 173.5,
    unrealizedPnL: 4227.0,
    unrealizedPnLPercent: 19.4,
    marketValue: 26025.0,
    sector: "Technology",
    assetType: "stock",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 75,
    avgCost: 132.45,
    currentPrice: 142.2,
    unrealizedPnL: 731.25,
    unrealizedPnLPercent: 7.4,
    marketValue: 10665.0,
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 85,
    avgCost: 289.75,
    currentPrice: 415.26,
    unrealizedPnL: 10668.35,
    unrealizedPnLPercent: 43.3,
    marketValue: 35297.1,
    sector: "Technology",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    quantity: 25,
    avgCost: 420.15,
    currentPrice: 496.74,
    unrealizedPnL: 1914.75,
    unrealizedPnLPercent: 18.2,
    marketValue: 12418.5,
    sector: "Technology",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    quantity: 45,
    avgCost: 198.75,
    currentPrice: 324.5,
    unrealizedPnL: 5658.75,
    unrealizedPnLPercent: 63.3,
    marketValue: 14602.5,
    sector: "Technology",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    quantity: 60,
    avgCost: 98.32,
    currentPrice: 124.67,
    unrealizedPnL: 1581.0,
    unrealizedPnLPercent: 26.8,
    marketValue: 7480.2,
    sector: "Technology",
  },

  // Electric Vehicles & Clean Energy
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    quantity: 40,
    avgCost: 187.6,
    currentPrice: 242.84,
    unrealizedPnL: 2209.6,
    unrealizedPnLPercent: 29.4,
    marketValue: 9713.6,
    sector: "Electric Vehicles",
  },
  {
    symbol: "RIVN",
    name: "Rivian Automotive Inc.",
    quantity: 80,
    avgCost: 32.45,
    currentPrice: 18.75,
    unrealizedPnL: -1096.0,
    unrealizedPnLPercent: -42.2,
    marketValue: 1500.0,
    sector: "Electric Vehicles",
  },
  {
    symbol: "ENPH",
    name: "Enphase Energy Inc.",
    quantity: 35,
    avgCost: 156.2,
    currentPrice: 89.45,
    unrealizedPnL: -2336.25,
    unrealizedPnLPercent: -42.7,
    marketValue: 3130.75,
    sector: "Clean Energy",
  },

  // Healthcare & Biotech
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    quantity: 90,
    avgCost: 162.3,
    currentPrice: 174.85,
    unrealizedPnL: 1129.5,
    unrealizedPnLPercent: 7.7,
    marketValue: 15736.5,
    sector: "Healthcare",
  },
  {
    symbol: "PFE",
    name: "Pfizer Inc.",
    quantity: 120,
    avgCost: 44.25,
    currentPrice: 37.82,
    unrealizedPnL: -771.6,
    unrealizedPnLPercent: -14.5,
    marketValue: 4538.4,
    sector: "Healthcare",
  },
  {
    symbol: "MRNA",
    name: "Moderna Inc.",
    quantity: 30,
    avgCost: 287.45,
    currentPrice: 64.2,
    unrealizedPnL: -6697.5,
    unrealizedPnLPercent: -77.7,
    marketValue: 1926.0,
    sector: "Biotech",
  },

  // Financial Services
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    quantity: 65,
    avgCost: 138.95,
    currentPrice: 218.45,
    unrealizedPnL: 5167.5,
    unrealizedPnLPercent: 57.2,
    marketValue: 14199.25,
    sector: "Financial",
  },
  {
    symbol: "BAC",
    name: "Bank of America Corp.",
    quantity: 200,
    avgCost: 32.18,
    currentPrice: 44.75,
    unrealizedPnL: 2514.0,
    unrealizedPnLPercent: 39.0,
    marketValue: 8950.0,
    sector: "Financial",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    quantity: 50,
    avgCost: 195.6,
    currentPrice: 267.8,
    unrealizedPnL: 3610.0,
    unrealizedPnLPercent: 36.9,
    marketValue: 13390.0,
    sector: "Financial",
  },

  // Consumer & Retail
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 55,
    avgCost: 118.45,
    currentPrice: 195.25,
    unrealizedPnL: 4224.0,
    unrealizedPnLPercent: 64.8,
    marketValue: 10738.75,
    sector: "Consumer",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
    quantity: 75,
    avgCost: 143.2,
    currentPrice: 164.85,
    unrealizedPnL: 1623.75,
    unrealizedPnLPercent: 15.1,
    marketValue: 12363.75,
    sector: "Consumer",
  },
  {
    symbol: "COST",
    name: "Costco Wholesale Corp.",
    quantity: 25,
    avgCost: 512.3,
    currentPrice: 898.45,
    unrealizedPnL: 9653.75,
    unrealizedPnLPercent: 75.4,
    marketValue: 22461.25,
    sector: "Consumer",
  },
  {
    symbol: "NKE",
    name: "Nike Inc.",
    quantity: 70,
    avgCost: 102.15,
    currentPrice: 75.3,
    unrealizedPnL: -1879.5,
    unrealizedPnLPercent: -26.3,
    marketValue: 5271.0,
    sector: "Consumer",
  },

  // Industrial & Manufacturing
  {
    symbol: "CAT",
    name: "Caterpillar Inc.",
    quantity: 40,
    avgCost: 178.95,
    currentPrice: 295.6,
    unrealizedPnL: 4666.0,
    unrealizedPnLPercent: 65.2,
    marketValue: 11824.0,
    sector: "Industrial",
  },
  {
    symbol: "GE",
    name: "General Electric Co.",
    quantity: 110,
    avgCost: 82.45,
    currentPrice: 176.2,
    unrealizedPnL: 10312.5,
    unrealizedPnLPercent: 113.7,
    marketValue: 19382.0,
    sector: "Industrial",
  },

  // Energy
  {
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    quantity: 85,
    avgCost: 89.3,
    currentPrice: 118.75,
    unrealizedPnL: 2503.25,
    unrealizedPnLPercent: 33.0,
    marketValue: 10093.75,
    sector: "Energy",
  },
  {
    symbol: "CVX",
    name: "Chevron Corp.",
    quantity: 60,
    avgCost: 142.8,
    currentPrice: 156.9,
    unrealizedPnL: 846.0,
    unrealizedPnLPercent: 9.9,
    marketValue: 9414.0,
    sector: "Energy",
  },

  // Real Estate Investment Trusts (REITs)
  {
    symbol: "O",
    name: "Realty Income Corp.",
    quantity: 150,
    avgCost: 58.25,
    currentPrice: 62.4,
    unrealizedPnL: 622.5,
    unrealizedPnLPercent: 7.1,
    marketValue: 9360.0,
    sector: "REIT",
  },
  {
    symbol: "SPG",
    name: "Simon Property Group",
    quantity: 45,
    avgCost: 95.6,
    currentPrice: 164.25,
    unrealizedPnL: 3089.25,
    unrealizedPnLPercent: 71.8,
    marketValue: 7391.25,
    sector: "REIT",
  },

  // ETFs - Broad Market
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 120,
    avgCost: 387.25,
    currentPrice: 402.18,
    unrealizedPnL: 1791.6,
    unrealizedPnLPercent: 3.8,
    marketValue: 48261.6,
    sector: "ETF",
    assetType: "etf",
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    quantity: 200,
    avgCost: 198.45,
    currentPrice: 215.33,
    unrealizedPnL: 3376.0,
    unrealizedPnLPercent: 8.5,
    marketValue: 43066.0,
    sector: "ETF",
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    quantity: 80,
    avgCost: 298.75,
    currentPrice: 456.2,
    unrealizedPnL: 12596.0,
    unrealizedPnLPercent: 52.7,
    marketValue: 36496.0,
    sector: "ETF",
  },

  // ETFs - International
  {
    symbol: "VEA",
    name: "Vanguard FTSE Developed Markets ETF",
    quantity: 250,
    avgCost: 42.85,
    currentPrice: 48.9,
    unrealizedPnL: 1512.5,
    unrealizedPnLPercent: 14.1,
    marketValue: 12225.0,
    sector: "ETF",
  },
  {
    symbol: "VWO",
    name: "Vanguard Emerging Markets ETF",
    quantity: 180,
    avgCost: 48.2,
    currentPrice: 41.75,
    unrealizedPnL: -1161.0,
    unrealizedPnLPercent: -13.4,
    marketValue: 7515.0,
    sector: "ETF",
  },

  // Cryptocurrency
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    quantity: 0.25,
    avgCost: 42150.0,
    currentPrice: 51234.56,
    unrealizedPnL: 2271.14,
    unrealizedPnLPercent: 21.5,
    marketValue: 12808.64,
    sector: "Cryptocurrency",
    assetType: "crypto",
  },
  {
    symbol: "ETH-USD",
    name: "Ethereum",
    quantity: 2.5,
    avgCost: 2456.78,
    currentPrice: 3124.45,
    unrealizedPnL: 1669.175,
    unrealizedPnLPercent: 27.2,
    marketValue: 7811.125,
    sector: "Cryptocurrency",
  },
  {
    symbol: "ADA-USD",
    name: "Cardano",
    quantity: 1500,
    avgCost: 1.15,
    currentPrice: 0.785,
    unrealizedPnL: -547.5,
    unrealizedPnLPercent: -31.7,
    marketValue: 1177.5,
    sector: "Cryptocurrency",
  },

  // Commodities ETFs
  {
    symbol: "GLD",
    name: "SPDR Gold Shares",
    quantity: 30,
    avgCost: 168.45,
    currentPrice: 178.9,
    unrealizedPnL: 313.5,
    unrealizedPnLPercent: 6.2,
    marketValue: 5367.0,
    sector: "Commodities",
  },
  {
    symbol: "SLV",
    name: "iShares Silver Trust",
    quantity: 100,
    avgCost: 21.85,
    currentPrice: 24.3,
    unrealizedPnL: 245.0,
    unrealizedPnLPercent: 11.2,
    marketValue: 2430.0,
    sector: "Commodities",
  },
];

// Asset Allocation based on current portfolio
export const mockAssetAllocation: AssetAllocation = {
  stocks: 58.2, // Individual stocks
  etfs: 28.4, // All ETFs combined
  bonds: 0.0, // No bonds in current portfolio
  crypto: 4.8, // Cryptocurrency holdings
  reits: 3.6, // REIT holdings
  commodities: 1.7, // Gold/Silver ETFs
  cash: 3.3, // Cash position
};

// Mock transaction history
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    symbol: "AAPL",
    type: "buy",
    quantity: 150,
    price: 145.32,
    amount: 21798.0,
    date: "2024-09-15",
    fees: 0,
  },
  {
    id: "t2",
    symbol: "MSFT",
    type: "buy",
    quantity: 85,
    price: 289.75,
    amount: 24628.75,
    date: "2024-09-20",
    fees: 0,
  },
  {
    id: "t3",
    symbol: "SPY",
    type: "buy",
    quantity: 120,
    price: 387.25,
    amount: 46470.0,
    date: "2024-10-01",
    fees: 0,
  },
  {
    id: "t4",
    symbol: "GOOGL",
    type: "buy",
    quantity: 75,
    price: 132.45,
    amount: 9933.75,
    date: "2024-10-05",
    fees: 0,
  },
  {
    id: "t5",
    symbol: "NVDA",
    type: "buy",
    quantity: 25,
    price: 420.15,
    amount: 10503.75,
    date: "2024-10-10",
    fees: 0,
  },
  {
    id: "t6",
    symbol: "BTC-USD",
    type: "buy",
    quantity: 0.25,
    price: 42150.0,
    amount: 10537.5,
    date: "2024-10-15",
    fees: 25,
  },
  {
    id: "t7",
    symbol: "TSLA",
    type: "buy",
    quantity: 40,
    price: 187.6,
    amount: 7504.0,
    date: "2024-10-20",
    fees: 0,
  },
  {
    id: "t8",
    symbol: "VTI",
    type: "buy",
    quantity: 200,
    price: 198.45,
    amount: 39690.0,
    date: "2024-11-01",
    fees: 0,
  },
];

// Generate performance history data
export const generatePerformanceHistory = (days: number): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const baseValue = 414800; // Starting value 30 days ago
  let currentValue = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Simulate market volatility with some upward trend
    const randomChange = (Math.random() - 0.5) * 0.03; // ±1.5% daily volatility
    const trendComponent = (days - i) * 0.0006; // Gradual upward trend
    const totalChange = randomChange + trendComponent;

    currentValue = currentValue * (1 + totalChange);

    const dayReturn = totalChange * 100;
    const cumulativeReturn = ((currentValue - baseValue) / baseValue) * 100;

    data.push({
      date: date.toISOString().split("T")[0],
      portfolioValue: Math.round(currentValue * 100) / 100,
      dayReturn: Math.round(dayReturn * 100) / 100,
      cumulativeReturn: Math.round(cumulativeReturn * 100) / 100,
    });
  }

  return data;
};

export const mockPerformanceHistory = generatePerformanceHistory(30);

// Calculate totals for verification
const calculatedTotalValue = mockAssets.reduce(
  (sum, asset) => sum + asset.marketValue,
  0
);
const calculatedTotalPnL = mockAssets.reduce(
  (sum, asset) => sum + asset.unrealizedPnL,
  0
);

// Ensure our mock data is consistent
console.log("Mock Portfolio Verification:");
console.log(`Total Market Value: $${calculatedTotalValue.toLocaleString()}`);
console.log(`Total P&L: $${calculatedTotalPnL.toLocaleString()}`);
console.log(
  `Summary Total Value: $${mockPortfolioSummary.totalValue.toLocaleString()}`
);
console.log(
  `Summary Total P&L: $${mockPortfolioSummary.totalUnrealizedPnL.toLocaleString()}`
);
