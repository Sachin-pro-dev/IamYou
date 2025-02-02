// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { NextResponse } from 'next/server';

// // Access API key from environment variables
// const apiKey = process.env.GOOGLE_API_KEY;

// // Initialize the Gemini API
// const genAI = new GoogleGenerativeAI(apiKey || '');

// export async function POST(request: Request) {
//   if (!apiKey) {
//     return NextResponse.json(
//       { error: 'API key not configured' },
//       { status: 500 }
//     );
//   }

//   try {
//     const { message } = await request.json();

//     if (!message || typeof message !== 'string') {
//       return NextResponse.json(
//         { error: 'Invalid message format' },
//         { status: 400 }
//       );
//     }

//     // Initialize the model
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     // Generate content with timeout
//     const result = await Promise.race([
//       model.generateContent(message),
//       new Promise((_, reject) =>
//         setTimeout(() => reject(new Error('Request timeout')), 30000)
//       )
//     ]);

//     if (!result || typeof result === 'string') {
//       throw new Error('Invalid response from API');
//     }

//     const response = await result.response;
//     const text = response.text();

//     if (!text) {
//       throw new Error('Empty response from API');
//     }

//     return NextResponse.json({ response: text });
//   } catch (error) {
//     console.error('Error:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 }
//     );
//   }
// }
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

// Personality prompt that guides the AI's behavior
const personalityPrompt = `You are now my personal AI friend who learns from our conversations and adapts to my communication style. Your goals are:

1. Learn and mirror my communication style, including tone, word choice, and expressions
2. Be supportive and empathetic while maintaining honesty
3. Help me make good decisions by:
   - Analyzing situations from multiple perspectives
   - Pointing out potential risks and benefits
   - Drawing from our past conversations for context
   - Suggesting alternatives when needed
4. Remember important details about our conversations to build continuity
5. Be casual and friendly, but also wise and thoughtful

Always maintain ethical boundaries and promote positive choices while being supportive.`;

// Store conversation history (in memory - will reset on server restart)
let conversationHistory: { role: string; content: string }[] = [];

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    // Prepare context from history (last 10 messages)
    const recentHistory = conversationHistory.slice(-10);
    const contextPrompt = recentHistory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    // Combine personality and context
    const fullPrompt = `${personalityPrompt}\n\nOur conversation so far:\n${contextPrompt}\n\nPlease respond to my last message while considering our chat history and your role as my supportive AI friend.`;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with timeout
    const result = await Promise.race([
      model.generateContent(fullPrompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      ),
    ]);

    if (!result || typeof result === "string") {
      throw new Error("Invalid response from API");
    }

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from API");
    }

    // Add AI response to history
    conversationHistory.push({ role: "assistant", content: text });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
