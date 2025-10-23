"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const isOnChatPage = pathname.startsWith("/chat");

  return (
    <nav className="flex items-center justify-between px-8 py-4">
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
        {!isOnChatPage && pathname !== "/login" && (
          <Button size="default" variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
        {!isOnChatPage && pathname !== "/register" && (
          <Button size="default" variant="outline" asChild>
            <Link href="/register">Register</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

