'use client';

import { useState } from 'react';
import { Bot, Info } from 'lucide-react';
import { useAI, AIMode } from '@/context/AIContext';

export default function AIModeToggle() {
  const { 
    aiMode, 
    setAIMode, 
    isGeminiConfigured,
    isOpenAIConfigured,
    isRestAPIConfigured
  } = useAI();
  const [showInfo, setShowInfo] = useState(false);

  const providers = [
    { 
      id: 'pattern' as AIMode, 
      name: 'Pattern', 
      fullName: 'Pattern Matching',
      configured: true,
      color: 'blue'
    },
    { 
      id: 'gemini' as AIMode, 
      name: 'Gemini', 
      fullName: 'Google Gemini',
      configured: isGeminiConfigured,
      color: 'green'
    },
    { 
      id: 'openai' as AIMode, 
      name: 'GPT', 
      fullName: 'OpenAI GPT',
      configured: isOpenAIConfigured,
      color: 'purple'
    },
    { 
      id: 'restapi' as AIMode, 
      name: 'REST API', 
      fullName: 'REST API (Ollama/Custom)',
      configured: isRestAPIConfigured,
      color: 'indigo'
    },
  ];

  const handleModeChange = (mode: AIMode) => {
    const provider = providers.find(p => p.id === mode);
    if (!provider?.configured) {
      setShowInfo(true);
      return;
    }
    setAIMode(mode);
  };

  const currentProvider = providers.find(p => p.id === aiMode);

  return (
    <div className="relative">
      {/* AI Mode Selector */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
        <Bot className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">AI Provider:</span>
        
        {/* Provider Buttons */}
        <div className="flex items-center gap-2">
          {providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleModeChange(provider.id)}
              disabled={!provider.configured}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                aiMode === provider.id
                  ? `bg-${provider.color}-600 text-white shadow-sm`
                  : provider.configured
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
              title={provider.configured ? provider.fullName : `${provider.fullName} (Setup Required)`}
            >
              {provider.name}
              {!provider.configured && (
                <span className="ml-1 text-[10px]">⚠️</span>
              )}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors ml-auto"
          title="Setup Information"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border z-10 max-w-2xl">
          <h4 className="font-medium text-gray-900 mb-3">AI Provider Setup</h4>
          
          <div className="space-y-4 text-sm">
            {/* Pattern Matching */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="font-medium">Pattern Matching</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">READY</span>
              </div>
              <p className="text-gray-600 text-xs pl-5">
                Rule-based responses. Always available, no setup needed.
              </p>
            </div>
            
            {/* Google Gemini */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span className="font-medium">Google Gemini</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  isGeminiConfigured 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {isGeminiConfigured ? 'CONFIGURED' : 'SETUP REQUIRED'}
                </span>
              </div>
              <p className="text-gray-600 text-xs pl-5 mb-1">
                Advanced AI with natural language understanding.
              </p>
              {!isGeminiConfigured && (
                <div className="pl-5 text-xs text-gray-500 font-mono">
                  NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
                </div>
              )}
            </div>

            {/* OpenAI GPT */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span className="font-medium">OpenAI GPT</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  isOpenAIConfigured 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {isOpenAIConfigured ? 'CONFIGURED' : 'SETUP REQUIRED'}
                </span>
              </div>
              <p className="text-gray-600 text-xs pl-5 mb-1">
                ChatGPT-powered responses with strong reasoning.
              </p>
              {!isOpenAIConfigured && (
                <div className="pl-5 space-y-1">
                  <div className="text-xs text-gray-500 font-mono">
                    NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
                  </div>
                  <div className="text-xs text-gray-500">
                    Install: <code className="bg-gray-100 px-1 rounded">npm install openai</code>
                  </div>
                </div>
              )}
            </div>

            {/* REST API */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span className="font-medium">REST API</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  isRestAPIConfigured 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {isRestAPIConfigured ? 'CONFIGURED' : 'SETUP REQUIRED'}
                </span>
              </div>
              <p className="text-gray-600 text-xs pl-5 mb-1">
                Direct API calls to Ollama, custom servers, or any REST endpoint.
              </p>
              {!isRestAPIConfigured && (
                <div className="pl-5 space-y-1">
                  <div className="text-xs text-gray-500 font-mono">
                    NEXT_PUBLIC_REST_API_URL=http://localhost:11434/api/generate
                  </div>
                  <div className="text-xs text-gray-500">
                    Examples: Ollama, Hugging Face, custom AI servers
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-gray-600">
            <strong>Quick Setup:</strong> Add API keys to <code className="bg-white px-1 rounded">.env.local</code> and restart dev server
          </div>
          
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}