'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Button } from '@/components/ui/Button';

export function ChatInterface() {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    isLoading,
    error,
    sendMessage,
    stopGeneration,
    clearChat,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    sendMessage(currentMessage);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recipe AI Assistant
          </h2>
          <p className="text-sm text-gray-600">
            Chat with AI to create your perfect recipe
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Creating Your Recipe
            </h3>
            <p className="text-gray-600 max-w-md">
              Tell me what kind of recipe you'd like to create. I can help with
              cuisine preferences, dietary restrictions, cooking skill level, and
              more!
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-gray-700">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() =>
                    sendMessage('I want to make a quick weeknight dinner')
                  }
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-700 rounded-full hover:bg-orange-100 transition-colors"
                >
                  Quick weeknight dinner
                </button>
                <button
                  onClick={() =>
                    sendMessage('Show me a vegetarian pasta recipe')
                  }
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-700 rounded-full hover:bg-orange-100 transition-colors"
                >
                  Vegetarian pasta
                </button>
                <button
                  onClick={() =>
                    sendMessage('I have chicken and need recipe ideas')
                  }
                  className="px-3 py-1 text-sm bg-orange-50 text-orange-700 rounded-full hover:bg-orange-100 transition-colors"
                >
                  Recipe with chicken
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {isLoading ? (
          <Button onClick={stopGeneration} variant="outline" className="w-full">
            Stop Generating
          </Button>
        ) : (
          <ChatInput
            value={currentMessage}
            onChange={setCurrentMessage}
            onSend={handleSend}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
}
