import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userMessage, assistantMessage } = await req.json();

  // Create chat with title from first message (truncated)
  const title = userMessage.slice(0, 50) + (userMessage.length > 50 ? "..." : "");

  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .insert({ user_id: user.id, title })
    .select()
    .single();

  if (chatError) {
    return NextResponse.json({ error: chatError.message }, { status: 500 });
  }

  // Save both messages
  const { error: messagesError } = await supabase.from("messages").insert([
    { chat_id: chat.id, role: "user", content: userMessage },
    { chat_id: chat.id, role: "assistant", content: assistantMessage },
  ]);

  if (messagesError) {
    return NextResponse.json({ error: messagesError.message }, { status: 500 });
  }

  return NextResponse.json({ chatId: chat.id });
}
