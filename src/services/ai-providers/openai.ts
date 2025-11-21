/**
 * OpenAI GPT Provider
 *
 * To use: Set NEXT_PUBLIC_OPENAI_API_KEY in .env.local
 * Install: npm install openai
 */

import { AIProvider } from "./base";
import { QueryIntent } from "@/types";

export class OpenAIProvider implements AIProvider {
  name = "openai";
  displayName = "OpenAI GPT";
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model: string = "gpt-4o-mini") {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
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
      throw new Error("OpenAI API key not configured");
    }

    try {
      // Dynamic import for OpenAI SDK
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true, // For client-side usage
      });

      const completion = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: `You are an AI portfolio assistant. Analyze portfolios and answer questions.

IMPORTANT GUIDELINES:
- Be helpful and conversational
- Use specific numbers from the portfolio data
- Provide descriptive analysis only (no investment advice)
- Keep responses concise (2-3 sentences max)
- Focus on factual performance metrics
- Use a friendly, professional tone`,
          },
          {
            role: "user",
            content: `PORTFOLIO DATA:\n${portfolioContext}\n\nUSER QUESTION: ${query}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      return (
        completion.choices[0]?.message?.content?.trim() ||
        "No response generated"
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("429") || errorMessage.includes("quota")) {
        throw new Error("OpenAI API rate limit exceeded.");
      }

      if (errorMessage.includes("401")) {
        throw new Error("OpenAI API key is invalid.");
      }

      throw error;
    }
  }
}
