
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { User, Heart, DollarSign, ShoppingBag, Save } from 'lucide-react';

interface UserPrefs {
  name: string;
  budget: number;
  dietaryRestrictions: string[];
  healthFocus: number;
  ecoFriendly: boolean;
  categories: string[];
  allergies: string[];
}

const UserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPrefs>({
    name: '',
    budget: 100,
    dietaryRestrictions: [],
    healthFocus: 3,
    ecoFriendly: false,
    categories: [],
    allergies: []
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem('smartshop-preferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('smartshop-preferences', JSON.stringify(preferences));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat', 'Dairy-Free'
  ];

  const categoryOptions = [
    'Produce', 'Dairy', 'Meat', 'Seafood', 'Bakery', 'Beverages', 'Snacks', 'Frozen', 'Pantry'
  ];

  const allergyOptions = [
    'Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame'
  ];

  const handleDietaryChange = (option: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, option]
        : prev.dietaryRestrictions.filter(item => item !== option)
    }));
  };

  const handleCategoryChange = (option: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, option]
        : prev.categories.filter(item => item !== option)
    }));
  };

  const handleAllergyChange = (option: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      allergies: checked 
        ? [...prev.allergies, option]
        : prev.allergies.filter(item => item !== option)
    }));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-6 w-6 text-indigo-600" />
            <span>Personalization Settings</span>
          </CardTitle>
          <p className="text-gray-600">Customize your shopping experience for better recommendations</p>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              value={preferences.name}
              onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label>Weekly Shopping Budget: ${preferences.budget}</Label>
            <div className="mt-2">
              <Slider
                value={[preferences.budget]}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value[0] }))}
                max={500}
                min={25}
                step={25}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$25</span>
              <span>$500</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Focus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Health & Wellness</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Health Focus Level: {preferences.healthFocus}/5</Label>
            <div className="mt-2">
              <Slider
                value={[preferences.healthFocus]}
                onValueChange={(value) => setPreferences(prev => ({ ...prev, healthFocus: value[0] }))}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="eco-friendly"
              checked={preferences.ecoFriendly}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, ecoFriendly: checked as boolean }))}
            />
            <Label htmlFor="eco-friendly">Prioritize eco-friendly products</Label>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Preferences</CardTitle>
          <p className="text-sm text-gray-600">Select all that apply to you</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietaryOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`diet-${option}`}
                  checked={preferences.dietaryRestrictions.includes(option)}
                  onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                />
                <Label htmlFor={`diet-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle>Allergies & Intolerances</CardTitle>
          <p className="text-sm text-gray-600">Help us keep you safe by avoiding these ingredients</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allergyOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergy-${option}`}
                  checked={preferences.allergies.includes(option)}
                  onCheckedChange={(checked) => handleAllergyChange(option, checked as boolean)}
                />
                <Label htmlFor={`allergy-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Favorite Categories</span>
          </CardTitle>
          <p className="text-sm text-gray-600">We'll show more products from these categories</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${option}`}
                  checked={preferences.categories.includes(option)}
                  onCheckedChange={(checked) => handleCategoryChange(option, checked as boolean)}
                />
                <Label htmlFor={`category-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Your Profile Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {preferences.name && (
            <div>
              <span className="font-medium">Name: </span>
              <span>{preferences.name}</span>
            </div>
          )}
          
          <div>
            <span className="font-medium">Budget: </span>
            <Badge className="bg-green-100 text-green-700">
              <DollarSign size={12} className="mr-1" />
              ${preferences.budget}/week
            </Badge>
          </div>

          <div>
            <span className="font-medium">Health Focus: </span>
            <Badge className="bg-red-100 text-red-700">
              <Heart size={12} className="mr-1" />
              {preferences.healthFocus}/5
            </Badge>
          </div>

          {preferences.dietaryRestrictions.length > 0 && (
            <div>
              <span className="font-medium">Dietary: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {preferences.dietaryRestrictions.map(diet => (
                  <Badge key={diet} variant="outline" className="text-xs">
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {preferences.allergies.length > 0 && (
            <div>
              <span className="font-medium">Allergies: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {preferences.allergies.map(allergy => (
                  <Badge key={allergy} className="bg-red-100 text-red-700 text-xs">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="text-center">
        <Button 
          onClick={savePreferences}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          size="lg"
        >
          <Save className="mr-2" size={20} />
          {isSaved ? 'Preferences Saved!' : 'Save Preferences'}
        </Button>
        
        {isSaved && (
          <p className="text-sm text-green-600 mt-2">
            ✅ Your preferences have been saved and will be used for personalized recommendations!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPreferences;
