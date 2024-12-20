import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  modelType?: "chatgpt" | "gemini" | "claude";
}

interface MessageListProps {
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    sender: "ai",
    timestamp: new Date().toISOString(),
    modelType: "chatgpt",
  },
  {
    id: "2",
    content: "I have a question about machine learning.",
    sender: "user",
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    content:
      "I'd be happy to help you with any questions about machine learning. What would you like to know?",
    sender: "ai",
    timestamp: new Date().toISOString(),
    modelType: "chatgpt",
  },
];

const MessageList = ({ messages = defaultMessages }: MessageListProps) => {
  return (
    <div className="h-full bg-background">
      <ScrollArea className="h-full px-4">
        <div className="flex flex-col gap-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[70%] p-4 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    className="h-8 w-8"
                    src={
                      message.sender === "user"
                        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai"
                    }
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {message.sender === "user"
                          ? "You"
                          : message.modelType?.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{message.content}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
