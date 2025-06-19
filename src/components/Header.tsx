
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20">
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20">
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="What do you want to listen to?"
              className="pl-10 w-80 bg-black/20 border-gray-800 focus:bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-gray-300">
            Sign up
          </Button>
          <Button className="bg-[#1DB954] text-black hover:bg-[#1DB954]/90 rounded-full px-4">
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
