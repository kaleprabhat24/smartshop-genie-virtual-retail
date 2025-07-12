
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ShoppingCart, Brain, TrendingDown, Leaf, Heart } from 'lucide-react';
import { getProductById } from '@/data/products';

const CartComparison = () => {
  const [currentCart, setCurrentCart] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('smartshop-cart');
    if (savedCart) {
      setCurrentCart(JSON.parse(savedCart));
    }
  }, []);

  const generateOptimizedCart = () => {
    // Simple logic to create an "AI-optimized" version of the current cart
    return currentCart.map(productId => {
      const product = getProductById(productId);
      if (!product) return productId;
      
      // Find a "better" alternative (higher health score or lower price)
      const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const alternatives = allProducts.filter((p: any) => 
        p.category === product.category && 
        p.id !== product.id && 
        (p.healthScore > product.healthScore || p.price < product.price)
      );
      
      return alternatives.length > 0 ? alternatives[0].id : productId;
    });
  };

  const calculateCartStats = (cart: string[]) => {
    const totalPrice = cart.reduce((sum, productId) => {
      const product = getProductById(productId);
      return sum + (product ? product.price : 0);
    }, 0);

    const avgHealthScore = cart.length > 0 ? cart.reduce((sum, productId) => {
      const product = getProductById(productId);
      return sum + (product ? product.healthScore : 0);
    }, 0) / cart.length : 0;

    const ecoScore = cart.reduce((sum, productId) => {
      const product = getProductById(productId);
      return sum + (product && product.tags.includes('organic') ? 1 : 0);
    }, 0);

    return {
      totalPrice: totalPrice.toFixed(2),
      avgHealthScore: avgHealthScore.toFixed(1),
      ecoScore: Math.min((ecoScore / cart.length) * 100, 100)
    };
  };

  if (currentCart.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-3">🤖 AI Cart Optimization</h3>
          <p className="text-gray-600 mb-4">
            Add items to your cart to see how our AI can optimize it for savings, health, and sustainability!
          </p>
          <Badge className="bg-blue-500 text-white px-4 py-2">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    );
  }

  const optimizedCart = generateOptimizedCart();
  const currentStats = calculateCartStats(currentCart);
  const optimizedStats = calculateCartStats(optimizedCart);
  const savings = (parseFloat(currentStats.totalPrice) - parseFloat(optimizedStats.totalPrice)).toFixed(2);

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-purple-600" />
          <span>🤖 AI Cart Optimization</span>
          <Badge className="bg-purple-100 text-purple-700">
            Smart Recommendations
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showComparison ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Let our AI analyze your cart and suggest optimizations for better value, health, and sustainability!
            </p>
            <Button
              onClick={() => setShowComparison(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-bold"
            >
              🔍 Analyze My Cart
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Cart */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <ShoppingCart size={20} />
                <span>Your Current Cart</span>
              </h3>
              <Card className="bg-white border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Cost:</span>
                    <span className="font-bold text-lg">${currentStats.totalPrice}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Health Score:</span>
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Heart size={12} className="mr-1" />
                        {currentStats.avgHealthScore}/5
                      </Badge>
                    </div>
                    <Progress value={parseFloat(currentStats.avgHealthScore) * 20} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Eco Score:</span>
                      <Badge className="bg-green-100 text-green-700">
                        <Leaf size={12} className="mr-1" />
                        {currentStats.ecoScore.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={currentStats.ecoScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Optimized Cart */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <Brain size={20} className="text-purple-600" />
                <span>AI-Optimized Cart</span>
                <Badge className="bg-purple-500 text-white">Recommended</Badge>
              </h3>
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Cost:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-green-600">${optimizedStats.totalPrice}</span>
                      {parseFloat(savings) > 0 && (
                        <Badge className="bg-green-500 text-white">
                          <TrendingDown size={12} className="mr-1" />
                          Save ${savings}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Health Score:</span>
                      <Badge className="bg-green-100 text-green-700">
                        <Heart size={12} className="mr-1" />
                        {optimizedStats.avgHealthScore}/5
                      </Badge>
                    </div>
                    <Progress value={parseFloat(optimizedStats.avgHealthScore) * 20} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Eco Score:</span>
                      <Badge className="bg-green-100 text-green-700">
                        <Leaf size={12} className="mr-1" />
                        {optimizedStats.ecoScore.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={optimizedStats.ecoScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {showComparison && (
          <div className="text-center">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-bold">
              🛒 Apply AI Recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartComparison;
