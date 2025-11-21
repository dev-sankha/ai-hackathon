/**
 * Generic REST API Provider
 * Uses direct HTTP calls instead of SDK packages
 *
 * Example: Ollama, local AI servers, or any REST API endpoint
 * To use: Set NEXT_PUBLIC_REST_API_URL and optionally NEXT_PUBLIC_REST_API_KEY
 */

import { AIProvider } from "./base";
import { QueryIntent } from "@/types";

export class RestAPIProvider implements AIProvider {
  name = "rest-api";
  displayName = "REST API";
  private apiUrl: string;
  private apiKey: string;
  private model: string;

  constructor(
    apiUrl?: string,
    apiKey?: string,
    model: string = "llama2" // Default model name
  ) {
    this.apiUrl = apiUrl || process.env.NEXT_PUBLIC_REST_API_URL || "";
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_REST_API_KEY || "";
    this.model = model || process.env.NEXT_PUBLIC_REST_API_MODEL || "llama2";
  }

  isConfigured(): boolean {
    return !!this.apiUrl;
  }

  async generateResponse(
    query: string,
    intent: QueryIntent,
    portfolioContext: string
  ): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error("REST API URL not configured");
    }

    try {
      const prompt = `You are an AI portfolio assistant with expertise in both portfolio management and general market analysis.

PORTFOLIO CONTEXT:
${portfolioContext}

USER QUESTION: ${query}

SMART RESPONSE GUIDELINES:
- If the question is about "my [stock]" or specific holdings → Focus on their portfolio data
- If the question is about "[stock] stock" or general market topics → Use your market knowledge  
- If asking for investment advice → Provide both portfolio perspective AND general market insights
- Always be helpful and conversational
- Keep responses concise (2-3 sentences max)
- Provide descriptive analysis only (no specific investment advice)
- Use a friendly, professional tone

RESPONSE STRATEGY:
- For portfolio questions: Use the specific data above
- For market questions: Draw from your general financial knowledge
- For hybrid questions: Combine both perspectives clearly
- Always distinguish between "your position" vs "general market" when relevant

Response:`;

      // Prepare request headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add API key if provided
      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      // Make the API call
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 200,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();

      // Handle different response formats
      let content = "";

      // Ollama format
      if (data.response) {
        content = data.response;
      }
      // OpenAI-compatible format
      else if (data.choices && data.choices[0]?.message?.content) {
        content = data.choices[0].message.content;
      }
      // Generic text response
      else if (data.text) {
        content = data.text;
      }
      // Hugging Face format
      else if (data.generated_text) {
        content = data.generated_text;
      }
      // Array format (some APIs return arrays)
      else if (Array.isArray(data) && data[0]?.generated_text) {
        content = data[0].generated_text;
      }
      // Direct string response
      else if (typeof data === "string") {
        content = data;
      } else {
        throw new Error("Unexpected response format from API");
      }

      return (
        content.trim() || "I couldn't generate a response. Please try again."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("fetch")) {
        throw new Error(
          "Unable to connect to API endpoint. Check if the service is running."
        );
      }

      if (errorMessage.includes("401") || errorMessage.includes("403")) {
        throw new Error("API authentication failed. Check your API key.");
      }

      if (errorMessage.includes("429")) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }

      if (errorMessage.includes("500")) {
        throw new Error("API server error. Please try again.");
      }

      throw new Error(`API Error: ${errorMessage}`);
    }
  }
}

// Example configurations for popular services:

/**
 * OLLAMA (Local AI)
 * URL: http://localhost:11434/api/generate
 * Model: llama2, codellama, mistral, etc.
 *
 * NEXT_PUBLIC_REST_API_URL=http://localhost:11434/api/generate
 * NEXT_PUBLIC_REST_API_MODEL=llama2
 */

/**
 * HUGGING FACE INFERENCE API
 * URL: https://api-inference.huggingface.co/models/MODEL_NAME
 * Requires API key
 *
 * NEXT_PUBLIC_REST_API_URL=https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium
 * NEXT_PUBLIC_REST_API_KEY=hf_your_token_here
 */

/**
 * CUSTOM AI SERVER
 * Any server that accepts POST requests with prompt data
 *
 * NEXT_PUBLIC_REST_API_URL=https://your-ai-server.com/api/chat
 * NEXT_PUBLIC_REST_API_KEY=your_secret_key
 * NEXT_PUBLIC_REST_API_MODEL=your_model_name
 */
