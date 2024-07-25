import { NextResponse } from "next/server";
import OpenAI from "openai";
import { writeFile } from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { prompt, model } = await req.json();

  try {
    const response = await openai.images.generate({
      model: model,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    // Fetch the image
    const imageRes = await fetch(imageUrl);
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the image
    const filename = `image_${Date.now()}.png`;
    const filepath = path.join(process.cwd(), "public", "generated", filename);
    await writeFile(filepath, buffer);

    // Return the local path
    return NextResponse.json({ imageUrl: `/generated/${filename}` });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the image." },
      { status: 500 }
    );
  }
}
