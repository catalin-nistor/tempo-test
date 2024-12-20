import React, { useState } from "react";
import ChatTabs from "./ChatTabs";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  onSendMessage?: (message: string) => void;
  onTabChange?: (tabId: string) => void;
}

const ChatWindow = ({
  onSendMessage = () => {},
  onTabChange = () => {},
}: ChatWindowProps) => {
  const [isImageMode, setIsImageMode] = useState(false);

  const handleSwitchMode = () => {
    setIsImageMode(!isImageMode);
  };

  return (
    <div className="flex flex-col h-full w-[832px] bg-background border-x">
      <ChatTabs onTabChange={onTabChange} />
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>
      <ChatInput
        onSendMessage={onSendMessage}
        onSwitchMode={handleSwitchMode}
        isImageMode={isImageMode}
      />
    </div>
  );
};

export default ChatWindow;
