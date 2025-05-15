import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAI } from '../../hooks/useAI';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isFallback?: boolean;
}

const AIGrantAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use our custom AI hook
  const { getChatResponse, loading: isLoading } = useAI();
  
  // Add a welcome message when the component mounts
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'model',
        content: '## Welcome to Unifinance UK Spark Financial Assistant! 👋\n\nI\'m here to help you with:\n\n* **Financial planning** and budgeting\n* **Investment** information and strategies\n* **Savings** tips and recommendations\n* **Grant** opportunities and applications\n* **General financial education** and advice\n\nHow can I assist with your financial needs today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      // Format messages for the AI service
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      messageHistory.push({
        role: 'user',
        content: input
      });
      
      // Use our direct AI service instead of making an HTTP request
      const response = await getChatResponse(messageHistory);
      
      // Check if this is a fallback response
      const isFallback = response.fallback === true;
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'model',
        content: response.data,
        timestamp: new Date(),
        isFallback: isFallback
      };
      
      // If it's a fallback response, also show a notification
      if (isFallback) {
        console.warn('Using fallback response due to API unavailability');
      }
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] bg-background rounded-lg overflow-hidden border border-border">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-card">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Financial Assistant</h2>
          <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-background">
        <div className="space-y-4 pb-2">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground'}`}
              >
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="markdown-content prose dark:prose-invert prose-sm max-w-none overflow-auto">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                    <style dangerouslySetInnerHTML={{ __html: `
                      .markdown-content h1 { font-size: 1.5rem; margin-top: 0.5rem; margin-bottom: 0.5rem; font-weight: 600; }
                      .markdown-content h2 { font-size: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; font-weight: 600; }
                      .markdown-content h3 { font-size: 1.125rem; margin-top: 0.5rem; margin-bottom: 0.5rem; font-weight: 600; }
                      .markdown-content ul, .markdown-content ol { margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem; }
                      .markdown-content li { margin-bottom: 0.25rem; }
                      .markdown-content p { margin-top: 0.5rem; margin-bottom: 0.5rem; }
                      .markdown-content table { border-collapse: collapse; margin: 0.5rem 0; width: 100%; }
                      .markdown-content th, .markdown-content td { border: 1px solid #e2e8f0; padding: 0.25rem 0.5rem; text-align: left; }
                      .markdown-content th { background-color: #f1f5f9; }
                      .markdown-content code { background-color: rgba(0, 0, 0, 0.05); padding: 0.1rem 0.2rem; border-radius: 0.2rem; font-size: 0.875em; }
                      .markdown-content pre { background-color: rgba(0, 0, 0, 0.05); padding: 0.5rem; border-radius: 0.2rem; overflow-x: auto; margin: 0.5rem 0; }
                      .markdown-content pre code { background-color: transparent; padding: 0; }
                      .markdown-content blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; margin: 0.5rem 0; color: #64748b; }
                      .markdown-content a { color: #3b82f6; text-decoration: underline; }
                      .markdown-content strong { font-weight: 600; }
                      .markdown-content em { font-style: italic; }
                      .dark .markdown-content th { background-color: #334155; }
                      .dark .markdown-content code { background-color: rgba(255, 255, 255, 0.1); }
                      .dark .markdown-content pre { background-color: rgba(255, 255, 255, 0.1); }
                      .dark .markdown-content blockquote { border-left-color: #475569; color: #94a3b8; }
                      .dark .markdown-content a { color: #60a5fa; }
                    ` }} />
                  </div>
                )}
                <div className="flex justify-between items-center mt-1">
                  <div className={`text-xs ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {message.isFallback && (
                    <div className="text-xs bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 px-2 py-0.5 rounded-full flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Offline Mode</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full p-3 pr-10 rounded-lg border border-input bg-background text-foreground resize-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              placeholder="Ask about financial assistance, grants, or budgeting..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ minHeight: '60px', maxHeight: '120px' }}
            />
          </div>
          <button
            className={`p-3 rounded-full ${isLoading || input.trim() === '' 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Ask me about financial planning, budgeting, grants, or any financial questions you have.
        </div>
      </div>
    </div>
  );
};

export default AIGrantAssistant;
