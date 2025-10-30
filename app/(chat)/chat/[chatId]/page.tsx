"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
      className="flex flex-col h-screen bg-background px-4 max-w-4xl">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>Start a conversation...</p> 
        </div>
      </div>
      {/* Input area */}
      <form action="">
        <div className="flex gap-2 "> 
          <Textarea
            className="min-h-[48px] max-h-[200px] resize-none rounded-2xl" 
            placeholder="Type your message..."
            rows={1}
          />
          <Button
            type="submit"
            className="rounded-full h-12 w-12 shrink-0"
            size="icon"
            variant="outline"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
