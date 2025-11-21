'use client';

import { useState } from 'react';
import { AIProvider } from '@/context/AIContext';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import ChatInterface from '@/components/ChatInterface';
import AIModeToggle from '@/components/AIModeToggle';
import { BarChart3, MessageCircle } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');

  return (
    <AIProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    AI Portfolio Assistant
                  </h1>
                  <p className="text-sm text-gray-600">
                    Your intelligent asset performance companion
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* AI Mode Toggle - only show in chat view */}
                {activeView === 'chat' && <AIModeToggle />}
                
                <nav className="flex gap-2">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                      activeView === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveView('chat')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                      activeView === 'chat'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    AI Assistant
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {activeView === 'dashboard' ? (
            <PortfolioDashboard />
          ) : (
            <div className="h-[calc(100vh-4rem)]">
              <ChatInterface />
            </div>
          )}
        </main>
      </div>
    </AIProvider>
  );
}
