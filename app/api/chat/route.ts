import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();

  // Verify user is authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // If chatId provided, verify user owns this chat
  if (chatId) {
    const { data: chat } = await supabase
      .from("chats")
      .select("id")
      .eq("id", chatId)
      .eq("user_id", user.id)
      .single();

    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }
  }

  const result = await streamText({
    model: google("gemini-3-pro-preview"),
    messages,
  });

  return result.toTextStreamResponse();
}
