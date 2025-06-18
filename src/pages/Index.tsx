
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import PlaylistSection from "@/components/PlaylistSection";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const mockPlaylists = {
  recentlyPlayed: [
    {
      id: "1",
      title: "Liked Songs",
      description: "Made for you • 234 songs",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: "2", 
      title: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      imageUrl: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=300&h=300&fit=crop"
    },
    {
      id: "3",
      title: "RapCaviar", 
      description: "New music from Lil Baby, 21 Savage and more",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=entropy"
    },
    {
      id: "4",
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      imageUrl: "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=300&h=300&fit=crop"
    },
    {
      id: "5",
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=top"
    },
    {
      id: "6",
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=300&fit=crop"
    }
  ],
  madeForYou: [
    {
      id: "7",
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      imageUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&h=300&fit=crop"
    },
    {
      id: "8",
      title: "Release Radar", 
      description: "Catch all the latest music from artists you follow",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=left"
    },
    {
      id: "9",
      title: "Daily Mix 1",
      description: "Post Malone, The Weeknd, Travis Scott and more",
      imageUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=300&h=300&fit=crop"
    },
    {
      id: "10", 
      title: "Daily Mix 2",
      description: "Billie Eilish, Olivia Rodrigo, Taylor Swift and more",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=right"
    },
    {
      id: "11",
      title: "On Repeat",
      description: "Songs you can't stop playing",
      imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=300&h=300&fit=crop"
    }
  ],
  topCharts: [
    {
      id: "12",
      title: "Top 50 - Global",
      description: "Your daily update of the most played tracks",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=bottom"
    },
    {
      id: "13",
      title: "Top 50 - USA", 
      description: "Your daily update of the most played tracks",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop"
    },
    {
      id: "14",
      title: "Viral 50 - Global",
      description: "Your daily update of the most viral tracks",
      imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=300&fit=crop&crop=entropy"
    },
    {
      id: "15",
      title: "New Music Friday",
      description: "The best new music, updated every Friday",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face"
    }
  ]
};

const Index = () => {
  const navigate = useNavigate();

  const handlePlaylistClick = (playlist: any) => {
    toast({
      title: "Opening playlist",
      description: `Loading: ${playlist.title}`,
    });
    console.log("Clicked playlist:", playlist);
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-6">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="gradient-overlay rounded-lg p-8 mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Good evening
            </h1>
            <p className="text-lg text-muted-foreground">
              Let's find something for you to listen to
            </p>
          </div>
        </section>
        <section className="mb-8">
          <div
            className="relative rounded-lg overflow-hidden bg-pink-50 group cursor-pointer"
            onClick={() => navigate("/melody-match")}
          >
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&h=200&fit=crop"
              alt="Melody Match Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
            />
            <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6">
              <h2 className="text-4xl font-bold text-red-600 mb-2">Melody Match</h2>
              <p className="text-lg text-red-800 mb-4 text-center">
                Swipe through love-themed playlists and find your perfect match!
              </p>
              <Button variant="outline">Play Now</Button>
            </div>
          </div>
        </section>

        {/* Recently Played */}
        <PlaylistSection
          title="Recently played"
          playlists={mockPlaylists.recentlyPlayed}
          onPlaylistClick={handlePlaylistClick}
        />

        {/* Made for You */}
        <PlaylistSection
          title="Made for you"
          playlists={mockPlaylists.madeForYou}
          onPlaylistClick={handlePlaylistClick}
        />

        {/* Top Charts */}
        <PlaylistSection
          title="Top Charts"
          playlists={mockPlaylists.topCharts}
          onPlaylistClick={handlePlaylistClick}
        />
      </main>
    </div>
  );
};

export default Index;
