
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, MessageCircle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumCover: string;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isStreaming?: boolean;
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
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "MusicLover23",
      message: "This playlist is amazing! 🎵",
      timestamp: "2:30 PM"
    },
    {
      id: "2",
      username: "VinylCollector",
      message: "Anyone know if this is available on vinyl?",
      timestamp: "2:32 PM"
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const playlist = mockPlaylistData[id || "1"];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Simulate streaming messages when chat is opened
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showChat && isStreaming) {
      interval = setInterval(() => {
        const randomMessage = streamingMessages[Math.floor(Math.random() * streamingMessages.length)];
        const randomUsername = mockUsernames[Math.floor(Math.random() * mockUsernames.length)];
        
        const newStreamingMessage: ChatMessage = {
          id: Date.now().toString(),
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true
        };
        
        setChatMessages(prev => [...prev, newStreamingMessage]);
      }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
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
    setShowChat(!showChat);
    if (!showChat) {
      setIsStreaming(true);
      toast({
        title: "Live Chat Opened",
        description: "Join the conversation with other listeners!",
      });
    } else {
      setIsStreaming(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
      console.log("Sent message:", message);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Songs List */}
          <div className="lg:col-span-2">
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
              <Card className="h-[500px]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-4 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          {chatMessages.length} listeners chatting
                        </p>
                      </div>
                      {isStreaming && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-red-500 font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
                  >
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`space-y-1 animate-in slide-in-from-bottom-2 duration-300 ${
                          msg.isStreaming ? 'opacity-90' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            msg.username === 'You' ? 'text-primary' : 'text-accent-foreground'
                          }`}>
                            {msg.username}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-border/50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Say something..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
