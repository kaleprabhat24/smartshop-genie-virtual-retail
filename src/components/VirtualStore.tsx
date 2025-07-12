import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Apple, Coffee, Shirt, Zap, Home, ShoppingCart, User, Star, Clock } from 'lucide-react';
import { products } from '@/data/products';

const VirtualStore = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<string[]>(
    JSON.parse(localStorage.getItem('smartshop-cart') || '[]')
  );
  const [userAvatar, setUserAvatar] = useState('🛍️');
  const [avatarPosition, setAvatarPosition] = useState({ x: 50, y: 50 });
  const [isAvatarMoving, setIsAvatarMoving] = useState(false);

  useEffect(() => {
    // Get user avatar from profile
    const savedAvatar = localStorage.getItem('userAvatar') || 'shopperClassic';
    const avatarEmojis = {
      shopperClassic: '🛍️',
      budgetBuyer: '💰',
      ecoExplorer: '🌱',
      trendSeeker: '🔥',
      healthFocus: '💪',
      familyShopper: '👨‍👩‍👧‍👦'
    };
    setUserAvatar(avatarEmojis[savedAvatar as keyof typeof avatarEmojis] || '🛍️');
  }, []);

  const storeSections = [
    {
      id: 'produce',
      name: 'Fresh Produce',
      icon: Apple,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
      position: { top: '165%', left: '30%' },
      category: 'Produce',
      items: ['🥕 Carrots', '🥬 Lettuce', '🍎 Apples', '🍌 Bananas']
    },
    {
      id: 'beverages',
      name: 'Beverages',
      icon: Coffee,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-100',
      position: { top: '395%', right: '-5%' },
      category: 'Beverages',
      items: ['☕ Coffee', '🥤 Soda', '🧃 Juice', '💧 Water']
    },
    {
      id: 'snacks',
      name: 'Snacks & Pantry',
      icon: Zap,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-100',
      position: { top: '395%', left: '10%' },
      category: 'Snacks',
      items: ['🍪 Cookies', '🥨 Pretzels', '🍿 Popcorn', '🥜 Nuts']
    },
    {
      id: 'household',
      name: 'Household',
      icon: Home,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-100',
      position: { top: '395%', right: '15%' },
      category: 'Household',
      items: ['🧴 Shampoo', '🧼 Soap', '🧻 Paper', '🧽 Sponges']
    },
    {
      id: 'dairy',
      name: 'Dairy & Eggs',
      icon: ShoppingCart,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-100',
      position: { top: '395%', left: '30%' },
      category: 'Dairy',
      items: ['🥛 Milk', '🧀 Cheese', '🥚 Eggs', '🧈 Butter']
    },
    {
      id: 'health',
      name: 'Health & Beauty',
      icon: Star,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-100',
      position: { top: '395%', right: '35%' },
      category: 'Health',
      items: ['💊 Vitamins', '🧴 Lotion', '🪥 Toothpaste', '💄 Cosmetics']
    }
  ];

  const moveAvatarToSection = (sectionPosition: { top: string; left?: string; right?: string }) => {
    setIsAvatarMoving(true);
    
    // Calculate target position
    const targetX = sectionPosition.left ? 
      parseInt(sectionPosition.left) : 
      100 - parseInt(sectionPosition.right || '50');
    const targetY = parseInt(sectionPosition.top);
    
    setAvatarPosition({ x: targetX, y: targetY });
    
    // Reset moving state after animation
    setTimeout(() => setIsAvatarMoving(false), 1000);
  };

  const addToCart = (productId: string, sectionId: string) => {
    const updatedCart = [...cartItems, productId];
    setCartItems(updatedCart);
    localStorage.setItem('smartshop-cart', JSON.stringify(updatedCart));
    
    // Animate avatar reaching for product
    setIsAvatarMoving(true);
    setTimeout(() => setIsAvatarMoving(false), 500);
  };

  const getSectionProducts = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">🏪 Virtual Walmart Experience</h1>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto mb-6">
              Navigate through our immersive store layout with your personal avatar. 
              Click sections to explore and watch your avatar guide you!
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-4xl animate-bounce">{userAvatar}</div>
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                Your Shopping Avatar
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Store Map */}
      <Card className="min-h-[700px] relative overflow-hidden shadow-2xl">
        <CardContent className="p-0 h-full relative">
          {/* Store Background with Grid Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
            {/* Floor Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 40px),
                                   repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 40px)`
                 }}>
            </div>
            
            {/* Store Layout Container */}
            <div className="absolute inset-8 pb-32 border-4 border-dashed border-blue-300 rounded-2xl bg-white/30 backdrop-blur-sm">
              {/* Entrance */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-xl">
                  <CardContent className="px-8 py-4 text-center">
                    <div className="text-2xl mb-2">🚪</div>
                    <div className="font-bold">Store Entrance</div>
                    <div className="text-sm opacity-90">Welcome to Walmart!</div>
                  </CardContent>
                </Card>
              </div>

              {/* User Avatar */}
              <div 
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-30 ${
                  isAvatarMoving ? 'scale-125 animate-bounce' : 'scale-100'
                }`}
                style={{
                  left: `${avatarPosition.x}%`,
                  top: `${avatarPosition.y}%`
                }}
              >
                <div className="relative">
                  <div className="text-6xl filter drop-shadow-lg animate-pulse">
                    {userAvatar}
                  </div>
                  {isAvatarMoving && (
                    <div className="absolute -top-2 -right-2 text-2xl animate-spin">
                      ✨
                    </div>
                  )}
                </div>
              </div>

              {/* Store Sections */}
              {storeSections.map((section) => (
                <div
                  key={section.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={section.position}
                  onClick={() => {
                    setSelectedSection(section.id);
                    moveAvatarToSection(section.position);
                  }}
                >
                  <Card className={`transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-2 ${section.bgColor} border-2 hover:border-blue-400 group-hover:z-20 relative`}>
                    <CardContent className="p-6 text-center min-w-[180px]">
                      <div className={`w-20 h-20 bg-gradient-to-br ${section.color} rounded-3xl flex items-center justify-center shadow-xl mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300`}>
                        <section.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">{section.name}</h3>
                      <div className="space-y-1 mb-3">
                        {section.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">{item}</div>
                        ))}
                      </div>
                      <Badge className="bg-white text-gray-700 shadow-md">
                        {getSectionProducts(section.category).length} products
                      </Badge>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* Shopping Cart Status */}
              <div className="absolute top-6 right-6">
                <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-8 w-8" />
                      <div>
                        <div className="font-bold text-lg">{cartItems.length}</div>
                        <div className="text-sm opacity-90">Items in Cart</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Store Info Panel */}
              <div className="absolute top-6 left-6">
                <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-8 w-8" />
                      <div>
                        <div className="font-bold">Open 24/7</div>
                        <div className="text-sm opacity-90">Always Here for You</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Products Display */}
      {selectedSection && (
        <Card className="shadow-2xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {(() => {
                  const section = storeSections.find(s => s.id === selectedSection);
                  return section ? <section.icon className="h-8 w-8 text-blue-600" /> : null;
                })()}
                <span className="text-2xl font-bold text-gray-800">
                  {storeSections.find(s => s.id === selectedSection)?.name} Section
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedSection(null)}
                className="hover:bg-blue-100"
              >
                ← Back to Store Map
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSectionProducts(
                storeSections.find(s => s.id === selectedSection)?.category || ''
              ).map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.tags.includes('bestseller') && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white animate-pulse">
                          🔥 Hot
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-gray-800 mb-2 text-lg">{product.name}</h4>
                    <p className="text-gray-600 mb-3">{product.brand}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <Button
                        onClick={() => addToCart(product.id, selectedSection)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold transform hover:scale-105 transition-all duration-200"
                      >
                        Add to Cart
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {product.tags.includes('organic') && (
                        <Badge className="bg-green-100 text-green-700 animate-pulse">
                          🌱 Organic
                        </Badge>
                      )}
                      {product.healthScore >= 4 && (
                        <Badge className="bg-blue-100 text-blue-700">
                          ❤️ Healthy Choice
                        </Badge>
                      )}
                      {product.tags.includes('bestseller') && (
                        <Badge className="bg-orange-100 text-orange-700">
                          ⭐ Bestseller
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Store Experience Features */}
      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200">
        <CardContent className="p-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">🎮 Immersive Shopping Experience</h3>
            <p className="text-gray-600 text-lg">Next-generation retail technology at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <User className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Personal Avatar</h4>
              <p className="text-gray-600">Your digital shopping companion</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white text-2xl">🗺️</span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Interactive Map</h4>
              <p className="text-gray-600">Navigate like a real store</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Smooth Animations</h4>
              <p className="text-gray-600">Delightful micro-interactions</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Premium Experience</h4>
              <p className="text-gray-600">Enterprise-grade design</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualStore;

