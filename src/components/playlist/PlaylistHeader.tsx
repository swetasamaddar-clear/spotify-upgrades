
import { Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaylistHeaderProps {
  playlist: {
    title: string;
    description: string;
    imageUrl: string;
  };
  onPlayPlaylist: () => void;
  onChatToggle: () => void;
  showChat: boolean;
  isStreaming: boolean;
}

export const PlaylistHeader = ({
  playlist,
  onPlayPlaylist,
  onChatToggle,
  showChat,
  isStreaming
}: PlaylistHeaderProps) => {
  return (
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
            onClick={onPlayPlaylist}
            className="rounded-full px-8"
          >
            <Play className="h-5 w-5 mr-2 fill-current" />
            Play
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onChatToggle}
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
  );
};
