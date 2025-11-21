/**
 * Base interface for AI providers
 * Implement this interface to add new AI models
 */

import { ChatMessage, QueryIntent } from "@/types";

export interface AIProvider {
  name: string;
  displayName: string;
  generateResponse(
    query: string,
    intent: QueryIntent,
    portfolioContext: string
  ): Promise<string>;
  isConfigured(): boolean;
}

export interface AIProviderConfig {
  apiKey?: string;
  model?: string;
  [key: string]: any;
}
