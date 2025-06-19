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
    imageUrl: "https://picsum.photos/seed/21/600/300"
  },
  {
    id: "2",
    title: "Romantic Classics",
    description: "Heartfelt classics from the past",
    imageUrl: "https://picsum.photos/seed/22/600/300"
  },
  {
    id: "3",
    title: "Indie Love",
    description: "Fresh indie tracks about love",
    imageUrl: "https://picsum.photos/seed/23/600/300"
  },
  {
    id: "4",
    title: "Acoustic Romance",
    description: "Raw acoustic tunes for two",
    imageUrl: "https://picsum.photos/seed/24/600/300"
  },
  {
    id: "5",
    title: "Heartbreak Hits",
    description: "Emotional tracks for a broken heart",
    imageUrl: "https://picsum.photos/seed/25/600/300"
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="px-6 py-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mb-4 text-white">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img src={playlist.imageUrl} alt={playlist.title} onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-2">{playlist.title}</h2>
            {playlist.description && (
              <p className="text-sm text-gray-400">{playlist.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border-t border-gray-700">
            <Button variant="outline" onClick={handlePrev} className="border-gray-400 text-gray-400 hover:text-white hover:border-white">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={handleNext} className="bg-[#1DB954] text-black hover:bg-[#1DB954]/90">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MelodyMatch;