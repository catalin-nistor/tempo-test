import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Bot, Image, MessageSquare, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Model {
  id: string;
  name: string;
  type: "chatgpt" | "gemini" | "claude";
  capabilities: ("text" | "image")[];
  status: "available" | "unavailable";
  apiKey?: string;
}

interface ModelSidebarProps {
  models?: Model[];
  selectedModel?: string;
  onModelSelect?: (modelId: string) => void;
  onSettingsClick?: () => void;
}

const defaultModels: Model[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    type: "chatgpt",
    capabilities: ["text"],
    status: "available",
  },
  {
    id: "gemini",
    name: "Gemini",
    type: "gemini",
    capabilities: ["text", "image"],
    status: "available",
  },
  {
    id: "claude",
    name: "Claude",
    type: "claude",
    capabilities: ["text"],
    status: "unavailable",
  },
];

const ModelSidebar = ({
  models = defaultModels,
  selectedModel = "chatgpt",
  onModelSelect = () => {},
  onSettingsClick = () => {},
}: ModelSidebarProps) => {
  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Models</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                className="h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Model Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {models.map((model) => (
            <Card
              key={model.id}
              className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                selectedModel === model.id ? "border-primary" : ""
              }`}
              onClick={() => onModelSelect(model.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {model.type === "chatgpt" ? (
                    <Bot className="h-6 w-6" />
                  ) : model.type === "gemini" ? (
                    <Sparkles className="h-6 w-6" />
                  ) : (
                    <MessageSquare className="h-6 w-6" />
                  )}
                  <div>
                    <h3 className="font-medium">{model.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {model.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="flex items-center text-xs text-muted-foreground"
                        >
                          {capability === "text" ? (
                            <MessageSquare className="h-3 w-3 mr-1" />
                          ) : (
                            <Image className="h-3 w-3 mr-1" />
                          )}
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    model.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {model.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModelSidebar;
