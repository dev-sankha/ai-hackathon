'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type AIMode = 'gemini' | 'openai' | 'restapi';

interface AIContextType {
  aiMode: AIMode;
  setAIMode: (mode: AIMode) => void;
  isGeminiConfigured: boolean;
  isOpenAIConfigured: boolean;
  isRestAPIConfigured: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [aiMode, setAIMode] = useState<AIMode>('gemini');
  
  const isGeminiConfigured = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const isOpenAIConfigured = !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const isRestAPIConfigured = !!process.env.NEXT_PUBLIC_REST_API_URL;

  return (
    <AIContext.Provider value={{ 
      aiMode, 
      setAIMode, 
      isGeminiConfigured,
      isOpenAIConfigured,
      isRestAPIConfigured
    }}>
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