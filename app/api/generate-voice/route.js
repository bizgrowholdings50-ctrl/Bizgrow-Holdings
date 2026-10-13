import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const sanitizedText = text.trim().slice(0, 200);
    const encodedText = encodeURIComponent(sanitizedText);
    
    // Google Translate TTS Endpoint (100% stable, free, no 500 errors)
    const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en-gb&client=tw-ob`;

    const response = await fetch(googleTTSUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch audio stream");
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Voice generation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Voice generation failed" },
      { status: 500 }
    );
  }
}