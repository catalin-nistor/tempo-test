import React from "react";
import ChatHeader from "./chat/ChatHeader";
import ModelSidebar from "./chat/ModelSidebar";
import ChatWindow from "./chat/ChatWindow";
import ContextPanel from "./chat/ContextPanel";

interface HomeProps {
  onSendMessage?: (message: string) => void;
  onModelSelect?: (modelId: string) => void;
  onTabChange?: (tabId: string) => void;
  onFileUpload?: (files: FileList) => void;
  onFileClear?: (fileId: string) => void;
  onSettingsClick?: () => void;
}

const Home = ({
  onSendMessage = () => {},
  onModelSelect = () => {},
  onTabChange = () => {},
  onFileUpload = () => {},
  onFileClear = () => {},
  onSettingsClick = () => {},
}: HomeProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ChatHeader onSettingsClick={onSettingsClick} />
      <div className="flex flex-1 overflow-hidden">
        <ModelSidebar
          onModelSelect={onModelSelect}
          onSettingsClick={onSettingsClick}
        />
        <ChatWindow onSendMessage={onSendMessage} onTabChange={onTabChange} />
        <div className="w-[400px]">
          <ContextPanel onFileUpload={onFileUpload} onFileClear={onFileClear} />
        </div>
      </div>
    </div>
  );
};

export default Home;
