import { createClient } from "@/lib/supabase/server";
import type { Chat, Message } from "./types";

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getChatById(chatId: string): Promise<Chat | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (error) return null;
  return data;
}

export async function createChat(userId: string, title: string = "New Chat"): Promise<Chat> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .insert({ user_id: userId, title })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateChatTitle(chatId: string, title: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chats")
    .update({ title })
    .eq("id", chatId);

  if (error) throw error;
}

export async function deleteChat(chatId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId);

  if (error) throw error;
}

export async function getMessagesByChatId(chatId: string): Promise<Message[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function saveMessage(
  chatId: string,
  role: "user" | "assistant",
  content: string
): Promise<Message> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, role, content })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessages(
  messages: { chat_id: string; role: "user" | "assistant"; content: string }[]
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert(messages);

  if (error) throw error;
}
