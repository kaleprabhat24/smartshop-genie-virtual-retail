
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, TrendingUp, Heart, DollarSign } from 'lucide-react';
import { getProductById } from '@/data/products';

const FloatingCartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [cartAnalytics, setCartAnalytics] = useState({
    totalItems: 0,
    totalPrice: 0,
    totalSavings: 0,
    avgHealthScore: 0,
    ecoScore: 0
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('smartshop-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Listen for cart changes
    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem('smartshop-cart');
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // Calculate analytics
    if (cartItems.length > 0) {
      let totalPrice = 0;
      let totalSavings = 0;
      let totalHealth = 0;
      let ecoItems = 0;

      cartItems.forEach(productId => {
        const product = getProductById(productId);
        if (product) {
          totalPrice += product.price;
          if (product.originalPrice) {
            totalSavings += (product.originalPrice - product.price);
          }
          totalHealth += product.healthScore;
          if (product.category === 'organic' || product.name.toLowerCase().includes('eco')) {
            ecoItems++;
          }
        }
      });

      setCartAnalytics({
        totalItems: cartItems.length,
        totalPrice,
        totalSavings,
        avgHealthScore: totalHealth / cartItems.length,
        ecoScore: (ecoItems / cartItems.length) * 100
      });
    } else {
      setCartAnalytics({
        totalItems: 0,
        totalPrice: 0,
        totalSavings: 0,
        avgHealthScore: 0,
        ecoScore: 0
      });
    }
  }, [cartItems]);

  if (cartAnalytics.totalItems === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <ShoppingCart size={24} />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[24px] h-6 flex items-center justify-center text-xs font-bold">
            {cartAnalytics.totalItems}
          </Badge>
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Smart Cart</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Cart Analytics */}
            <div className="p-6 space-y-4">
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Cart Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Value:</span>
                    <span className="font-bold text-green-600">${cartAnalytics.totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {cartAnalytics.totalSavings > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">You Saved:</span>
                      <span className="font-bold text-orange-600">-${cartAnalytics.totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Health Score:</span>
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-red-500" />
                      <span className="font-bold">{cartAnalytics.avgHealthScore.toFixed(1)}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Eco Score:</span>
                    <Badge className={`${cartAnalytics.ecoScore > 50 ? 'bg-green-500' : cartAnalytics.ecoScore > 25 ? 'bg-yellow-500' : 'bg-gray-500'} text-white`}>
                      {cartAnalytics.ecoScore.toFixed(0)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Items Preview */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Items in Cart</h3>
                {cartItems.slice(0, 3).map((productId, index) => {
                  const product = getProductById(productId);
                  if (!product) return null;

                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-600">${product.price}</p>
                      </div>
                    </div>
                  );
                })}
                
                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-600 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full"
                  onClick={() => {
                    setIsOpen(false);
                    // You could trigger navigation to cart page here
                  }}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  View Full Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full rounded-full"
                  onClick={() => {
                    setIsOpen(false);
                    // You could trigger checkout here
                  }}
                >
                  <DollarSign size={16} className="mr-2" />
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCartSidebar;
