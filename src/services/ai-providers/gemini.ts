/**
 * Google Gemini AI Provider
 */

import { AIProvider } from "./base";
import { QueryIntent } from "@/types";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  displayName = "Google Gemini";
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = "gemini-2.5-flash") {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    this.model = model;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async generateResponse(
    query: string,
    intent: QueryIntent,
    portfolioContext: string
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error("Gemini API key not configured");
    }

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({
        model: this.model,
      });

      const prompt = `
You are a professional AI portfolio assistant with deep expertise in both portfolio management and global market analysis.

📊 YOUR CLIENT'S PORTFOLIO:
${portfolioContext}

💬 CLIENT QUESTION: "${query}"

🎯 RESPONSE GUIDELINES:

**PORTFOLIO-SPECIFIC QUESTIONS** (when asking about "my TCS", "my holdings", "my performance"):
- Reference their actual position data above
- Use specific numbers from their portfolio
- Highlight their P&L, position size, and performance
- Example: "Your TCS position of 100 shares is up ₹88,230 (27.2%) - one of your top performers!"

**GENERAL MARKET QUESTIONS** (when asking about "TCS stock", "how is TCS performing"):
- Provide insightful market analysis
- Include recent trends, sector performance, key drivers
- Connect it to their portfolio if they hold the stock
- Example: "TCS has been performing well in the IT sector. You're well-positioned with your 100 shares showing strong gains!"

**MIXED QUESTIONS** (performance comparisons, investment ideas):
- Combine both portfolio data and market insights
- Show how their holdings relate to broader market trends
- Provide context for their positions

📈 TONE & FORMAT:
- Professional yet conversational and engaging
- Use relevant emojis for visual appeal
- Include specific numbers and percentages
- Keep responses 2-3 sentences but make them impactful
- Focus on insights that matter to portfolio performance

🔍 KEY INSIGHT: Always make the response valuable - either about their specific positions or actionable market intelligence.

Response:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text().trim();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("429") || errorMessage.includes("quota")) {
        throw new Error(
          "Gemini API quota exceeded. Please wait a few minutes and try again."
        );
      }

      if (errorMessage.includes("404") || errorMessage.includes("not found")) {
        throw new Error("Gemini model not available.");
      }

      throw error;
    }
  }
}
