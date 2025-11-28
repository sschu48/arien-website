"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/app/(auth)/actions";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isOnChatPage = pathname.startsWith("/chat");

  useEffect(() => {
    setMounted(true);

    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4">
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/favicon.png"
            alt="Arien Aviation"
            className="h-10 w-10"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {mounted && user ? (
          <>
            <span className="mr-3 text-sm text-muted-foreground">
              {user.email}
            </span>
            <form action={signout}>
              <Button size="default" variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </>
        ) : (
          <>
            {mounted && !isOnChatPage && pathname !== "/login" && (
              <Button size="default" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
            {mounted && !isOnChatPage && pathname !== "/register" && (
              <Button size="default" variant="outline" asChild>
                <Link href="/register">Register</Link>
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
