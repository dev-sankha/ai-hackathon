/**
 * Pattern Matching Provider (Fallback/Demo)
 * Rules-based responses without external API calls
 */

import { AIProvider } from "./base";
import { QueryIntent } from "@/types";
import { mockPortfolioSummary, mockAssets } from "@/data/mockPortfolio";

export class PatternProvider implements AIProvider {
  name = "pattern";
  displayName = "Pattern Matching";

  isConfigured(): boolean {
    return true; // Always available
  }

  async generateResponse(
    query: string,
    intent: QueryIntent,
    portfolioContext: string
  ): Promise<string> {
    // Pattern-based logic
    const summary = mockPortfolioSummary;
    const assets = mockAssets;

    switch (intent.category) {
      case "performance":
        return this.generatePerformanceResponse(intent, summary);
      case "assets":
        return this.generateAssetsResponse(intent, assets);
      case "allocation":
        return this.generateAllocationResponse();
      case "general":
      default:
        return this.generateGeneralResponse();
    }
  }

  private generatePerformanceResponse(
    intent: QueryIntent,
    summary: typeof mockPortfolioSummary
  ): string {
    if (intent.timeframe === "day") {
      return `Your portfolio had a ${
        summary.dayChangePercent >= 0 ? "positive" : "negative"
      } day with a change of $${summary.dayChange.toLocaleString()} (${
        summary.dayChangePercent
      }%). ${
        summary.dayChangePercent >= 0
          ? "Nice gains today! 📈"
          : "A bit down today, but that's normal market movement. 📊"
      }`;
    }

    if (intent.timeframe === "week") {
      return `This week your portfolio ${
        summary.weekChangePercent >= 0 ? "gained" : "lost"
      } $${Math.abs(summary.weekChange).toLocaleString()} (${
        summary.weekChangePercent
      }%). ${
        summary.weekChangePercent >= 2
          ? "Great weekly performance! 🚀"
          : summary.weekChangePercent >= 0
          ? "Solid week overall! 📊"
          : "Weekly dip, but stay focused on long-term trends. 📉"
      }`;
    }

    if (intent.timeframe === "month") {
      return `Your monthly performance shows a ${
        summary.monthChangePercent >= 0 ? "gain" : "loss"
      } of $${Math.abs(summary.monthChange).toLocaleString()} (${
        summary.monthChangePercent
      }%). ${
        summary.monthChangePercent >= 5
          ? "Excellent monthly returns! 🎉"
          : summary.monthChangePercent >= 0
          ? "Positive monthly trend! 📈"
          : "Monthly pullback - consider this normal market volatility. 📊"
      }`;
    }

    return `Your portfolio is currently valued at $${summary.totalValue.toLocaleString()} with total unrealized P&L of $${summary.totalUnrealizedPnL.toLocaleString()} (${
      summary.totalUnrealizedPnLPercent
    }%). ${
      summary.totalUnrealizedPnLPercent >= 10
        ? "Outstanding overall performance! 🌟"
        : summary.totalUnrealizedPnLPercent >= 0
        ? "Your portfolio is in positive territory! 📊"
        : "Currently showing some unrealized losses, which is normal in volatile markets. 📉"
    }`;
  }

  private generateAssetsResponse(
    intent: QueryIntent,
    assets: typeof mockAssets
  ): string {
    if (intent.specificAsset) {
      const asset = assets.find((a) =>
        a.symbol.toLowerCase().includes(intent.specificAsset!.toLowerCase())
      );

      if (asset) {
        return `${asset.symbol} (${asset.name}): You own ${
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
        }`;
      } else {
        return `I don't see ${
          intent.specificAsset
        } in your current portfolio. Your holdings include: ${assets
          .map((a) => a.symbol)
          .join(", ")}.`;
      }
    }

    const topPerformer = assets.reduce((max, asset) =>
      asset.unrealizedPnLPercent > max.unrealizedPnLPercent ? asset : max
    );

    return `You hold ${assets.length} different positions. Your top performer is ${topPerformer.symbol} with a ${topPerformer.unrealizedPnLPercent}% gain ($${topPerformer.unrealizedPnL}). Your portfolio spans technology, finance, and cryptocurrency sectors. 📊`;
  }

  private generateAllocationResponse(): string {
    return `Your portfolio allocation: 65.2% in individual stocks (like AAPL, GOOGL, TSLA), 15.6% in ETFs (SPY, VTI), 17.8% in cryptocurrency (BTC, ETH), and 1.4% in cash. You have a growth-focused allocation with good diversification across asset classes. 📊`;
  }

  private generateGeneralResponse(): string {
    const responses = [
      "Your portfolio looks well-diversified across technology, finance, and crypto sectors. The mix of individual stocks and ETFs provides good balance. 📊",
      "I can help you analyze performance trends, review specific holdings, or break down your asset allocation. What interests you most? 🤔",
      "Your portfolio shows active management with positions in growth stocks, stable ETFs, and some cryptocurrency exposure. Nice diversification! 📈",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
