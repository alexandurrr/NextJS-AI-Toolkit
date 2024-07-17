import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { query } = await req.json();

  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that provides location information. Always respond with a JSON object containing 'name', 'latitude', and 'longitude'",
    },
    { role: "user", content: `Provide the location information for: ${query}` },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: messages,
      max_tokens: 200,
      temperature: 0,
    });

    const content = response.choices[0].message.content;
    const locationData = JSON.parse(content);
    console.log(locationData);

    return NextResponse.json(locationData);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
