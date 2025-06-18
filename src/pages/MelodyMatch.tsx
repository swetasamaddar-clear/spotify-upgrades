import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

const lovePlaylists: Playlist[] = [
  {
    id: "1",
    title: "Love Songs",
    description: "Timeless tracks to set the mood",
    imageUrl: "https://images.unsplash.com/photo-1548611716-4bf9f6eb2046?w=500&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Romantic Classics",
    description: "Heartfelt classics from the past",
    imageUrl: "https://images.unsplash.com/photo-1508654896293-27f94fabf0ca?w=500&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Indie Love",
    description: "Fresh indie tracks about love",
    imageUrl: "https://images.unsplash.com/photo-1519669556874-8b6b9b57aaec?w=500&h=300&fit=crop"
  },
  {
    id: "4",
    title: "Acoustic Romance",
    description: "Raw acoustic tunes for two",
    imageUrl: "https://images.unsplash.com/photo-1499988924832-d14b5f3d3e8a?w=500&h=300&fit=crop"
  },
  {
    id: "5",
    title: "Heartbreak Hits",
    description: "Emotional tracks for a broken heart",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop"
  }
];

const MelodyMatch = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const playlist = lovePlaylists[index];

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      toast({ title: "Start of list", description: "No previous playlist." });
    }
  };

  const handleNext = () => {
    if (index < lovePlaylists.length - 1) {
      setIndex(index + 1);
    } else {
      toast({ title: "End of list", description: "You've swiped through all playlists!" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="px-6 py-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
          <img src={playlist.imageUrl} alt={playlist.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-foreground mb-2">{playlist.title}</h2>
            {playlist.description && (
              <p className="text-sm text-muted-foreground">{playlist.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border-t border-border">
            <Button variant="outline" onClick={handlePrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={handleNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MelodyMatch;