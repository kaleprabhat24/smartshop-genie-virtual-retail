import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, TrendingDown, Heart, AlertCircle } from 'lucide-react';
import { products, getProductById } from '@/data/products';

interface CartItem {
  productId: string;
  quantity: number;
}

const SmartCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('smartshop-cart');
    if (savedCart) {
      const cartProductIds = JSON.parse(savedCart);
      const items = cartProductIds.reduce((acc: CartItem[], productId: string) => {
        const existingItem = acc.find(item => item.productId === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({ productId, quantity: 1 });
        }
        return acc;
      }, []);
      setCartItems(items);
    }
  }, []);

  useEffect(() => {
    // Generate smart recommendations
    if (cartItems.length > 0) {
      const currentProducts = cartItems.map(item => getProductById(item.productId)).filter(Boolean);
      const recs = generateRecommendations(currentProducts);
      setRecommendations(recs);
    }
  }, [cartItems]);

  const generateRecommendations = (currentProducts: any[]) => {
    const recommendations = [];
    
    for (const product of currentProducts) {
      // Find cheaper alternatives
      const alternatives = products.filter(p => 
        p.category === product.category && 
        p.id !== product.id && 
        (p.price < product.price || p.healthScore > product.healthScore)
      );
      
      if (alternatives.length > 0) {
        recommendations.push(...alternatives.slice(0, 2).map(p => p.id));
      }
    }
    
    return [...new Set(recommendations)];
  };

  const updateCart = () => {
    const cartProductIds = cartItems.flatMap(item => 
      Array(item.quantity).fill(item.productId)
    );
    localStorage.setItem('smartshop-cart', JSON.stringify(cartProductIds));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    setTimeout(updateCart, 100);
  };

  const removeFromCart = (productId: string) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedItems);
    setTimeout(updateCart, 100);
  };

  const replaceProduct = (oldProductId: string, newProductId: string) => {
    const updatedItems = cartItems.map(item =>
      item.productId === oldProductId ? { ...item, productId: newProductId } : item
    );
    setCartItems(updatedItems);
    setTimeout(updateCart, 100);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTotalSavings = () => {
    return cartItems.reduce((savings, item) => {
      const product = getProductById(item.productId);
      if (product && product.originalPrice) {
        return savings + ((product.originalPrice - product.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const getHealthScore = () => {
    if (cartItems.length === 0) return 0;
    const totalScore = cartItems.reduce((score, item) => {
      const product = getProductById(item.productId);
      return score + (product ? product.healthScore * item.quantity : 0);
    }, 0);
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
    return Math.round((totalScore / totalItems) * 10) / 10;
  };

  const handleCheckout = () => {
    // Save current cart to history
    const cartHistory = JSON.parse(localStorage.getItem('smartshop-cart-history') || '[]');
    const newCartEntry = cartItems.map(item => ({
      productId: item.productId,
      timestamp: Date.now()
    }));
    
    // Keep only last 3 carts
    const updatedHistory = [newCartEntry, ...cartHistory].slice(0, 3);
    localStorage.setItem('smartshop-cart-history', JSON.stringify(updatedHistory));
    
    // Clear current cart
    setCartItems([]);
    localStorage.removeItem('smartshop-cart');
    
    // Show success message (you could add a toast here)
    alert('🎉 Order placed successfully! Your cart history has been updated for better recommendations.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Add some products to see smart recommendations!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Cart Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span>Smart Cart</span>
            </CardTitle>
            <Badge className="bg-green-500">
              Health Score: {getHealthScore()}/5
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle>Your Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map(item => {
            const product = getProductById(item.productId);
            if (!product) return null;

            return (
              <div key={item.productId} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-green-100 text-green-700">
                      <Heart size={12} className="mr-1" />
                      {product.healthScore}/5
                    </Badge>
                    <span className="text-sm font-semibold text-green-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-green-600" />
              <span>Smart Recommendations</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Save money and eat healthier with these alternatives!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.slice(0, 3).map(productId => {
              const product = getProductById(productId);
              if (!product) return null;

              const currentProduct = cartItems.find(item => 
                getProductById(item.productId)?.category === product.category
              );
              const currentProductData = currentProduct ? getProductById(currentProduct.productId) : null;

              return (
                <div key={productId} className="flex items-center space-x-4 p-4 border border-green-200 rounded-lg bg-green-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-semibold text-green-600">
                        ${product.price}
                      </span>
                      {currentProductData && product.price < currentProductData.price && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Save ${(currentProductData.price - product.price).toFixed(2)}
                        </Badge>
                      )}
                      {product.healthScore > (currentProductData?.healthScore || 0) && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          Healthier
                        </Badge>
                      )}
                    </div>
                  </div>
                  {currentProduct && (
                    <Button
                      size="sm"
                      onClick={() => replaceProduct(currentProduct.productId, productId)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Replace
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Cart Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            {getTotalSavings() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>You saved:</span>
                <span>-${getTotalSavings().toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (estimated):</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="text-sm">Cart Health Score:</span>
              </div>
              <Badge className="bg-green-500">
                {getHealthScore()}/5
              </Badge>
            </div>
          </div>

          <Button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartCart;
