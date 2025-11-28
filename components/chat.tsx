"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const pathname = usePathname();
  
  return (
    <>
        {/* Component content */}
        {/* Navbar for chat page will be here as Chat Header */}

        {/* This will be where the message feed will go */}

      {/* Message input will be here */}
      <div className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 px-2 text-center">
        <p>Message input will be here</p>
      </div>
    </>
    
  );
}

