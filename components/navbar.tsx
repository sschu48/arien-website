"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOnChatPage = pathname.startsWith("/chat");

  useEffect(() => {
    setMounted(true);
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
      </div>
    </nav>
  );
}

