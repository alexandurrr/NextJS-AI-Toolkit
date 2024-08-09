import { NextResponse } from "next/server";
import axios from "axios";
import { Resemble } from "@resemble/node";

// Anthropic API configuration
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

// Resemble AI configuration
const resembleAIApiKey = process.env.RESEMBLE_API_KEY;
const resembleAIProjectId = process.env.RESEMBLE_PROJECT_UUID;
const resembleAIVoiceId = process.env.RESEMBLE_VOICE_UUID;

// Initialize Resemble client
Resemble.setApiKey(resembleAIApiKey);

export async function POST(req) {
  const { text } = await req.json();

  try {
    // Step 1: Get response from Claude
    const claudeResponse = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        messages: [{ role: "user", content: text }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicApiKey,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    const claudeTextResponse = claudeResponse.data.content[0].text;

    // Step 2: Generate audio using Resemble AI
    const clip = await Resemble.v2.clips.createSync(resembleAIProjectId, {
      body: claudeTextResponse,
      voice_uuid: resembleAIVoiceId,
      output_format: "mp3",
    });

    // Step 3: Return the response data
    return NextResponse.json({
      textResponse: claudeTextResponse,
      audioUrl: clip.item.audio_src,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
