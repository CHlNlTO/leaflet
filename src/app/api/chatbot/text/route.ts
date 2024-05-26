import { chatBotInstruction } from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(request: NextRequest) {
  const prompt = await request.json();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: chatBotInstruction,
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return NextResponse.json(text);
}
