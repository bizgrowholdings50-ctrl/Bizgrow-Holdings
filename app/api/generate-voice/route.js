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
      console.error("CRITICAL: No ElevenLabs API keys found in .env.local!");
      return NextResponse.json(
        { error: "No API keys configured on server" },
        { status: 500 }
      );
    }

    const sanitizedText = text.trim().slice(0, 3000);

    // FREE PLAN SAFE VOICE ID (Sarah - Natural & Energetic)
    const voiceId = "EXAVITQu4vr4xnSDxMaL"; 

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

        if (response.ok) {
          console.log(`ElevenLabs voice generated successfully using Key #${i + 1}`);
          break;
        }

        const errText = await response.text();
        console.warn(`ElevenLabs Key #${i + 1} failed with status ${response.status}:`, errText);
        lastErrorDetails = errText;
      } catch (fetchErr) {
        console.warn(`Network error with Key #${i + 1}:`, fetchErr.message);
        lastErrorDetails = fetchErr.message;
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: "All ElevenLabs API keys failed", details: lastErrorDetails },
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
    console.error("Fatal error in generate-voice route:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}