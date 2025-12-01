import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Chat from "@/components/chat";

interface ChatPageProps {
  params: Promise<{ chatId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch chat and verify ownership
  const { data: chat } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .eq("user_id", user.id)
    .single();

  if (!chat) {
    notFound();
  }

  // Fetch messages
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  // Convert to AI SDK message format
  const initialMessages = (messages ?? []).map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: msg.content,
    parts: [{ type: "text" as const, text: msg.content }],
  }));

  return <Chat chatId={chatId} initialMessages={initialMessages} />;
}
