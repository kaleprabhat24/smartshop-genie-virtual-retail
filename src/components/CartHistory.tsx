
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, ShoppingBag, Plus } from 'lucide-react';
import { getProductById } from '@/data/products';

interface CartHistoryItem {
  productId: string;
  timestamp: number;
}

const CartHistory = () => {
  const [cartHistory, setCartHistory] = useState<CartHistoryItem[][]>([]);
  const [currentCart, setCurrentCart] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Load cart history from localStorage
    const savedHistory = localStorage.getItem('smartshop-cart-history');
    if (savedHistory) {
      setCartHistory(JSON.parse(savedHistory));
    }

    // Load current cart
    const savedCart = localStorage.getItem('smartshop-cart');
    if (savedCart) {
      setCurrentCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Generate recommendations based on cart history
    if (cartHistory.length > 0) {
      const frequentItems = getFrequentlyBoughtTogether();
      const filteredRecommendations = frequentItems.filter(productId => 
        !currentCart.includes(productId)
      );
      setRecommendations(filteredRecommendations.slice(0, 3));
    }
  }, [cartHistory, currentCart]);

  const getFrequentlyBoughtTogether = () => {
    const itemFrequency: { [key: string]: number } = {};
    
    // Count frequency of items in past carts
    cartHistory.forEach(cart => {
      cart.forEach(item => {
        itemFrequency[item.productId] = (itemFrequency[item.productId] || 0) + 1;
      });
    });

    // Sort by frequency and return top items
    return Object.entries(itemFrequency)
      .sort(([,a], [,b]) => b - a)
      .map(([productId]) => productId);
  };

  const addToCart = (productId: string) => {
    const updatedCart = [...currentCart, productId];
    setCurrentCart(updatedCart);
    localStorage.setItem('smartshop-cart', JSON.stringify(updatedCart));
    
    // Remove from recommendations
    setRecommendations(prev => prev.filter(id => id !== productId));
  };

  if (cartHistory.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-3">🧠 Smart Learning in Progress</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your cart history helps us recommend better — start shopping now to unlock personalized suggestions!
          </p>
          <Badge className="bg-purple-500 text-white px-4 py-2">
            First-Time Experience
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <Brain className="h-6 w-6 text-purple-600" />
          <span>🧠 Frequently Bought Together</span>
          <Badge className="bg-purple-100 text-purple-700 ml-2">
            Based on {cartHistory.length} past carts
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map(productId => {
              const product = getProductById(productId);
              if (!product) return null;

              return (
                <div key={productId} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-purple-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(productId)}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-xs font-semibold"
                    >
                      <Plus size={14} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">All your frequently bought items are already in your cart!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartHistory;
