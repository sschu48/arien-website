import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Chat } from "@/components/chat";
// import Chat from "@/components/chat";

export default async function NewChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Chat chatId="main-chat" />
    </div>
  );
}
