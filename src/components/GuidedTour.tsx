
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowRight } from 'lucide-react';

const GuidedTour = () => {
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: "Welcome to SmartShop Genie! 🧞‍♂️",
      description: "Your AI-powered shopping assistant is here to revolutionize your retail experience. Let's take a quick tour!",
      position: "center"
    },
    {
      title: "AI Chat Assistant 🤖",
      description: "Chat with our intelligent assistant to find products, get recommendations, and discover deals tailored just for you.",
      position: "center"
    },
    {
      title: "Smart Cart Analytics 📊",
      description: "Your cart automatically calculates health scores, savings, and sustainability metrics to help you make better choices.",
      position: "center"
    },
    {
      title: "Virtual Store Navigation 🗺️",
      description: "Explore our virtual store layout and discover products organized just like your local Walmart.",
      position: "center"
    },
    {
      title: "Personal Dashboard 📈",
      description: "Track your savings, health scores, and achievements over time with beautiful analytics and insights.",
      position: "center"
    }
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      // Show tour after a brief delay to let the page load
      setTimeout(() => setShowTour(true), 2000);
    }
  }, []);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const completeTour = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setShowTour(false);
    setCurrentStep(0);
  };

  if (!showTour) return null;

  const step = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto animate-scale-in">
        <CardContent className="p-8 text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={completeTour}
            className="absolute right-2 top-2"
          >
            <X size={20} />
          </Button>

          {/* Step indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={completeTour}
              className="text-gray-600"
            >
              Skip Tour
            </Button>
            
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                {currentStep === tourSteps.length - 1 ? (
                  'Get Started! 🚀'
                ) : (
                  <>
                    Next <ArrowRight size={16} className="ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Fun fact */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Fun Fact:</strong> Users save an average of $127 per month using SmartShop Genie's AI recommendations!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedTour;
