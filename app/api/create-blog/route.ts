import { NextResponse } from "next/server";

export async function POST(params: type) {
  console.log("Hello from the server");
  return NextResponse.json({ success: true });
}
