import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, Image, MessageSquare } from "lucide-react";

interface ChatTab {
  id: string;
  title: string;
  model: "chatgpt" | "gemini" | "claude";
  type: "text" | "image";
  isActive?: boolean;
}

interface ChatTabsProps {
  tabs?: ChatTab[];
  onTabChange?: (tabId: string) => void;
}

const defaultTabs: ChatTab[] = [
  {
    id: "1",
    title: "General Chat",
    model: "chatgpt",
    type: "text",
    isActive: true,
  },
  {
    id: "2",
    title: "Image Generation",
    model: "gemini",
    type: "image",
  },
  {
    id: "3",
    title: "Code Assistant",
    model: "claude",
    type: "text",
  },
];

const ModelIcon = ({ model }: { model: ChatTab["model"] }) => {
  return <Bot className="w-4 h-4 mr-2" />;
};

const ChatTabs = ({
  tabs = defaultTabs,
  onTabChange = () => {},
}: ChatTabsProps) => {
  return (
    <div className="w-full bg-background border-b">
      <Tabs
        defaultValue={tabs.find((tab) => tab.isActive)?.id || tabs[0].id}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="w-full h-10 p-0 bg-background">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center px-4 py-2 data-[state=active]:bg-muted"
            >
              <div className="flex items-center">
                {tab.type === "text" ? (
                  <MessageSquare className="w-4 h-4 mr-2" />
                ) : (
                  <Image className="w-4 h-4 mr-2" />
                )}
                <span className="mr-2">{tab.title}</span>
                <ModelIcon model={tab.model} />
                <Badge variant="outline" className="ml-2 text-xs">
                  {tab.model}
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            {/* Content for each tab will be rendered by parent component */}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ChatTabs;
