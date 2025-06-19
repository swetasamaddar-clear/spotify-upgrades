
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Waves, Heart } from "lucide-react";

const LullabyBanner = () => {
  const navigate = useNavigate();

  const handleLaunchLullaby = () => {
    navigate("/lullaby");
  };

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80 p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23stars)"/%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="h-8 w-8 text-purple-300" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Lullaby Audio Therapy
              </h2>
            </div>
            
            <p className="text-lg text-purple-100 mb-4 max-w-2xl">
              Immerse yourself in guided meditation sessions designed for anxiety relief, 
              stress reduction, and better sleep cycles. Experience therapeutic audio in a 
              distraction-free environment.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Anxiety Relief</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                <span>Stress Relief</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Sleep Improvement</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button
              onClick={handleLaunchLullaby}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Enter Lullaby Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LullabyBanner;
