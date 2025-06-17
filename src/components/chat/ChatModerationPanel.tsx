
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Trash2, Volume2, VolumeX } from "lucide-react";

interface ChatModerationSettings {
  slowMode: boolean;
  slowModeDelay: number;
  filterProfanity: boolean;
  requireApproval: boolean;
  mutedUsers: string[];
  bannedWords: string[];
}

interface ChatModerationPanelProps {
  settings: ChatModerationSettings;
  onSettingsChange: (settings: ChatModerationSettings) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const ChatModerationPanel = ({
  settings,
  onSettingsChange,
  isVisible,
  onClose
}: ChatModerationPanelProps) => {
  const [newBannedWord, setNewBannedWord] = useState("");

  if (!isVisible) return null;

  const addBannedWord = () => {
    if (newBannedWord.trim() && !settings.bannedWords.includes(newBannedWord.trim().toLowerCase())) {
      onSettingsChange({
        ...settings,
        bannedWords: [...settings.bannedWords, newBannedWord.trim().toLowerCase()]
      });
      setNewBannedWord("");
    }
  };

  const removeBannedWord = (word: string) => {
    onSettingsChange({
      ...settings,
      bannedWords: settings.bannedWords.filter(w => w !== word)
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-sm z-20 p-4 overflow-y-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Chat Moderation
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="slow-mode">Slow Mode</Label>
              <Switch
                id="slow-mode"
                checked={settings.slowMode}
                onCheckedChange={(checked) => 
                  onSettingsChange({ ...settings, slowMode: checked })
                }
              />
            </div>
            
            {settings.slowMode && (
              <div className="ml-4">
                <Label htmlFor="slow-delay">Delay (seconds)</Label>
                <Input
                  id="slow-delay"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.slowModeDelay}
                  onChange={(e) => 
                    onSettingsChange({ 
                      ...settings, 
                      slowModeDelay: parseInt(e.target.value) || 5 
                    })
                  }
                  className="w-20"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="filter-profanity">Filter Profanity</Label>
              <Switch
                id="filter-profanity"
                checked={settings.filterProfanity}
                onCheckedChange={(checked) => 
                  onSettingsChange({ ...settings, filterProfanity: checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="require-approval">Require Message Approval</Label>
              <Switch
                id="require-approval"
                checked={settings.requireApproval}
                onCheckedChange={(checked) => 
                  onSettingsChange({ ...settings, requireApproval: checked })
                }
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Banned Words</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add banned word..."
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBannedWord()}
              />
              <Button onClick={addBannedWord}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {settings.bannedWords.map((word) => (
                <div
                  key={word}
                  className="flex items-center gap-1 px-2 py-1 bg-destructive/20 text-destructive rounded-md"
                >
                  <span className="text-sm">{word}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeBannedWord(word)}
                    className="h-4 w-4 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {settings.mutedUsers.length > 0 && (
            <div className="space-y-2">
              <Label>Muted Users</Label>
              <div className="space-y-1">
                {settings.mutedUsers.map((user) => (
                  <div
                    key={user}
                    className="flex items-center justify-between px-2 py-1 bg-muted rounded-md"
                  >
                    <span className="text-sm flex items-center gap-2">
                      <VolumeX className="h-3 w-3" />
                      {user}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => 
                        onSettingsChange({
                          ...settings,
                          mutedUsers: settings.mutedUsers.filter(u => u !== user)
                        })
                      }
                      className="h-6 px-2"
                    >
                      Unmute
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
