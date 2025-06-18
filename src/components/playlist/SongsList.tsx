
import { Play } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumCover: string;
}

interface SongsListProps {
  songs: Song[];
}

export const SongsList = ({ songs }: SongsListProps) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border/50">
        <span>#</span>
        <span>Title</span>
        <span>Duration</span>
      </div>
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-center w-8">
            <span className="text-muted-foreground group-hover:hidden">
              {index + 1}
            </span>
            <Play className="h-4 w-4 text-foreground hidden group-hover:block" />
          </div>
          <div className="flex items-center gap-3">
            <img
              src={song.albumCover}
              alt={song.title}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground">{song.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
