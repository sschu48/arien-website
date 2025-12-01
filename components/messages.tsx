"use client";

import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export function Messages({ messages, isLoading }: MessagesProps) {
  return (
    <div className="flex flex-col gap-4 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-muted rounded-lg px-4 py-2">
            <p className="text-muted-foreground">Thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
}
