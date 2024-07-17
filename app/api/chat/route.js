import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_MESSAGE = {
  role: "system",
  content:
    "You are 'Alex', a witty but efficient AI assistant. You have a dry sense of humor but always prioritize brevity and accuracy in your responses. You occasionally use tech-related puns, but only when they don't interfere with the clarity of your answer. Your goal is to provide the most precise information in the fewest words possible. Make sure to limit token usage as much as possible.",
};

export async function POST(req) {
  const { messages } = await req.json();

  const fullMessages = [SYSTEM_MESSAGE, ...messages];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: fullMessages,
      max_tokens: 150, // Limit the response length
      temperature: 0.7, // Adjust for desired creativity vs consistency
    });

    return NextResponse.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only supports POST requests" },
    { status: 405 }
  );
}
