
import PlaylistCard from "./PlaylistCard";

interface Playlist {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

interface PlaylistSectionProps {
  title: string;
  playlists: Playlist[];
  onPlaylistClick?: (playlist: Playlist) => void;
}

const PlaylistSection = ({ title, playlists, onPlaylistClick }: PlaylistSectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
          {title}
        </h2>
        <button className="flex items-center text-sm font-medium text-gray-400 hover:text-white">
          Show all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <PlaylistCard
              title={playlist.title}
              description={playlist.description}
              imageUrl={playlist.imageUrl}
              onClick={() => onPlaylistClick?.(playlist)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlaylistSection;
