import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key missing in environment variables" }, { status: 500 });
    }

    // Professional British Male Voice ID (George / Brian)
    const voiceId = "Xb7hH8MSUJpSbSDYk0k2"; 

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream/with-timestamps?optimize_streaming_latency=3`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.8
        }
      }),
      signal: req.signal
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    if (!response.body) {
      return NextResponse.json({ error: "ElevenLabs returned an empty audio response" }, { status: 502 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/x-ndjson",
        "Cache-Control": "no-store"
      }
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}