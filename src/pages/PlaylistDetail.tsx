
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, MessageCircle, ArrowLeft, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ChatMessageComponent, ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatModerationPanel } from "@/components/chat/ChatModerationPanel";
import { useChatPersistence } from "@/hooks/useChatPersistence";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumCover: string;
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
  },
  {
    id: "2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    duration: "2:54",
    albumCover: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=100&h=100&fit=crop"
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    duration: "3:23",
    albumCover: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=100&h=100&fit=crop"
  },
  {
    id: "4",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    duration: "2:58",
    albumCover: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop"
  },
  {
    id: "5",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    duration: "2:21",
    albumCover: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=100&h=100&fit=crop"
  }
];

const mockPlaylistData: { [key: string]: any } = {
  "1": {
    title: "Liked Songs",
    description: "Made for you • 234 songs",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face"
  },
  "2": {
    title: "Today's Top Hits",
    description: "Jung Kook is on top of the Hottest 50!",
    imageUrl: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=300&h=300&fit=crop"
  },
  "3": {
    title: "RapCaviar",
    description: "New music from Lil Baby, 21 Savage and more",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=entropy"
  }
};

const streamingMessages = [
  "This beat is incredible! 🔥",
  "Anyone else getting goosebumps?",
  "Perfect study music",
  "This reminds me of summer vibes ☀️",
  "Can't stop listening to this playlist",
  "The bass drop though... 🎵",
  "This is my new favorite song!",
  "Spotify recommendations are getting better",
  "Playing this on repeat all day",
  "Such a vibe! 💫"
];

const mockUsernames = [
  "MusicLover23", "VinylCollector", "BeatDropper", "MelodyFan", "SoundWave",
  "AudioPhile", "TuneSeeker", "RhythmMaster", "HarmonyHunter", "BassBeast"
];

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; username: string } | undefined>();
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    chatHistory,
    chatSettings,
    moderationSettings,
    saveChatHistory,
    saveChatSettings,
    saveModerationSettings
  } = useChatPersistence(id || "1");

  const playlist = mockPlaylistData[id || "1"] || {
    title: "Unknown Playlist",
    description: "Playlist not found",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  };
  
  const currentUser = chatSettings.username;
  const isCurrentUserModerator = currentUser === "You" || currentUser.includes("Moderator");

  // Initialize chat with persisted history
  useEffect(() => {
    if (chatHistory.length > 0) {
      setChatMessages(chatHistory);
    } else {
      // Default messages if no history
      setChatMessages([
        {
          id: "1",
          username: "MusicLover23",
          message: "This playlist is amazing! 🎵",
          timestamp: "2:30 PM",
          userRole: 'user',
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
        },
        {
          id: "2",
          username: "VinylCollector",
          message: "Anyone know if this is available on vinyl?",
          timestamp: "2:32 PM",
          userRole: 'vip',
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b988?w=32&h=32&fit=crop&crop=face"
        }
      ]);
    }
  }, [chatHistory]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Save messages to persistence whenever they change
  useEffect(() => {
    if (chatMessages.length > 0) {
      saveChatHistory(chatMessages);
    }
  }, [chatMessages, saveChatHistory]);

  // Simulate streaming messages when chat is opened
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showChat && isStreaming) {
      interval = setInterval(() => {
        const randomMessage = streamingMessages[Math.floor(Math.random() * streamingMessages.length)];
        const randomUsername = mockUsernames[Math.floor(Math.random() * mockUsernames.length)];
        const userRole = Math.random() > 0.9 ? 'moderator' : Math.random() > 0.8 ? 'vip' : 'user';
        
        const newStreamingMessage: ChatMessage = {
          id: Date.now().toString(),
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true,
          userRole,
          avatar: `https://images.unsplash.com/photo-${1500000000 + Math.floor(Math.random() * 100000000)}?w=32&h=32&fit=crop&crop=face`
        };
        
        setChatMessages(prev => [...prev, newStreamingMessage]);
      }, 2000 + Math.random() * 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showChat, isStreaming]);

  const handlePlayPlaylist = () => {
    toast({
      title: "Playing playlist",
      description: `Now playing: ${playlist.title}`,
    });
    console.log("Playing playlist:", playlist);
  };

  const handleChatToggle = () => {
    console.log("Chat toggle clicked, current showChat:", showChat);
    setShowChat(!showChat);
    if (!showChat) {
      setIsStreaming(true);
      toast({
        title: "Live Chat Opened",
        description: "Join the conversation with other listeners!",
      });
      console.log("Chat opened, streaming started");
    } else {
      setIsStreaming(false);
      console.log("Chat closed, streaming stopped");
    }
  };

  const filterMessage = (message: string): boolean => {
    if (!moderationSettings.filterProfanity) return true;
    
    const lowerMessage = message.toLowerCase();
    return !moderationSettings.bannedWords.some(word => lowerMessage.includes(word));
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
      id: Date.now().toString(),
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
    console.log("Reported message:", messageId);
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

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-6 py-6">
        {/* Playlist Header */}
        <div className="flex items-end gap-6 mb-8">
          <img
            src={playlist.imageUrl}
            alt={playlist.title}
            className="w-64 h-64 object-cover rounded-lg shadow-xl"
          />
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Playlist</p>
              <h1 className="text-5xl font-bold text-foreground mb-2">{playlist.title}</h1>
              <p className="text-muted-foreground">{playlist.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={handlePlayPlaylist}
                className="rounded-full px-8"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Play
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleChatToggle}
                className="rounded-full px-8 relative"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat
                {isStreaming && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className={`grid gap-8 ${showChat ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Songs List */}
          <div className={showChat ? 'lg:col-span-2' : 'col-span-1'}>
            <div className="space-y-2">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border/50">
                <span>#</span>
                <span>Title</span>
                <span>Duration</span>
              </div>
              {mockSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-8">
                    <span className="text-muted-foreground group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play className="h-4 w-4 text-foreground hidden group-hover:block" />
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={song.albumCover}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{song.title}</p>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground">{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat Panel */}
          {showChat && (
            <div className="lg:col-span-1">
              <Card className="h-[600px] relative">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-4 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          {chatMessages.length} messages
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCurrentUserModerator && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowModerationPanel(true)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        )}
                        {isStreaming && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-red-500 font-medium">LIVE</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-2 scroll-smooth"
                  >
                    {chatMessages.map((msg) => (
                      <ChatMessageComponent
                        key={msg.id}
                        message={msg}
                        currentUser={currentUser}
                        onReply={handleReply}
                        onReact={handleReact}
                        onReport={handleReport}
                        onModerate={handleModerate}
                        isCurrentUserModerator={isCurrentUserModerator}
                      />
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-border/50">
                    <ChatInput
                      onSendMessage={handleSendMessage}
                      replyTo={replyTo}
                      onClearReply={() => setReplyTo(undefined)}
                      placeholder={moderationSettings.mutedUsers.includes(currentUser) ? "You are muted" : "Say something..."}
                      disabled={moderationSettings.mutedUsers.includes(currentUser)}
                    />
                  </div>
                </CardContent>
                
                <ChatModerationPanel
                  settings={moderationSettings}
                  onSettingsChange={saveModerationSettings}
                  isVisible={showModerationPanel}
                  onClose={() => setShowModerationPanel(false)}
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
