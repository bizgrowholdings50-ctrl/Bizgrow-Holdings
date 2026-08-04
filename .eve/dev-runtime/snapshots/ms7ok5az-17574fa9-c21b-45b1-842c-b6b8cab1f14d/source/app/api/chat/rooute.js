import { agent } from "@/agent"; // Aapke project ke structure ke mutabiq import
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    
    // Agent ko message bhej kar response lena
    const response = await agent.chat(message);

    return NextResponse.json({ reply: response });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}