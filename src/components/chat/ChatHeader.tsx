import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, CheckCircle, XCircle, Moon, Sun } from "lucide-react";

interface ModelStatus {
  model: string;
  status: "online" | "offline";
}

interface ChatHeaderProps {
  username?: string;
  avatarUrl?: string;
  modelStatuses?: ModelStatus[];
  onSettingsClick?: () => void;
  darkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const defaultModelStatuses: ModelStatus[] = [
  { model: "ChatGPT", status: "online" },
  { model: "Gemini", status: "online" },
  { model: "Claude", status: "offline" },
];

const ChatHeader = ({
  username = "John Doe",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  modelStatuses = defaultModelStatuses,
  onSettingsClick = () => {},
  darkMode = false,
  onDarkModeToggle = () => {},
}: ChatHeaderProps) => {
  return (
    <header className="w-full h-16 border-b bg-background px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {modelStatuses.map((model) => (
            <div
              key={model.model}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              {model.status === "online" ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span>{model.model}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDarkModeToggle}
          className="h-8 w-8"
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="h-8 w-8"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 flex items-center gap-2 px-2"
            >
              <Avatar className="h-6 w-6">
                <img src={avatarUrl} alt={username} />
              </Avatar>
              <span className="text-sm">{username}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ChatHeader;
