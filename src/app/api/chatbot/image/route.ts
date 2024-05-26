import { chatBotInstruction } from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(request: NextRequest) {
  const { text, image } = await request.json();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: chatBotInstruction,
  });

  const photo = {
    inlineData: {
      data: image.data,
      mimeType: image.mimeType,
    },
  };

  const result = await model.generateContent([text, photo]);
  const response = await result.response;
  const answer = response.text();
  return NextResponse.json(answer);
}
