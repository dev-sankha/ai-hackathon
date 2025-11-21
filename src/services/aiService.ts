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

      return {
        id,
        type: "assistant",
        content,
        timestamp,
        aiMode: this.currentProvider.name as AIMode,
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
