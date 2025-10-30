"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Plus } from "lucide-react"
import { useState } from "react"

export default function Page() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div
      className="flex flex-col h-screen bg-background px-4">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto max-w-4xl">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Start a conversation...
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-1 ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Responsive padding using utility classes for larger screens */}
      <style jsx>{`
        @media (min-width: 768px) {
          div[style] {
            padding-left: 20vw !important;
            padding-right: 20vw !important;
          }
          div[style] > div.flex-1 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
      
      {/* Input area - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-background px-4 py-6 z-10">
        <div className="flex gap-3 items-center max-w-2xl mx-auto">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full shrink-0"
          >
            <Plus className="size-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Send a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-full px-5 h-11 border-input"
            />
          </div>
          <Button
            size="icon"
            onClick={handleSend}
            className="rounded-full shrink-0"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
