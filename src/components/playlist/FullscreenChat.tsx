
import { useRef, useEffect, memo } from "react";
import { Shield, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageComponent, ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatModerationPanel } from "@/components/chat/ChatModerationPanel";

interface FullscreenChatProps {
  chatMessages: ChatMessage[];
  isStreaming: boolean;
  currentUser: string;
  isCurrentUserModerator: boolean;
  showModerationPanel: boolean;
  moderationSettings: any;
  replyTo?: { id: string; username: string };
  onChatFullscreen: () => void;
  onChatClose: () => void;
  onSetShowModerationPanel: (show: boolean) => void;
  onSendMessage: (message: string, replyTo?: string) => void;
  onReply: (messageId: string, username: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onReport: (messageId: string) => void;
  onModerate: (messageId: string, action: 'delete' | 'timeout') => void;
  onClearReply: () => void;
  saveModerationSettings: (settings: any) => void;
}

export const FullscreenChat = memo(({
  chatMessages,
  isStreaming,
  currentUser,
  isCurrentUserModerator,
  showModerationPanel,
  moderationSettings,
  replyTo,
  onChatFullscreen,
  onChatClose,
  onSetShowModerationPanel,
  onSendMessage,
  onReply,
  onReact,
  onReport,
  onModerate,
  onClearReply,
  saveModerationSettings
}: FullscreenChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [chatMessages.length]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Card className="h-full rounded-none border-0">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Live Chat - Fullscreen</h3>
                <p className="text-sm text-muted-foreground">
                  {chatMessages.length} messages
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isCurrentUserModerator && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSetShowModerationPanel(true)}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onChatFullscreen}
                  title="Exit fullscreen"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onChatClose}
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
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
            className="flex-1 overflow-y-auto p-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {chatMessages.map((msg) => (
              <ChatMessageComponent
                key={msg.id}
                message={msg}
                currentUser={currentUser}
                onReply={onReply}
                onReact={onReact}
                onReport={onReport}
                onModerate={onModerate}
                isCurrentUserModerator={isCurrentUserModerator}
              />
            ))}
          </div>
          
          <div className="p-4 border-t border-border/50">
            <ChatInput
              onSendMessage={onSendMessage}
              replyTo={replyTo}
              onClearReply={onClearReply}
              placeholder={moderationSettings.mutedUsers.includes(currentUser) ? "You are muted" : "Say something..."}
              disabled={moderationSettings.mutedUsers.includes(currentUser)}
            />
          </div>
        </CardContent>
        
        <ChatModerationPanel
          settings={moderationSettings}
          onSettingsChange={saveModerationSettings}
          isVisible={showModerationPanel}
          onClose={() => onSetShowModerationPanel(false)}
        />
      </Card>
    </div>
  );
});

FullscreenChat.displayName = "FullscreenChat";
