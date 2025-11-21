'use client';

import { useState } from 'react';
import { Bot, Settings, Info } from 'lucide-react';
import { useAI, AIMode } from '@/context/AIContext';

export default function AIModeToggle() {
  const { aiMode, setAIMode, isGeminiConfigured } = useAI();
  const [showInfo, setShowInfo] = useState(false);

  const handleModeChange = (mode: AIMode) => {
    if (mode === 'gemini' && !isGeminiConfigured) {
      setShowInfo(true);
      return;
    }
    setAIMode(mode);
  };

  return (
    <div className="relative">
      {/* AI Mode Toggle */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
        <Bot className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">AI Mode:</span>
        
        {/* Switch Toggle */}
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium transition-colors ${
            aiMode === 'pattern' ? 'text-blue-600' : 'text-gray-500'
          }`}>
            Pattern Match
          </span>
          
          <button
            onClick={() => handleModeChange(aiMode === 'pattern' ? 'gemini' : 'pattern')}
            disabled={aiMode === 'gemini' && !isGeminiConfigured}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              aiMode === 'gemini' && isGeminiConfigured
                ? 'bg-green-600' 
                : aiMode === 'gemini' && !isGeminiConfigured
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600'
            }`}
            aria-label="Toggle AI Mode"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                aiMode === 'gemini' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          
          <span className={`text-xs font-medium transition-colors ${
            aiMode === 'gemini' ? 'text-green-600' : 'text-gray-500'
          }`}>
            Google Gemini
            {aiMode === 'gemini' && !isGeminiConfigured && (
              <span className="text-gray-400 ml-1">(Setup Required)</span>
            )}
          </span>
        </div>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          title="AI Mode Information"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-10">
          <h4 className="font-medium text-gray-900 mb-2">AI Modes Explained</h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="font-medium">Pattern Matching</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">FREE</span>
              </div>
              <p className="text-gray-600 pl-5">
                Fast, rule-based responses using predefined patterns. 
                Instant results, works offline, no API costs.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span className="font-medium">Google Gemini</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">FREE TIER</span>
              </div>
              <p className="text-gray-600 pl-5">
                Real AI with natural language understanding. 
                More flexible responses, contextual analysis.
              </p>
              {!isGeminiConfigured && (
                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                  <p className="font-medium text-yellow-800">Setup Required:</p>
                  <p className="text-yellow-700">
                    1. Get free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a><br/>
                    2. Add NEXT_PUBLIC_GEMINI_API_KEY to .env.local<br/>
                    3. Restart the development server
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}