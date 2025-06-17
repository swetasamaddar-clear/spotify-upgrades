
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string, replyTo?: string) => void;
  replyTo?: { id: string; username: string };
  onClearReply: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const commonEmojis = ['😀', '😂', '❤️', '👍', '👎', '😍', '🎵', '🔥', '💯', '🎉'];

export const ChatInput = ({ 
  onSendMessage, 
  replyTo, 
  onClearReply, 
  disabled = false,
  placeholder = "Say something..."
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, replyTo?.id);
      setMessage("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojis(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      {replyTo && (
        <div className="flex items-center gap-2 px-3 py-2 bg-accent/50 rounded-lg">
          <span className="text-xs text-muted-foreground">
            Replying to <span className="font-medium">{replyTo.username}</span>
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearReply}
            className="h-4 w-4 p-0 ml-auto"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex gap-2 relative">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="pr-10"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowEmojis(!showEmojis)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          size="icon" 
          onClick={handleSend}
          disabled={disabled || !message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
        
        {showEmojis && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-popover border rounded-lg shadow-lg grid grid-cols-5 gap-1 z-10">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="p-1 hover:bg-accent rounded text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
