'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type AIMode = 'pattern' | 'gemini';

interface AIContextType {
  aiMode: AIMode;
  setAIMode: (mode: AIMode) => void;
  isGeminiConfigured: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [aiMode, setAIMode] = useState<AIMode>(
    (process.env.NEXT_PUBLIC_AI_MODE as AIMode) || 'pattern'
  );
  
  const isGeminiConfigured = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  return (
    <AIContext.Provider value={{ aiMode, setAIMode, isGeminiConfigured }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}