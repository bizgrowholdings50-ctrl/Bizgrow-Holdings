import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const text = body?.text;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const keys = [
      process.env.ELEVENLABS_API_KEY_1,
      process.env.ELEVENLABS_API_KEY_2,
    ].filter(Boolean);

    if (keys.length === 0) {
      return NextResponse.json({ error: "No API keys configured" }, { status: 500 });
    }

    // Poora lamba text allow karne ke liye limit barha di hai
    const sanitizedText = text.trim().slice(0, 3000);
    const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah Voice (Free Plan Supported)

    let response = null;
    let lastErrorDetails = "";

    for (let i = 0; i < keys.length; i++) {
      const apiKey = keys[i];
      try {
        response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: "POST",
            headers: {
              "Accept": "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": apiKey,
            },
            body: JSON.stringify({
              text: sanitizedText,
              model_id: "eleven_flash_v2_5",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          }
        );

        if (response.ok) break;

        const errText = await response.text();
        lastErrorDetails = errText;
      } catch (fetchErr) {
        lastErrorDetails = fetchErr.message;
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: "All keys failed", details: lastErrorDetails },
        { status: 500 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();

    return new Response(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}