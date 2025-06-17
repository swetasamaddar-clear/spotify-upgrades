
import { useState, useEffect } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";

interface ChatSettings {
  username: string;
  notifications: boolean;
  soundEffects: boolean;
  theme: 'dark' | 'light';
}

interface ChatModerationSettings {
  slowMode: boolean;
  slowModeDelay: number;
  filterProfanity: boolean;
  requireApproval: boolean;
  mutedUsers: string[];
  bannedWords: string[];
}

export const useChatPersistence = (playlistId: string) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    username: `User${Math.floor(Math.random() * 10000)}`,
    notifications: true,
    soundEffects: true,
    theme: 'dark'
  });
  const [moderationSettings, setModerationSettings] = useState<ChatModerationSettings>({
    slowMode: false,
    slowModeDelay: 5,
    filterProfanity: true,
    requireApproval: false,
    mutedUsers: [],
    bannedWords: ['spam', 'scam']
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(`chat-history-${playlistId}`);
    const savedSettings = localStorage.getItem('chat-settings');
    const savedModerationSettings = localStorage.getItem('chat-moderation-settings');

    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse chat history:', error);
      }
    }

    if (savedSettings) {
      try {
        setChatSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse chat settings:', error);
      }
    }

    if (savedModerationSettings) {
      try {
        setModerationSettings(JSON.parse(savedModerationSettings));
      } catch (error) {
        console.error('Failed to parse moderation settings:', error);
      }
    }
  }, [playlistId]);

  // Save chat history to localStorage
  const saveChatHistory = (messages: ChatMessage[]) => {
    setChatHistory(messages);
    localStorage.setItem(`chat-history-${playlistId}`, JSON.stringify(messages.slice(-100))); // Keep last 100 messages
  };

  // Save chat settings to localStorage
  const saveChatSettings = (settings: ChatSettings) => {
    setChatSettings(settings);
    localStorage.setItem('chat-settings', JSON.stringify(settings));
  };

  // Save moderation settings to localStorage
  const saveModerationSettings = (settings: ChatModerationSettings) => {
    setModerationSettings(settings);
    localStorage.setItem('chat-moderation-settings', JSON.stringify(settings));
  };

  // Clear chat history
  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(`chat-history-${playlistId}`);
  };

  return {
    chatHistory,
    chatSettings,
    moderationSettings,
    saveChatHistory,
    saveChatSettings,
    saveModerationSettings,
    clearChatHistory
  };
};
