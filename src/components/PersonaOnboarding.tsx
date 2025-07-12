
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Leaf, TrendingUp, X } from 'lucide-react';

interface PersonaOnboardingProps {
  onComplete: () => void;
}

const PersonaOnboarding = ({ onComplete }: PersonaOnboardingProps) => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const personas = [
    {
      id: 'budget',
      name: 'Budget Guru',
      emoji: '🧠',
      icon: Brain,
      description: 'I help you save money with smart deals and budget-friendly alternatives',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      benefits: ['Find best deals', 'Compare prices', 'Track savings']
    },
    {
      id: 'eco',
      name: 'Eco Warrior',
      emoji: '🌱',
      icon: Leaf,
      description: 'I focus on sustainable, eco-friendly products for conscious shopping',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50',
      benefits: ['Eco-friendly options', 'Sustainability scores', 'Carbon footprint']
    },
    {
      id: 'trend',
      name: 'Trend Seeker',
      emoji: '🔥',
      icon: TrendingUp,
      description: 'I discover the latest trends and popular products just for you',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      benefits: ['Latest trends', 'Popular picks', 'New arrivals']
    }
  ];

  const handleComplete = () => {
    if (selectedPersona) {
      localStorage.setItem('userPersona', selectedPersona);
      localStorage.setItem('hasSeenPersonaOnboarding', 'true');
    }
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComplete}
            className="absolute right-2 top-2"
          >
            <X size={20} />
          </Button>
          <CardTitle className="text-3xl font-bold mb-2">
            🎯 Choose Your Shopping Assistant
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Select a persona that matches your shopping style for personalized recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <Card
                key={persona.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedPersona === persona.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                } bg-gradient-to-br ${persona.bgColor}`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${persona.color} rounded-3xl flex items-center justify-center shadow-xl mb-4 mx-auto`}>
                    <span className="text-3xl">{persona.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{persona.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {persona.description}
                  </p>
                  <div className="space-y-2">
                    {persona.benefits.map((benefit, index) => (
                      <Badge key={index} className="bg-white/80 text-gray-700 text-xs">
                        ✓ {benefit}
                      </Badge>
                    ))}
                  </div>
                  {selectedPersona === persona.id && (
                    <Badge className="bg-blue-500 text-white mt-3">
                      Selected ✓
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={handleComplete}
              disabled={!selectedPersona}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold text-lg"
            >
              {selectedPersona ? '🚀 Start Shopping with My Assistant' : '⏭️ Skip for Now'}
            </Button>
            <p className="text-sm text-gray-500">
              You can change your persona anytime in settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaOnboarding;
