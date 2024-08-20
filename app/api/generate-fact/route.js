import { NextResponse } from "next/server";
import axios from "axios";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

export async function POST(req) {
  const { word, context } = await req.json();

  try {
    const claudeResponse = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Generate a brief, interesting fact about the word "${word}" in the context of the following paragraph: "${context}". The fact should be related to the overall theme or subject of the paragraph. Keep the response concise, ideally under 50 words. Start the fact normally, without announcing its an "interesting fact"`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicApiKey,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const fact = claudeResponse.data.content[0].text;

    return NextResponse.json({ fact });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the fact." },
      { status: 500 }
    );
  }
}
