// Get the API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Log if we're using the API key (without exposing the key itself)
console.log('Using Gemini API key:', GEMINI_API_KEY ? 'Yes (key available)' : 'No (key not available)');


// Gemini API URL
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent';

// Model configuration
const MODEL_CONFIG = {
  temperature: 0.7,
  maxOutputTokens: 800,
  topP: 0.95,
  topK: 40,
};

// Message type definition
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// Fallback response when API is unavailable
const getFallbackResponse = (query: string): string => {
  return `I apologize, but I'm currently experiencing connectivity issues with my AI service. Here are some general financial tips that might be helpful:

## Financial Best Practices

* **Budget carefully**: Track your income and expenses
* **Save regularly**: Aim to save at least 20% of your income
* **Reduce debt**: Prioritize paying off high-interest debt
* **Emergency fund**: Build a fund covering 3-6 months of expenses
* **Invest wisely**: Consider diversifying your investments

Please try again later when the service is back online. Your specific query was about: "${query}"`;
};

// The system prompt for financial assistance
const SYSTEM_PROMPT = `You are a financial assistant for Unifinance UK Spark. Your goal is to provide helpful, accurate financial advice and information. Focus on personal finance, investments, savings, budgeting, and financial planning. Always be professional and avoid giving specific investment recommendations that could be construed as financial advice.

Format your responses in a clear, structured way:
1. Use markdown formatting for better readability
2. Use bullet points or numbered lists for steps or options
3. Use headings (## or ###) to organize different sections
4. Bold important information using **text**
5. If providing numerical data, use tables where appropriate
6. Always end with a brief, encouraging conclusion`;

// Generate AI response based on user prompt
export const generateAIResponse = async (prompt: string): Promise<{ 
  success: boolean; 
  data: string; 
  fallback?: boolean 
}> => {
  try {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set, using fallback response');
      return { 
        success: true, 
        data: getFallbackResponse(prompt),
        fallback: true
      };
    }

    try {
      // Prepare the request payload
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: MODEL_CONFIG
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Parse the response
      const data = await response.json();
      const text = data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
      
      return { success: true, data: text };
    } catch (apiError) {
      // If there's an API error, use the fallback response
      console.error('Gemini API error, using fallback response:', apiError);
      return { 
        success: true, 
        data: getFallbackResponse(prompt),
        fallback: true
      };
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    // Return a generic fallback response in case of any error
    return { 
      success: true, 
      data: getFallbackResponse(prompt || 'general financial advice'),
      fallback: true
    };
  }
};

// Generate chat response for ongoing conversations
export const generateChatResponse = async (messages: ChatMessage[]): Promise<{ 
  success: boolean; 
  data: string; 
  fallback?: boolean 
}> => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Valid message history is required');
    }

    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set, using fallback response');
      const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
      const query = lastUserMessage ? lastUserMessage.content : 'general financial advice';
      return { 
        success: true, 
        data: getFallbackResponse(query),
        fallback: true
      };
    }

    try {
      // Convert our ChatMessage format to the format expected by the API
      const apiMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const contentsWithSystemPrompt = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        ...apiMessages
      ];
      
      // Prepare the request payload
      const payload = {
        contents: contentsWithSystemPrompt,
        generationConfig: MODEL_CONFIG
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Parse the response
      const data = await response.json();
      const text = data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
      
      return { success: true, data: text };
    } catch (apiError) {
      // If there's an API error, use the fallback response
      console.error('Gemini API error, using fallback response:', apiError);
      const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
      const query = lastUserMessage ? lastUserMessage.content : 'general financial advice';
      return { 
        success: true, 
        data: getFallbackResponse(query),
        fallback: true
      };
    }
  } catch (error) {
    console.error('Error generating chat response:', error);
    // Return a generic fallback response in case of any error
    const lastUserMessage = messages?.filter(msg => msg.role === 'user').pop();
    const query = lastUserMessage ? lastUserMessage.content : 'general financial advice';
    return { 
      success: true, 
      data: getFallbackResponse(query),
      fallback: true
    };
  }
};
