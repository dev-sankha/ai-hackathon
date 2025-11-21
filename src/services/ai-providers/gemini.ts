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
You are an AI portfolio assistant. Analyze this portfolio and answer the user's question.

PORTFOLIO DATA:
${portfolioContext}

USER QUESTION: ${query}

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
