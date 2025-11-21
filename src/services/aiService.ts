import { ChatMessage, QueryIntent } from "@/types";
import { mockPortfolioSummary, mockAssets } from "@/data/mockPortfolio";
import {
  AIProvider,
  GeminiProvider,
  OpenAIProvider,
  RestAPIProvider,
} from "./ai-providers";

// Available AI providers
const PROVIDERS: Record<string, AIProvider> = {
  gemini: new GeminiProvider(),
  openai: new OpenAIProvider(),
  restapi: new RestAPIProvider(),
};

// Set your default provider here
const DEFAULT_PROVIDER = "gemini";

export type AIMode = "gemini" | "openai" | "restapi";

export class AIService {
  private currentProvider: AIProvider;

  constructor() {
    // Initialize with default provider
    this.currentProvider = PROVIDERS[DEFAULT_PROVIDER];
    console.log(
      `🤖 AI Service initialized with ${this.currentProvider.displayName}`
    );
  }

  /**
   * Set the AI provider
   */
  setMode(mode: AIMode): void {
    if (!PROVIDERS[mode]) {
      console.error(`❌ Unknown AI provider: ${mode}`);
      return;
    }

    this.currentProvider = PROVIDERS[mode];
    console.log(
      `🔄 AI Provider changed to: ${this.currentProvider.displayName}`
    );
  }

  /**
   * Get the current AI provider name
   */
  getMode(): AIMode {
    return this.currentProvider.name as AIMode;
  }

  /**
   * Get all available providers
   */
  getAvailableProviders(): Array<{
    name: string;
    displayName: string;
    configured: boolean;
  }> {
    return Object.values(PROVIDERS).map((provider) => ({
      name: provider.name,
      displayName: provider.displayName,
      configured: provider.isConfigured(),
    }));
  }

  /**
   * Generate stock data for charts
   */
  generateStockData(
    symbol: string,
    days: number
  ): Array<{ date: string; price: number }> {
    const stockInfo: Record<
      string,
      { basePrice: number; name: string; trend: number }
    > = {
      TCS: { basePrice: 4250, name: "Tata Consultancy Services", trend: 1.015 },
      RELIANCE: {
        basePrice: 2750,
        name: "Reliance Industries Limited",
        trend: 1.012,
      },
      INFY: { basePrice: 1850, name: "Infosys Limited", trend: 1.018 },
      AAPL: { basePrice: 175, name: "Apple Inc.", trend: 1.02 },
      GOOGL: { basePrice: 140, name: "Alphabet Inc.", trend: 1.016 },
      MSFT: { basePrice: 400, name: "Microsoft Corporation", trend: 1.014 },
      TSLA: { basePrice: 250, name: "Tesla Inc.", trend: 1.025 },
    };

    const stock = stockInfo[symbol] || {
      basePrice: 100,
      name: "Unknown Stock",
      trend: 1.01,
    };
    const data = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Generate realistic price movements with trends and volatility
      const dailyVariation = (Math.random() - 0.5) * 0.08; // ±4% daily variation
      const weeklyPattern = Math.sin((days - i) / 7) * 0.02; // Weekly patterns
      const trendFactor = Math.pow(stock.trend, (days - i) / days);
      const price =
        stock.basePrice * (1 + dailyVariation + weeklyPattern) * trendFactor;

      data.push({
        date: date.toISOString().split("T")[0],
        price: Math.round(price * 100) / 100,
      });
    }

