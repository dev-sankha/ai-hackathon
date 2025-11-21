export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  aiMode?: "pattern" | "gemini" | "openai" | "restapi";
}

export interface QueryIntent {
  category: "performance" | "assets" | "allocation" | "general";
  timeframe?: "day" | "week" | "month" | "overall";
  specificAsset?: string;
  confidence: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalUnrealizedPnL: number;
  totalUnrealizedPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  weekChange: number;
  weekChangePercent: number;
  monthChange: number;
  monthChangePercent: number;
}

export interface Asset {
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  marketValue: number;
  sector: string;
  assetType?: "stock" | "etf" | "bond" | "crypto" | "reit" | "commodity";
}

export interface Transaction {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  amount: number;
  date: string;
  fees: number;
}

export interface AssetAllocation {
  stocks: number;
  etfs: number;
  bonds: number;
  crypto: number;
  reits: number;
  commodities: number;
  cash: number;
}

export interface PerformanceData {
  date: string;
  portfolioValue: number;
  dayReturn: number;
  cumulativeReturn: number;
}

export interface VoiceSettings {
  enabled: boolean;
  autoSpeak: boolean;
  rate: number;
  pitch: number;
  volume: number;
}
