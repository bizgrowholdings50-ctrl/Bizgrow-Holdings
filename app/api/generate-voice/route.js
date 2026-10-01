import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export const runtime = "nodejs";

const escapeXml = (text) =>
  text.replace(/[&<>"']/g, (character) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    })[character],
  );

export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Text is required",
        },
        { status: 400 }
      );
    }

    console.log("Generating voice for:", text.slice(0, 100));

    const tts = new MsEdgeTTS();

    await tts.setMetadata(
      "en-GB-RyanNeural",
      OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3
    );

    const { audioStream } = tts.toStream(escapeXml(text));

    audioStream.once("close", () => tts.close());

    return new Response(Readable.toWeb(audioStream), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Voice generation error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Voice generation failed",
      },
      { status: 500 }
    );
  }
}