import { NextRequest } from 'next/server';
import { streamChat, ChatMessage, extractJSON } from '@/lib/gemini/client';
import { RECIPE_SYSTEM_PROMPT } from '@/lib/gemini/prompts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response('Invalid message', { status: 400 });
    }

    // Prepare history with system prompt
    const fullHistory: ChatMessage[] = [
      {
        role: 'assistant',
        content: RECIPE_SYSTEM_PROMPT,
      },
      ...history,
    ];

    // Create a readable stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = '';

          for await (const chunk of streamChat(message, fullHistory)) {
            fullResponse += chunk;

            // Send the chunk to the client
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)
            );
          }

          // Try to extract recipe JSON from the full response
          const recipeData = extractJSON(fullResponse);

          if (recipeData) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ recipe: recipeData })}\n\n`
              )
            );
          }

          // Signal completion
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Error streaming chat:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
