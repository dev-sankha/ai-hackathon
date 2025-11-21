# AI Provider Architecture

## Overview
The AI service now uses a flexible provider architecture that makes it easy to swap between different AI models.

## Current Providers

### 1. Pattern Matching (Default Fallback)
- **Status**: Always available
- **Setup**: None required
- **Cost**: Free
- **Use Case**: Fast, rule-based responses for demo/offline mode

### 2. Google Gemini (Default)
- **Status**: Active by default
- **Setup**: Add `NEXT_PUBLIC_GEMINI_API_KEY` to `.env.local`
- **Get API Key**: https://aistudio.google.com/app/apikey
- **Model**: `gemini-2.5-flash`
- **Cost**: Free tier available

### 3. OpenAI GPT
- **Status**: Optional
- **Setup**: 
  1. `npm install openai`
  2. Add `NEXT_PUBLIC_OPENAI_API_KEY` to `.env.local`
- **Get API Key**: https://platform.openai.com/api-keys
- **Model**: `gpt-4o-mini`
- **Cost**: Pay per use

### 4. Anthropic Claude
- **Status**: Optional
- **Setup**:
  1. `npm install @anthropic-ai/sdk`
  2. Add `NEXT_PUBLIC_ANTHROPIC_API_KEY` to `.env.local`
- **Get API Key**: https://console.anthropic.com/settings/keys
- **Model**: `claude-3-5-sonnet-20241022`
- **Cost**: Pay per use

## How to Add a New Provider

### Step 1: Create Provider File
Create a new file in `src/services/ai-providers/your-provider.ts`:

```typescript
import { AIProvider } from "./base";
import { QueryIntent } from "@/types";

export class YourProvider implements AIProvider {
  name = "your-provider";
  displayName = "Your Provider Name";
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_YOUR_API_KEY || "";
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async generateResponse(
    query: string,
    intent: QueryIntent,
    portfolioContext: string
  ): Promise<string> {
    // Your AI implementation here
    // Return the response string
  }
}
```

### Step 2: Register Provider
Add to `src/services/ai-providers/index.ts`:

```typescript
export { YourProvider } from "./your-provider";
```

### Step 3: Add to AIService
Update `src/services/aiService.ts`:

```typescript
import { YourProvider } from "./ai-providers";

const PROVIDERS: Record<string, AIProvider> = {
  // ... existing providers
  yourprovider: new YourProvider(),
};
```

### Step 4: Update Types
Update `src/services/aiService.ts`:

```typescript
export type AIMode = "pattern" | "gemini" | "openai" | "anthropic" | "yourprovider";
```

Update `src/context/AIContext.tsx`:

```typescript
export type AIMode = 'pattern' | 'gemini' | 'openai' | 'anthropic' | 'yourprovider';
```

Update `src/types/index.ts`:

```typescript
aiMode?: "pattern" | "gemini" | "openai" | "anthropic" | "yourprovider";
```

### Step 5: Update UI (Optional)
Update `src/components/AIModeToggle.tsx` to add your provider to the UI selector.

## Switching Providers Programmatically

```typescript
import { aiService } from "@/services/aiService";

// Switch to Gemini
aiService.setMode("gemini");

// Switch to OpenAI
aiService.setMode("openai");

// Switch to your custom provider
aiService.setMode("yourprovider");
```

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Google Gemini (Default)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here

# OpenAI (Optional)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here

# Anthropic (Optional)
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key_here

# Your custom provider (Optional)
NEXT_PUBLIC_YOUR_API_KEY=your_custom_key_here
```

## Architecture Benefits

1. **Easy Swapping**: Change providers with one line of code
2. **No Vendor Lock-in**: Switch between AI services anytime
3. **Cost Optimization**: Start with free tier, upgrade when needed
4. **Graceful Fallback**: Automatically falls back to pattern matching if a provider fails
5. **Extensible**: Add new providers without touching existing code
6. **Type Safe**: Full TypeScript support with proper interfaces

## Tomorrow's Changes Example

**Scenario**: Tomorrow you want to switch from Gemini to Claude.

```typescript
// In src/services/aiService.ts, change this line:
const DEFAULT_PROVIDER = "anthropic"; // was "gemini"
```

That's it! Just change one string and you're using a different AI model.
