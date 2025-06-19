
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Waves, Moon } from "lucide-react";
import { therapySessions } from "@/data/therapyContent";

interface TherapyCategoriesProps {
  onSessionSelect: (session: any) => void;
}

const TherapyCategories = ({ onSessionSelect }: TherapyCategoriesProps) => {
  const categories = [
    {
      id: "anxiety",
      title: "Anxiety Relief",
      description: "Breathing exercises and calming meditations",
      icon: Heart,
      color: "from-rose-500/20 to-pink-500/20",
      borderColor: "border-rose-500/30"
    },
    {
      id: "stress",
      title: "Stress Relief", 
      description: "Progressive relaxation and ambient sounds",
      icon: Waves,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      id: "sleep",
      title: "Sleep Improvement",
      description: "Sleep stories and gentle lullabies",
      icon: Moon,
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Choose Your Therapy
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Select a category that matches your current needs and begin your journey to wellness
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const sessions = therapySessions.filter(s => s.category === category.id);
          
          return (
            <Card key={category.id} className={`bg-gradient-to-br ${category.color} border ${category.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
              <CardHeader className="text-center">
                <IconComponent className="h-12 w-12 mx-auto mb-4 text-white" />
                <CardTitle className="text-2xl text-white">{category.title}</CardTitle>
                <CardDescription className="text-white/70 text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessions.map((session) => (
                  <Button
                    key={session.id}
                    variant="ghost"
                    onClick={() => onSessionSelect(session)}
                    className="w-full justify-between text-white/90 hover:text-white hover:bg-white/10 p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-white/60">{session.description}</div>
                    </div>
                    {/* Duration removed */}
                  </Button>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TherapyCategories;