    return data;
  }

  /**
   * Detect if query needs chart visualization
   */
  detectChartRequirements(query: string): {
    symbol?: string;
    timeframe?: string;
    showChart: boolean;
  } {
    const queryLower = query.toLowerCase();

    // Stock symbols to detect
    const stockPatterns: Record<string, string[]> = {
      TCS: ["tcs", "tata consultancy", "tata consulting"],
      RELIANCE: ["reliance", "ril", "reliance industries"],
      INFY: ["infosys", "infy", "info"],
      AAPL: ["apple", "aapl"],
      GOOGL: ["google", "alphabet", "googl"],
      MSFT: ["microsoft", "msft"],
      TSLA: ["tesla", "tsla"],
    };

    // Performance keywords
    const performanceKeywords = [
      "perform",
      "performance",
      "doing",
      "trend",
      "price",
      "stock",
      "chart",
      "graph",
      "visual",
      "show",
      "display",
      "analysis",
    ];

    // Timeframe detection
    const timeframePatterns: Record<string, string[]> = {
      "1 Month": ["month", "30 days", "1m"],
      "3 Months": ["3 month", "90 days", "3m", "quarter"],
      "6 Months": ["6 month", "180 days", "6m", "half year"],
      "1 Year": ["year", "12 month", "1y", "annual"],
    };

    // Find matching stock
    let detectedSymbol: string | undefined;
    for (const [symbol, patterns] of Object.entries(stockPatterns)) {
      if (patterns.some((pattern) => queryLower.includes(pattern))) {
        detectedSymbol = symbol;
        break;
      }
    }

    // Find matching timeframe (default to 3 months)
    let detectedTimeframe = "3 Months";
    for (const [timeframe, patterns] of Object.entries(timeframePatterns)) {
      if (patterns.some((pattern) => queryLower.includes(pattern))) {
        detectedTimeframe = timeframe;
        break;
      }
    }

    // Determine if chart should be shown
    const hasPerformanceKeyword = performanceKeywords.some((keyword) =>
      queryLower.includes(keyword)
    );

    const showChart = !!(detectedSymbol && hasPerformanceKeyword);

    return {
      symbol: detectedSymbol,
      timeframe: detectedTimeframe,
      showChart,
    };
  }

  /**
   * Main entry point for generating AI responses
   */
  async generateResponse(
    query: string,
    intent: QueryIntent
  ): Promise<ChatMessage> {
    const id = Math.random().toString(36);
    const timestamp = new Date();

    console.log("🚀 AIService.generateResponse called");
    console.log("📝 Query:", query);
    console.log("🎯 Intent:", intent);
    console.log("⚙️ Current Provider:", this.currentProvider.displayName);

    try {
      // Check if provider is configured
      if (!this.currentProvider.isConfigured()) {
        console.warn(
          `⚠️ ${this.currentProvider.displayName} not configured, falling back to Gemini`
        );
        if (PROVIDERS.gemini?.isConfigured()) {
          this.currentProvider = PROVIDERS.gemini;
        } else {
          throw new Error(
            `${this.currentProvider.displayName} not configured and no fallback available`
          );
        }
      }

      // Detect chart requirements
      const chartRequirements = this.detectChartRequirements(query);
      console.log("📊 Chart requirements:", chartRequirements);

      // Build portfolio context
      const portfolioContext = this.buildPortfolioContext();

      // Generate response using current provider
      console.log(`🔮 Using ${this.currentProvider.displayName}...`);
      const content = await this.currentProvider.generateResponse(
        query,
        intent,
        portfolioContext
      );

      console.log("✅ Response generated:", content.substring(0, 100) + "...");

      // Build chart data if required
      let chartData = undefined;
      if (chartRequirements.showChart && chartRequirements.symbol) {
        const days =
          chartRequirements.timeframe === "1 Month"
            ? 30
            : chartRequirements.timeframe === "6 Months"
            ? 180
            : chartRequirements.timeframe === "1 Year"
            ? 365
            : 90;

        const stockData = this.generateStockData(
          chartRequirements.symbol,
          days
        );
        const currentPrice = stockData[stockData.length - 1].price;
        const previousPrice =
          stockData[stockData.length - 2]?.price || currentPrice;
        const change = currentPrice - previousPrice;
        const changePercent = (change / previousPrice) * 100;

        const stockNames: Record<string, string> = {
          TCS: "Tata Consultancy Services",
          RELIANCE: "Reliance Industries Limited",
          INFY: "Infosys Limited",
          AAPL: "Apple Inc.",
          GOOGL: "Alphabet Inc.",
          MSFT: "Microsoft Corporation",
          TSLA: "Tesla Inc.",
        };

        chartData = {
          symbol: chartRequirements.symbol,
          name: stockNames[chartRequirements.symbol] || "Unknown Company",
          data: stockData,
          currentPrice,
          change,
          changePercent,
          timeframe: chartRequirements.timeframe || "3 Months",
          showChart: true,
        };
      }

      return {
        id,
        type: "assistant",
        content,
        timestamp,
        aiMode: this.currentProvider.name as AIMode,
        chartData,
      };
    } catch (error) {
      console.error("❌ Error generating AI response:", error);

      // Fallback to Gemini if current provider fails
      if (
        this.currentProvider.name !== "gemini" &&
        PROVIDERS.gemini?.isConfigured()
      ) {
        console.log("🔄 Falling back to Gemini...");
        const fallbackProvider = PROVIDERS.gemini;
        const portfolioContext = this.buildPortfolioContext();

        try {
          const content = await fallbackProvider.generateResponse(
            query,
            intent,
            portfolioContext
          );

          return {
            id,
            type: "assistant",
            content: `I encountered an issue with ${this.currentProvider.displayName}. Here's what I found using Gemini: ${content}`,
            timestamp,
            aiMode: "gemini",
          };
        } catch (fallbackError) {
          console.error("❌ Gemini fallback also failed:", fallbackError);
        }
      }

      // Ultimate fallback
      return {
        id,
        type: "assistant",
        content:
          "I'm having trouble processing your request right now. Please check your AI provider configuration and try again.",
        timestamp,
        aiMode: this.currentProvider.name as AIMode,
      };
    }
  }

  /**
   * Build portfolio context for AI prompts
   */
  private buildPortfolioContext(): string {
    const summary = mockPortfolioSummary;
    const assets = mockAssets;

    return `
PORTFOLIO SUMMARY:
- Total Value: $${summary.totalValue.toLocaleString()}
- Total P&L: $${summary.totalUnrealizedPnL.toLocaleString()} (${
      summary.totalUnrealizedPnLPercent
    }%)
- Day Change: $${summary.dayChange.toLocaleString()} (${
      summary.dayChangePercent
    }%)
- Week Change: $${summary.weekChange.toLocaleString()} (${
      summary.weekChangePercent
    }%)
- Month Change: $${summary.monthChange.toLocaleString()} (${
      summary.monthChangePercent
    }%)

HOLDINGS:
${assets
  .map(
    (asset) =>
      `- ${asset.symbol} (${asset.name}): ${asset.quantity} shares, $${asset.currentPrice} each, P&L: $${asset.unrealizedPnL} (${asset.unrealizedPnLPercent}%)`
  )
  .join("\n")}

ALLOCATION:
- Stocks: 65.2%, ETFs: 15.6%, Crypto: 17.8%, Cash: 1.4%`;
  }

  /**
   * Analyze user query to determine intent
   */
  analyzeQuery(query: string): QueryIntent {
    const lowerQuery = query.toLowerCase();

    // Performance queries
    if (
      lowerQuery.includes("performance") ||
      lowerQuery.includes("return") ||
      lowerQuery.includes("gain") ||
      lowerQuery.includes("loss") ||
      lowerQuery.includes("p&l") ||
      lowerQuery.includes("profit")
    ) {
      let timeframe: "day" | "week" | "month" | "overall" = "overall";

      if (lowerQuery.includes("today") || lowerQuery.includes("day")) {
        timeframe = "day";
      } else if (lowerQuery.includes("week")) {
        timeframe = "week";
      } else if (lowerQuery.includes("month")) {
        timeframe = "month";
      }

      return {
        category: "performance",
        timeframe,
        confidence: 0.9,
      };
    }

    // Asset-specific queries
    if (
      lowerQuery.includes("stock") ||
      lowerQuery.includes("asset") ||
      lowerQuery.includes("holding") ||
      lowerQuery.includes("position") ||
      /\b(aapl|apple|googl|google|tsla|tesla|msft|microsoft|spy|vti|btc|bitcoin|eth|ethereum)\b/.test(
        lowerQuery
      )
    ) {
      const assetMatch = lowerQuery.match(
        /\b(aapl|apple|googl|google|tsla|tesla|msft|microsoft|spy|vti|btc|bitcoin|eth|ethereum)\b/
      );

      return {
        category: "assets",
        specificAsset: assetMatch ? assetMatch[0] : undefined,
        confidence: 0.8,
      };
    }

    // Allocation queries
    if (
      lowerQuery.includes("allocation") ||
      lowerQuery.includes("distribution") ||
      lowerQuery.includes("breakdown") ||
      lowerQuery.includes("diversif")
    ) {
      return {
        category: "allocation",
        confidence: 0.8,
      };
    }

    // Default to general
    return {
      category: "general",
      confidence: 0.5,
    };
  }
}

export const aiService = new AIService();
