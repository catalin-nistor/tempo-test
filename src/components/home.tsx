import React, { useState, useEffect } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ChatHeader
        onSettingsClick={onSettingsClick}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
      />
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
