import { GoogleGenerativeAI } from '@google/generative-ai';
import { RECIPE_SYSTEM_PROMPT } from './prompts';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Gemini Pro for recipe generation
// Note: systemInstruction not supported in v1beta, will prepend to first message instead
export const recipeModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    maxOutputTokens: 8192,
  },
});

// Gemini 1.5 Flash for quick tasks
export const flashModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    maxOutputTokens: 2048,
  },
});

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

/**
 * Start a chat session with Gemini
 */
export async function startChatSession(history: ChatMessage[] = []) {
  const chat = recipeModel.startChat({
    history: history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
  });

  return chat;
}

/**
 * Stream a response from Gemini
 */
export async function* streamChat(
  message: string,
  history: ChatMessage[] = []
): AsyncGenerator<string> {
  const chat = await startChatSession(history);

  // Prepend system prompt to first message if no history
  const finalMessage = history.length === 0
    ? `${RECIPE_SYSTEM_PROMPT}\n\nUser: ${message}`
    : message;

  const result = await chat.sendMessageStream(finalMessage);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}

/**
 * Get a complete response from Gemini (non-streaming)
 */
export async function chatWithGemini(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const chat = await startChatSession(history);
  const result = await chat.sendMessage(message);
  return result.response.text();
}

/**
 * Extract JSON from a text response
 * Looks for JSON between ```json and ``` markers or just raw JSON
 */
export function extractJSON<T = any>(text: string): T | null {
  try {
    // Try to find JSON in code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // Try to find raw JSON object
    const objectMatch = text.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      return JSON.parse(objectMatch[0]);
    }

    return null;
  } catch (error) {
    console.error('Failed to extract JSON from text:', error);
    return null;
  }
}
