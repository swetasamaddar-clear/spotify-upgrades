
import { useRef, useEffect, memo } from "react";
import { Shield, Maximize, Minimize, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageComponent, ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatModerationPanel } from "@/components/chat/ChatModerationPanel";

interface LiveChatPanelProps {
  chatMessages: ChatMessage[];
  chatMinimized: boolean;
  isStreaming: boolean;
  currentUser: string;
  isCurrentUserModerator: boolean;
  showModerationPanel: boolean;
  moderationSettings: any;
  replyTo?: { id: string; username: string };
  onChatMinimize: () => void;
  onChatClose: () => void;
  onChatFullscreen: () => void;
  onSetShowModerationPanel: (show: boolean) => void;
  onSendMessage: (message: string, replyTo?: string) => void;
  onReply: (messageId: string, username: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onReport: (messageId: string) => void;
  onModerate: (messageId: string, action: 'delete' | 'timeout') => void;
  onClearReply: () => void;
  saveModerationSettings: (settings: any) => void;
}

export const LiveChatPanel = memo(({
  chatMessages,
  chatMinimized,
  isStreaming,
  currentUser,
  isCurrentUserModerator,
  showModerationPanel,
  moderationSettings,
  replyTo,
  onChatMinimize,
  onChatClose,
  onChatFullscreen,
  onSetShowModerationPanel,
  onSendMessage,
  onReply,
  onReact,
  onReport,
  onModerate,
  onClearReply,
  saveModerationSettings
}: LiveChatPanelProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current && !chatMinimized) {
      const container = chatContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [chatMessages.length, chatMinimized]);

  return (
    <div className="lg:col-span-1">
      <Card className={`${chatMinimized ? 'h-16' : 'h-[600px]'} relative transition-all duration-200`}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                {!chatMinimized && (
                  <p className="text-sm text-muted-foreground">
                    {chatMessages.length} messages
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isCurrentUserModerator && !chatMinimized && (
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
                  title="Enter fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onChatMinimize}
                  title={chatMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <Minimize className="h-4 w-4" />
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
          
          {!chatMinimized && (
            <>
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-2 scroll-smooth"
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
            </>
          )}
        </CardContent>
        
        {!chatMinimized && (
          <ChatModerationPanel
            settings={moderationSettings}
            onSettingsChange={saveModerationSettings}
            isVisible={showModerationPanel}
            onClose={() => onSetShowModerationPanel(false)}
          />
        )}
      </Card>
    </div>
  );
});

LiveChatPanel.displayName = "LiveChatPanel";
