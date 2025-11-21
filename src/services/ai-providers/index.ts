/**
 * AI Provider Registry
 * Add new providers here to make them available
 */

export type { AIProvider, AIProviderConfig } from "./base";
export { GeminiProvider } from "./gemini";
export { OpenAIProvider } from "./openai";
export { PatternProvider } from "./pattern";
export { RestAPIProvider } from "./rest-api";
