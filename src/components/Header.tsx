
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20 h-8 w-8 sm:h-10 sm:w-10">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20 h-8 w-8 sm:h-10 sm:w-10">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
          
          <div className="relative flex-1 max-w-sm sm:max-w-md lg:max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="What do you want to listen to?"
              className="pl-10 w-full bg-background/60 border-border/50 focus:bg-background text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-2">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm px-2 sm:px-4 hidden sm:inline-flex">
            Sign up
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 sm:px-8 text-sm">
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
