"use client";

import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Messages } from "@/components/messages";
import { ChatInput } from "@/components/chat-input";

interface ChatProps {
  chatId?: string;
  initialMessages?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    parts: Array<{ type: "text"; text: string }>;
  }>;
}

export default function Chat({ chatId, initialMessages = [] }: ChatProps) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const hasSavedRef = useRef(false);

  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    id: chatId,
    messages: initialMessages,
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages after assistant responds
  useEffect(() => {
    if (status === "ready" && messages.length >= 2 && !hasSavedRef.current) {
      const lastUserMsg = messages.filter(m => m.role === "user").pop();
      const lastAssistantMsg = messages.filter(m => m.role === "assistant").pop();

      if (lastUserMsg && lastAssistantMsg) {
        hasSavedRef.current = true;

        if (!chatId) {
          // Create new chat
          fetch("/api/chat/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userMessage: lastUserMsg.content,
              assistantMessage: lastAssistantMsg.content,
            }),
          })
            .then(res => res.json())
            .then(({ chatId: newChatId }) => {
              router.push(`/chat/${newChatId}`);
            });
        } else {
          // Save to existing chat
          fetch("/api/chat/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chatId,
              userMessage: lastUserMsg.content,
              assistantMessage: lastAssistantMsg.content,
            }),
          });
        }
      }
    }
  }, [status, messages, chatId, router]);

  // Reset save flag when user starts new message
  useEffect(() => {
    if (status === "submitted") {
      hasSavedRef.current = false;
    }
  }, [status]);

  async function onSubmit() {
    if (input.trim() && !isLoading) {
      const message = input;
      setInput("");
      await sendMessage({
        content: message,
        parts: [{ type: "text", text: message }],
      });
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Start a conversation</p>
          </div>
        ) : (
          <Messages messages={messages} isLoading={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error display */}
      {error && (
        <div className="px-4 py-2 text-sm text-red-500 text-center">
          {error.message}
        </div>
      )}

      {/* Input area */}
      <div className="mx-auto w-full max-w-2xl">
        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
