
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Flag, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  isStreaming?: boolean;
  userRole?: 'user' | 'moderator' | 'vip';
  avatar?: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
  replyTo?: string;
  isFiltered?: boolean;
}

interface ChatMessageProps {
  message: ChatMessage;
  currentUser: string;
  onReply: (messageId: string, username: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onReport: (messageId: string) => void;
  onModerate: (messageId: string, action: 'delete' | 'timeout') => void;
  isCurrentUserModerator: boolean;
}

export const ChatMessageComponent = ({
  message,
  currentUser,
  onReply,
  onReact,
  onReport,
  onModerate,
  isCurrentUserModerator
}: ChatMessageProps) => {
  const [showActions, setShowActions] = useState(false);

  if (message.isFiltered) {
    return (
      <div className="opacity-50 text-xs text-muted-foreground p-2">
        Message filtered by moderation
      </div>
    );
  }

  const getUserRoleColor = (role?: string) => {
    switch (role) {
      case 'moderator': return 'text-red-400';
      case 'vip': return 'text-yellow-400';
      default: return 'text-accent-foreground';
    }
  };

  const getUserRoleIcon = (role?: string) => {
    if (role === 'moderator') return <Shield className="h-3 w-3" />;
    return null;
  };

  return (
    <div 
      className={cn(
        "space-y-2 p-2 rounded-lg hover:bg-accent/20 transition-colors group",
        message.isStreaming && "animate-in slide-in-from-bottom-2 duration-300"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="text-xs">
            {message.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <span className={cn("text-sm font-medium", getUserRoleColor(message.userRole))}>
              {message.username}
            </span>
            {getUserRoleIcon(message.userRole)}
            <span className="text-xs text-muted-foreground">
              {message.timestamp}
            </span>
          </div>
          
          <p className="text-sm text-foreground leading-relaxed break-words">
            {message.message}
          </p>
          
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => onReact(message.id, reaction.emoji)}
                  className="flex items-center gap-1 px-2 py-1 bg-accent/50 rounded-full text-xs hover:bg-accent transition-colors"
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="flex items-center gap-1 ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReact(message.id, '❤️')}
            className="h-6 px-2"
          >
            <Heart className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReply(message.id, message.username)}
            className="h-6 px-2"
          >
            <MessageSquare className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReport(message.id)}
            className="h-6 px-2"
          >
            <Flag className="h-3 w-3" />
          </Button>
          {isCurrentUserModerator && message.username !== currentUser && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onModerate(message.id, 'delete')}
              className="h-6 px-2 text-red-400 hover:text-red-300"
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
