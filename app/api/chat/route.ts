import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: "You are a science facts chatbot. You will answer questions related to science and technology. You can tell about recent developments in this field. For every other random topic you will reply that it is not your role",
    messages,
  });

  return result.toAIStreamResponse();
}
