import { ChatMessage, QueryIntent } from "@/types";
import { mockPortfolioSummary, mockAssets } from "@/data/mockPortfolio";

export class AIService {
  private mode: "pattern" | "gemini" = "gemini";

  /**
   * Set the AI mode for responses
   */
  setMode(mode: "pattern" | "gemini"): void {
    console.log("🔄 AI Mode changed:", mode);
    this.mode = mode;
  }

  /**
   * Get the current AI mode
   */
  getMode(): "pattern" | "gemini" {
    return this.mode;
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
    console.log("⚙️ Current AI Mode:", this.mode);

    try {
      if (this.mode === "gemini") {
        console.log("🔮 Using Google Gemini AI...");
        const response = await this.generateGeminiResponse(
          intent,
          query,
          id,
          timestamp
        );
        console.log(
          "✅ Gemini response generated:",
          response.content.substring(0, 100) + "..."
        );
        return response;
      } else {
        console.log("🧩 Using Pattern Matching AI...");
        const response = this.generatePatternResponse(
          intent,
          query,
          id,
          timestamp
        );
        console.log(
          "✅ Pattern response generated:",
          response.content.substring(0, 100) + "..."
        );
        return response;
      }
    } catch (error) {
      console.error("❌ Error generating AI response:", error);

      // Fallback to pattern matching if Gemini fails
      console.log("🔄 Falling back to pattern matching...");
      const fallbackResponse = this.generatePatternResponse(
        intent,
        query,
        id,
        timestamp
      );
      fallbackResponse.content =
        "I encountered an issue with the AI service. Here's what I found using pattern matching: " +
        fallbackResponse.content;
      return fallbackResponse;
    }
  }

  /**
   * PATTERN MATCHING MODE
   * Rules-based responses with predefined patterns
   */
  private generatePatternResponse(
    intent: QueryIntent,
    originalQuery: string,
    id: string,
    timestamp: Date
  ): ChatMessage {
    console.log("🧩 Generating pattern-based response...");
    const response = this.generatePatternBasedResponse(intent, id, timestamp);
    response.aiMode = "pattern";
    console.log("✅ Pattern response ready");
    return response;
  }

  /**
   * GOOGLE GEMINI MODE
   * Real AI with natural language understanding
   */
  private async generateGeminiResponse(
    intent: QueryIntent,
    originalQuery: string,
    id: string,
    timestamp: Date
  ): Promise<ChatMessage> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    console.log("🔐 Checking Gemini API key...", apiKey ? "Found" : "Missing");

    if (!apiKey) {
      console.error("❌ Gemini API key not configured");
      throw new Error("Gemini API key not configured");
    }

    console.log("📦 Loading Gemini AI SDK...");

