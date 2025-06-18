
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaylistCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  onClick?: () => void;
}

const PlaylistCard = ({ title, description, imageUrl, onClick }: PlaylistCardProps) => {
  return (
    <div 
      className="group relative bg-card rounded-lg p-4 playlist-card-hover cursor-pointer"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <img
          src={`https://source.unsplash.com/300x300/?${encodeURIComponent(title)},love`}
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity text-pink-400 text-6xl pointer-events-none">
          ❤️
        </div>
        <Button
          size="icon"
          className="absolute bottom-2 right-2 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl"
        >
          <Play className="h-4 w-4 text-primary-foreground fill-current" />
        </Button>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
