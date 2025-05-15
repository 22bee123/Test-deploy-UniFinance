import { useState } from 'react';
import { generateAIResponse, generateChatResponse, ChatMessage } from '../lib/ai/ai.service';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to generate a single AI response
  const getAIResponse = async (prompt: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await generateAIResponse(prompt);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI response';
      setError(errorMessage);
      return { 
        success: false, 
        data: `Error: ${errorMessage}` 
      };
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a chat response with conversation history
  const getChatResponse = async (messages: ChatMessage[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await generateChatResponse(messages);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get chat response';
      setError(errorMessage);
      return { 
        success: false, 
        data: `Error: ${errorMessage}` 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    getAIResponse,
    getChatResponse,
    loading,
    error
  };
};

export default useAI;
