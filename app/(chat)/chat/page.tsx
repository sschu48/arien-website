import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Chat from "@/components/chat";

export default async function NewChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <Chat />;
}
