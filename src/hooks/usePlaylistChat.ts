
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { streamingMessages, mockUsernames } from "@/hooks/usePlaylistData";

export const usePlaylistChat = (playlistId: string) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatFullscreen, setChatFullscreen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; username: string } | undefined>();
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const streamingIntervalRef = useRef<NodeJS.Timeout>();

  const {
    chatHistory,
    chatSettings,
    moderationSettings,
    saveChatHistory,
    saveModerationSettings
  } = useChatPersistence(playlistId);

  const currentUser = chatSettings.username;
  const isCurrentUserModerator = currentUser === "You" || currentUser.includes("Moderator");

  // Initialize chat with persisted history - only once
  useEffect(() => {
    if (chatHistory.length > 0) {
      setChatMessages(chatHistory);
    } else {
      const defaultMessages = [
        {
          id: "1",
          username: "MusicLover23",
          message: "This playlist is amazing! 🎵",
          timestamp: "2:30 PM",
          userRole: 'user' as const,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: "2",
          username: "VinylCollector",
          message: "Anyone know if this is available on vinyl?",
          timestamp: "2:32 PM",
          userRole: 'vip' as const,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b988?w=32&h=32&fit=crop&crop=face"
        }
      ];
      setChatMessages(defaultMessages);
    }
  }, [chatHistory.length]);

  // Optimized auto-scroll with throttling
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  // Throttled scroll effect
  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [chatMessages.length, scrollToBottom]);

  // Memoized save function with proper debouncing
  const debouncedSave = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (messages: ChatMessage[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (messages.length > 2) {
          saveChatHistory(messages);
        }
      }, 1000); // Increased debounce time
    };
  }, [saveChatHistory]);

  // Save messages with debouncing
  useEffect(() => {
    if (chatMessages.length > 2) {
      debouncedSave(chatMessages);
    }
  }, [chatMessages, debouncedSave]);

  // Optimized streaming messages with longer intervals
  useEffect(() => {
    if (showChat && isStreaming) {
      streamingIntervalRef.current = setInterval(() => {
        const randomMessage = streamingMessages[Math.floor(Math.random() * streamingMessages.length)];
        const randomUsername = mockUsernames[Math.floor(Math.random() * mockUsernames.length)];
        const userRole = Math.random() > 0.9 ? 'moderator' : Math.random() > 0.8 ? 'vip' : 'user';
        
        const newStreamingMessage: ChatMessage = {
          id: `${Date.now()}-${Math.random()}`,
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true,
          userRole,
          avatar: `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=32&h=32&fit=crop&crop=face`
        };
        
        setChatMessages(prev => {
          // Limit total messages to prevent performance issues
          const updated = [...prev, newStreamingMessage];
          return updated.length > 100 ? updated.slice(-80) : updated;
        });
      }, 8000 + Math.random() * 7000); // Longer intervals: 8-15 seconds
    }

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, [showChat, isStreaming]);

  const filterMessage = (message: string): boolean => {
    if (!moderationSettings.filterProfanity) return true;
    
    const lowerMessage = message.toLowerCase();
    return !moderationSettings.bannedWords.some(word => lowerMessage.includes(word));
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setIsStreaming(true);
      setChatMinimized(false);
      setChatFullscreen(false);
      toast({
        title: "Live Chat Opened",
        description: "Join the conversation with other listeners!",
      });
    } else {
      setIsStreaming(false);
      setChatMinimized(false);
      setChatFullscreen(false);
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    }
  };

  const handleChatMinimize = () => {
    setChatMinimized(!chatMinimized);
  };

  const handleChatClose = () => {
    setShowChat(false);
    setIsStreaming(false);
    setChatMinimized(false);
    setChatFullscreen(false);
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }
  };

  const handleChatFullscreen = () => {
    setChatFullscreen(!chatFullscreen);
    if (!chatFullscreen) {
      setChatMinimized(false);
    }
  };

  const handleSendMessage = (message: string, replyToId?: string) => {
    // Check slow mode
    if (moderationSettings.slowMode) {
      const now = Date.now();
      if (now - lastMessageTime < moderationSettings.slowModeDelay * 1000) {
        toast({
          title: "Slow mode active",
          description: `Please wait ${moderationSettings.slowModeDelay} seconds between messages.`,
          variant: "destructive"
        });
        return;
      }
      setLastMessageTime(now);
    }

    // Check if user is muted
    if (moderationSettings.mutedUsers.includes(currentUser)) {
      toast({
        title: "You are muted",
        description: "You cannot send messages at this time.",
        variant: "destructive"
      });
      return;
    }

    const isFiltered = !filterMessage(message);
    
    const newMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      username: currentUser,
      message: isFiltered ? "[Message filtered]" : message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userRole: isCurrentUserModerator ? 'moderator' : 'user',
      replyTo: replyToId,
      isFiltered,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setReplyTo(undefined);
    
    if (isFiltered) {
      toast({
        title: "Message filtered",
        description: "Your message contains filtered content.",
        variant: "destructive"
      });
    }
  };

  const handleReply = (messageId: string, username: string) => {
    setReplyTo({ id: messageId, username });
  };

  const handleReact = (messageId: string, emoji: string) => {
    setChatMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          if (existingReaction.users.includes(currentUser)) {
            existingReaction.count--;
            existingReaction.users = existingReaction.users.filter(u => u !== currentUser);
          } else {
            existingReaction.count++;
            existingReaction.users.push(currentUser);
          }
        } else {
          reactions.push({ emoji, count: 1, users: [currentUser] });
        }
        
        return { ...msg, reactions: reactions.filter(r => r.count > 0) };
      }
      return msg;
    }));
  };

  const handleReport = (messageId: string) => {
    toast({
      title: "Message reported",
      description: "Thank you for keeping our community safe.",
    });
  };

  const handleModerate = (messageId: string, action: 'delete' | 'timeout') => {
    if (action === 'delete') {
      setChatMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast({
        title: "Message deleted",
        description: "Message has been removed by moderation.",
      });
    }
  };

  return {
    // State
    showChat,
    chatMinimized,
    chatFullscreen,
    chatMessages,
    isStreaming,
    replyTo,
    showModerationPanel,
    currentUser,
    isCurrentUserModerator,
    moderationSettings,
    chatContainerRef,
    // Actions
    handleChatToggle,
    handleChatMinimize,
    handleChatClose,
    handleChatFullscreen,
    handleSendMessage,
    handleReply,
    handleReact,
    handleReport,
    handleModerate,
    setReplyTo,
    setShowModerationPanel,
    saveModerationSettings
  };
};
