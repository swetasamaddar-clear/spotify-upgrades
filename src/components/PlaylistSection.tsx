
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
        <h2 className="text-2xl font-bold text-foreground hover:underline cursor-pointer">
          {title}
        </h2>
        <button className="text-sm text-muted-foreground hover:text-foreground font-medium">
          Show all
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.title}
            description={playlist.description}
            imageUrl={playlist.imageUrl}
            onClick={() => onPlaylistClick?.(playlist)}
          />
        ))}
      </div>
    </section>
  );
};

export default PlaylistSection;
