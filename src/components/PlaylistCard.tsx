
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
          src={imageUrl} 
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <Button 
          size="icon" 
          className="absolute bottom-2 right-2 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl"
        >
          <Play className="h-4 w-4 text-primary-foreground fill-current" />
        </Button>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base leading-tight line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-tight">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