    try {
      // Import Gemini AI (dynamic import for client-side)
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      console.log("🏗️ Building portfolio context...");

      // Build context with portfolio data
      const portfolioContext = this.buildPortfolioContext();

      console.log("✨ Generating Gemini response...");

      const prompt = `
You are an AI portfolio assistant. Analyze this portfolio and answer the user's question.

PORTFOLIO DATA:
${portfolioContext}

USER QUESTION: ${originalQuery}

IMPORTANT GUIDELINES:
- Be helpful and conversational
- Use specific numbers from the portfolio data
- Provide descriptive analysis only (no investment advice)
- Keep responses concise (2-3 sentences max)
- Focus on factual performance metrics
- Use a friendly, professional tone

Response:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const content = response.text();

      console.log("✅ Gemini response generated successfully");

      return {
        id,
        type: "assistant",
        content: content.trim(),
        timestamp,
        aiMode: "gemini",
      };
    } catch (error) {
      console.error("❌ Gemini error:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Check for specific quota errors
      if (errorMessage.includes("429") || errorMessage.includes("quota")) {
        throw new Error(
          "Gemini API quota exceeded. Please wait a few minutes and try again, or check your billing settings at https://ai.dev/usage"
        );
      }

      // Check for model not found errors
      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        throw new Error(
          "Gemini model not available. The AI service will fall back to pattern matching."
        );
      }

      throw error;
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

  private generatePatternBasedResponse(
    intent: QueryIntent,
    id: string,
    timestamp: Date
  ): ChatMessage {
    switch (intent.category) {
      case "performance":
        return this.generatePerformanceResponse(intent, id, timestamp);
      case "assets":
        return this.generateAssetsResponse(intent, id, timestamp);
      case "allocation":
        return this.generateAllocationResponse(intent, id, timestamp);
      case "general":
        return this.generateGeneralResponse(intent, id, timestamp);
      default:
        return {
          id,
          type: "assistant",
          content:
            "I can help you analyze your portfolio performance, view your assets, understand allocation, or answer general questions. What would you like to know?",
          timestamp,
        };
    }
  }

  private generatePerformanceResponse(
    intent: QueryIntent,
    id: string,
    timestamp: Date
  ): ChatMessage {
    const summary = mockPortfolioSummary;

    if (intent.timeframe === "day") {
      return {
        id,
        type: "assistant",
        content: `Your portfolio had a ${
          summary.dayChangePercent >= 0 ? "positive" : "negative"
        } day with a change of $${summary.dayChange.toLocaleString()} (${
          summary.dayChangePercent
        }%). ${
          summary.dayChangePercent >= 0
            ? "Nice gains today! 📈"
            : "A bit down today, but that's normal market movement. 📊"
        }`,
        timestamp,
      };
    }

    if (intent.timeframe === "week") {
      return {
        id,
        type: "assistant",
        content: `This week your portfolio ${
          summary.weekChangePercent >= 0 ? "gained" : "lost"
        } $${Math.abs(summary.weekChange).toLocaleString()} (${
          summary.weekChangePercent
        }%). ${
          summary.weekChangePercent >= 2
            ? "Great weekly performance! 🚀"
            : summary.weekChangePercent >= 0
            ? "Solid week overall! 📊"
            : "Weekly dip, but stay focused on long-term trends. 📉"
        }`,
        timestamp,
      };
    }

    if (intent.timeframe === "month") {
      return {
        id,
        type: "assistant",
        content: `Your monthly performance shows a ${
          summary.monthChangePercent >= 0 ? "gain" : "loss"
        } of $${Math.abs(summary.monthChange).toLocaleString()} (${
          summary.monthChangePercent
        }%). ${
          summary.monthChangePercent >= 5
            ? "Excellent monthly returns! 🎉"
            : summary.monthChangePercent >= 0
            ? "Positive monthly trend! 📈"
            : "Monthly pullback - consider this normal market volatility. 📊"
        }`,
        timestamp,
      };
    }

    // Overall performance
    return {
      id,
      type: "assistant",
      content: `Your portfolio is currently valued at $${summary.totalValue.toLocaleString()} with total unrealized P&L of $${summary.totalUnrealizedPnL.toLocaleString()} (${
        summary.totalUnrealizedPnLPercent
      }%). ${
        summary.totalUnrealizedPnLPercent >= 10
          ? "Outstanding overall performance! 🌟"
          : summary.totalUnrealizedPnLPercent >= 0
          ? "Your portfolio is in positive territory! 📊"
          : "Currently showing some unrealized losses, which is normal in volatile markets. 📉"
      }`,
      timestamp,
    };
  }

  private generateAssetsResponse(
    intent: QueryIntent,
    id: string,
    timestamp: Date
  ): ChatMessage {
    const assets = mockAssets;

    if (intent.specificAsset) {
      const asset = assets.find((a) =>
        a.symbol.toLowerCase().includes(intent.specificAsset!.toLowerCase())
      );

      if (asset) {
        return {
          id,
          type: "assistant",
          content: `${asset.symbol} (${asset.name}): You own ${
            asset.quantity
          } shares at $${asset.currentPrice} each. Current value: $${(
            asset.quantity * asset.currentPrice
          ).toLocaleString()} with P&L of $${asset.unrealizedPnL} (${
            asset.unrealizedPnLPercent
          }%). ${
            asset.unrealizedPnLPercent >= 5
              ? "Strong performer! 🚀"
              : asset.unrealizedPnLPercent >= 0
              ? "Looking good! 📈"
              : "Currently down, but holding steady. 📊"
          }`,
          timestamp,
        };
      } else {
        return {
          id,
          type: "assistant",
          content: `I don't see ${
            intent.specificAsset
          } in your current portfolio. Your holdings include: ${assets
            .map((a) => a.symbol)
            .join(", ")}.`,
          timestamp,
        };
      }
    }

    // General assets overview
    const topPerformer = assets.reduce((max, asset) =>
      asset.unrealizedPnLPercent > max.unrealizedPnLPercent ? asset : max
    );

    return {
      id,
      type: "assistant",
      content: `You hold ${assets.length} different positions. Your top performer is ${topPerformer.symbol} with a ${topPerformer.unrealizedPnLPercent}% gain ($${topPerformer.unrealizedPnL}). Your portfolio spans technology, finance, and cryptocurrency sectors. 📊`,
      timestamp,
    };
  }

  private generateAllocationResponse(
    intent: QueryIntent,
    id: string,
    timestamp: Date
  ): ChatMessage {
    return {
      id,
      type: "assistant",
      content: `Your portfolio allocation: 65.2% in individual stocks (like AAPL, GOOGL, TSLA), 15.6% in ETFs (SPY, VTI), 17.8% in cryptocurrency (BTC, ETH), and 1.4% in cash. You have a growth-focused allocation with good diversification across asset classes. 📊`,
      timestamp,
    };
  }

  private generateGeneralResponse(
    intent: QueryIntent,
    id: string,
    timestamp: Date
  ): ChatMessage {
    const responses = [
      "Your portfolio looks well-diversified across technology, finance, and crypto sectors. The mix of individual stocks and ETFs provides good balance. 📊",
      "I can help you analyze performance trends, review specific holdings, or break down your asset allocation. What interests you most? 🤔",
      "Your portfolio shows active management with positions in growth stocks, stable ETFs, and some cryptocurrency exposure. Nice diversification! 📈",
    ];

    return {
      id,
      type: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp,
    };
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
