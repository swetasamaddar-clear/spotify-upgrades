
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
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "2", 
      title: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "3",
      title: "RapCaviar", 
      description: "New music from Lil Baby, 21 Savage and more",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "4",
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "5",
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "6",
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    }
  ],
  madeForYou: [
    {
      id: "7",
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "8",
      title: "Release Radar", 
      description: "Catch all the latest music from artists you follow",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "9",
      title: "Daily Mix 1",
      description: "Post Malone, The Weeknd, Travis Scott and more",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "10", 
      title: "Daily Mix 2",
      description: "Billie Eilish, Olivia Rodrigo, Taylor Swift and more",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "11",
      title: "On Repeat",
      description: "Songs you can't stop playing",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    }
  ],
  topCharts: [
    {
      id: "12",
      title: "Top 50 - Global",
      description: "Your daily update of the most played tracks",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "13",
      title: "Top 50 - USA", 
      description: "Your daily update of the most played tracks",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "14",
      title: "Viral 50 - Global",
      description: "Your daily update of the most viral tracks",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
    },
    {
      id: "15",
      title: "New Music Friday",
      description: "The best new music, updated every Friday",
      imageUrl: "https://source.unsplash.com/random/300x300/?love,romance"
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <Header />
      
      <main className="px-6 py-6">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="relative rounded-lg overflow-hidden mb-8">
            <img
              src="https://source.unsplash.com/600x200/?valentine,hearts"
              alt="Love banner"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-70" />
            <div className="relative p-8 z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Love is in the Air
              </h1>
              <p className="text-lg text-white">
                Find the perfect love song for every moment
              </p>
            </div>
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
