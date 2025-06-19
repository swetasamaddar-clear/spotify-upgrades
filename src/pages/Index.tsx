
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
      imageUrl: "https://picsum.photos/seed/1/300/300"
    },
    {
      id: "2", 
      title: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      imageUrl: "https://picsum.photos/seed/2/300/300"
    },
    {
      id: "3",
      title: "RapCaviar", 
      description: "New music from Lil Baby, 21 Savage and more",
      imageUrl: "https://picsum.photos/seed/3/300/300"
    },
    {
      id: "4",
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      imageUrl: "https://picsum.photos/seed/4/300/300"
    },
    {
      id: "5",
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      imageUrl: "https://picsum.photos/seed/5/300/300"
    },
    {
      id: "6",
      title: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      imageUrl: "https://picsum.photos/seed/6/300/300"
    }
  ],
  madeForYou: [
    {
      id: "7",
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      imageUrl: "https://picsum.photos/seed/7/300/300"
    },
    {
      id: "8",
      title: "Release Radar", 
      description: "Catch all the latest music from artists you follow",
      imageUrl: "https://picsum.photos/seed/8/300/300"
    },
    {
      id: "9",
      title: "Daily Mix 1",
      description: "Post Malone, The Weeknd, Travis Scott and more",
      imageUrl: "https://picsum.photos/seed/9/300/300"
    },
    {
      id: "10", 
      title: "Daily Mix 2",
      description: "Billie Eilish, Olivia Rodrigo, Taylor Swift and more",
      imageUrl: "https://picsum.photos/seed/10/300/300"
    },
    {
      id: "11",
      title: "On Repeat",
      description: "Songs you can't stop playing",
      imageUrl: "https://picsum.photos/seed/11/300/300"
    }
  ],
  topCharts: [
    {
      id: "12",
      title: "Top 50 - Global",
      description: "Your daily update of the most played tracks",
      imageUrl: "https://picsum.photos/seed/12/300/300"
    },
    {
      id: "13",
      title: "Top 50 - USA", 
      description: "Your daily update of the most played tracks",
      imageUrl: "https://picsum.photos/seed/13/300/300"
    },
    {
      id: "14",
      title: "Viral 50 - Global",
      description: "Your daily update of the most viral tracks",
      imageUrl: "https://picsum.photos/seed/14/300/300"
    },
    {
      id: "15",
      title: "New Music Friday",
      description: "The best new music, updated every Friday",
      imageUrl: "https://picsum.photos/seed/15/300/300"
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="px-6 py-6">
        {/* Hero Section */}
        <section className="relative mb-8 h-64 md:h-96 rounded-lg overflow-hidden">
          <img
            src="https://picsum.photos/seed/love/1200/400"
            alt="Love banner"
            onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-red-500 to-purple-600 opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-3">
              Love is in the Air ❤️
            </h1>
            <p className="text-lg md:text-xl text-white drop-shadow mb-5">
              Find the perfect love song for every moment
            </p>
            <Button className="bg-white text-pink-600 hover:bg-pink-50">
              Explore
            </Button>
          </div>
        </section>
        <section className="relative mb-8 h-64 md:h-96 rounded-lg overflow-hidden group cursor-pointer" onClick={() => navigate("/melody-match")}>
          <img
            src="https://picsum.photos/seed/valentine/800/400"
            alt="Couple Banner"
            onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-500 to-red-600 opacity-50 group-hover:opacity-60 transition-opacity" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-3">Melody Match</h2>
            <p className="text-lg md:text-xl text-white drop-shadow mb-5">Swipe through themed playlists and find your perfect match!</p>
            <Button variant="solid" className="bg-white text-pink-600 hover:bg-pink-50">Play Now</Button>
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

