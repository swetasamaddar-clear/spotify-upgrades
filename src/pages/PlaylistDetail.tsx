
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { PlaylistHeader } from "@/components/playlist/PlaylistHeader";
import { SongsList } from "@/components/playlist/SongsList";
import { LiveChatPanel } from "@/components/playlist/LiveChatPanel";
import { FullscreenChat } from "@/components/playlist/FullscreenChat";
import { usePlaylistChat } from "@/hooks/usePlaylistChat";
import { mockSongs, mockPlaylistData } from "@/hooks/usePlaylistData";

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const playlist = mockPlaylistData[id || "1"] || {
    title: "Unknown Playlist",
    description: "Playlist not found",
    imageUrl: "/placeholder.svg"
  };

  const {
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
  } = usePlaylistChat(id || "1");

  const handlePlayPlaylist = () => {
    toast({
      title: "Playing playlist",
      description: `Now playing: ${playlist.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fullscreen Chat Overlay */}
      {showChat && chatFullscreen && (
        <FullscreenChat
          chatMessages={chatMessages}
          isStreaming={isStreaming}
          currentUser={currentUser}
          isCurrentUserModerator={isCurrentUserModerator}
          showModerationPanel={showModerationPanel}
          moderationSettings={moderationSettings}
          replyTo={replyTo}
          onChatFullscreen={handleChatFullscreen}
          onChatClose={handleChatClose}
          onSetShowModerationPanel={setShowModerationPanel}
          onSendMessage={handleSendMessage}
          onReply={handleReply}
          onReact={handleReact}
          onReport={handleReport}
          onModerate={handleModerate}
          onClearReply={() => setReplyTo(undefined)}
          saveModerationSettings={saveModerationSettings}
        />
      )}

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
        <PlaylistHeader
          playlist={playlist}
          onPlayPlaylist={handlePlayPlaylist}
          onChatToggle={handleChatToggle}
          showChat={showChat}
          isStreaming={isStreaming}
        />

        <div className={`grid gap-8 ${showChat && !chatFullscreen ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Songs List */}
          <div className={showChat && !chatFullscreen ? 'lg:col-span-2' : 'col-span-1'}>
            <SongsList songs={mockSongs} />
          </div>

          {/* Live Chat Panel - Regular/Minimized */}
          {showChat && !chatFullscreen && (
            <LiveChatPanel
              chatMessages={chatMessages}
              chatMinimized={chatMinimized}
              isStreaming={isStreaming}
              currentUser={currentUser}
              isCurrentUserModerator={isCurrentUserModerator}
              showModerationPanel={showModerationPanel}
              moderationSettings={moderationSettings}
              replyTo={replyTo}
              onChatMinimize={handleChatMinimize}
              onChatClose={handleChatClose}
              onChatFullscreen={handleChatFullscreen}
              onSetShowModerationPanel={setShowModerationPanel}
              onSendMessage={handleSendMessage}
              onReply={handleReply}
              onReact={handleReact}
              onReport={handleReport}
              onModerate={handleModerate}
              onClearReply={() => setReplyTo(undefined)}
              saveModerationSettings={saveModerationSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
