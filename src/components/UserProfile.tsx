
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, ShoppingBag, Leaf, TrendingUp } from 'lucide-react';

const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('userAvatar') || 'shopperClassic';
  });
  const [shoppingStyle, setShoppingStyle] = useState(() => {
    return localStorage.getItem('shoppingStyle') || 'smart';
  });

  const avatars = [
    { id: 'shopperClassic', emoji: '🛍️', name: 'Classic Shopper', style: 'Traditional and reliable' },
    { id: 'budgetBuyer', emoji: '💰', name: 'Budget Buyer', style: 'Smart and savvy' },
    { id: 'ecoExplorer', emoji: '🌱', name: 'Eco Explorer', style: 'Sustainable choices' },
    { id: 'trendSeeker', emoji: '🔥', name: 'Trend Seeker', style: 'Latest and greatest' },
    { id: 'healthFocus', emoji: '💪', name: 'Health Focused', style: 'Wellness priority' },
    { id: 'familyShopper', emoji: '👨‍👩‍👧‍👦', name: 'Family Shopper', style: 'Everyone\'s needs' }
  ];

  const shoppingStyles = [
    { id: 'smart', icon: TrendingUp, name: 'Smart Explorer', description: 'Balanced approach to shopping' },
    { id: 'budget', icon: ShoppingBag, name: 'Budget Buyer', description: 'Maximum value for money' },
    { id: 'eco', icon: Leaf, name: 'Eco Lover', description: 'Environmentally conscious' }
  ];

  const saveProfile = () => {
    localStorage.setItem('userAvatar', selectedAvatar);
    localStorage.setItem('shoppingStyle', shoppingStyle);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <User className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-4">👤 Your Shopping Profile</h1>
          <p className="text-blue-100 text-lg">
            Customize your avatar and shopping style for a personalized experience
          </p>
        </CardContent>
      </Card>

      {/* Avatar Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <span className="text-2xl">🎭</span>
            <span>Choose Your Avatar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {avatars.map((avatar) => (
              <Card
                key={avatar.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedAvatar === avatar.id 
                    ? 'border-blue-500 shadow-lg bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedAvatar(avatar.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{avatar.emoji}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{avatar.name}</h3>
                  <p className="text-sm text-gray-600">{avatar.style}</p>
                  {selectedAvatar === avatar.id && (
                    <Badge className="bg-blue-500 text-white mt-3">
                      Selected ✓
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shopping Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <span className="text-2xl">🎯</span>
            <span>Shopping Style</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shoppingStyles.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  shoppingStyle === style.id 
                    ? 'border-green-500 shadow-lg bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => setShoppingStyle(style.id)}
              >
                <CardContent className="p-6 text-center">
                  <style.icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-bold text-gray-800 mb-2">{style.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                  {shoppingStyle === style.id && (
                    <Badge className="bg-green-500 text-white">
                      Active ✓
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Profile */}
      <div className="text-center">
        <Button
          onClick={saveProfile}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold text-lg"
        >
          💾 Save My Profile
        </Button>
      </div>

      {/* Current Profile Summary */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Current Profile</h3>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-5xl mb-2">
                {avatars.find(a => a.id === selectedAvatar)?.emoji}
              </div>
              <p className="font-semibold">{avatars.find(a => a.id === selectedAvatar)?.name}</p>
            </div>
            <div className="text-4xl text-gray-400">+</div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                {React.createElement(shoppingStyles.find(s => s.id === shoppingStyle)?.icon || TrendingUp, {
                  className: "h-8 w-8 text-white"
                })}
              </div>
              <p className="font-semibold">{shoppingStyles.find(s => s.id === shoppingStyle)?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
