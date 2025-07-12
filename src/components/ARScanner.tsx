
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scan, Camera, Star, Heart, Leaf, TrendingDown, ShoppingCart } from 'lucide-react';
import { products } from '@/data/products';

interface ScannedProduct {
  id: string;
  position: { x: number; y: number };
  isHighlighted: boolean;
}

const ARScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProducts, setScannedProducts] = useState<ScannedProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [scanComplete, setScanComplete] = useState(false);

  const simulateARScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setScannedProducts([]);
    setSelectedProduct(null);

    // Simulate scanning delay
    setTimeout(() => {
      // Generate random positions for products on the "shelf"
      const selectedProducts = products.slice(0, 6);
      const scanned = selectedProducts.map((product, index) => ({
        id: product.id,
        position: {
          x: 20 + (index % 3) * 30,
          y: 20 + Math.floor(index / 3) * 40
        },
        isHighlighted: Math.random() > 0.5 // Randomly highlight some products
      }));

      setScannedProducts(scanned);
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const addToCart = (productId: string) => {
    const savedCart = localStorage.getItem('smartshop-cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    cart.push(productId);
    localStorage.setItem('smartshop-cart', JSON.stringify(cart));
  };

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scan className="h-6 w-6 text-purple-600" />
            <span>AR Product Scanner</span>
          </CardTitle>
          <p className="text-gray-600">Point your camera at products to see instant information and recommendations!</p>
        </CardHeader>
      </Card>

      {/* Scanner Interface */}
      <Card className="min-h-96">
        <CardContent className="p-0">
          <div className="relative bg-gray-900 min-h-96 rounded-lg overflow-hidden">
            {/* Camera Feed Simulation */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            >
              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Scanning Products...</h3>
                    <p className="text-gray-300">AI is analyzing the shelf</p>
                  </div>
                </div>
              )}

              {/* Scanned Products Overlay */}
              {scanComplete && scannedProducts.map(scannedProduct => {
                const product = getProductDetails(scannedProduct.id);
                if (!product) return null;

                return (
                  <div
                    key={scannedProduct.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${scannedProduct.position.x}%`,
                      top: `${scannedProduct.position.y}%`
                    }}
                    onClick={() => setSelectedProduct(scannedProduct.id)}
                  >
                    {/* Product Highlight */}
                    <div className={`w-20 h-20 rounded-full border-4 ${
                      scannedProduct.isHighlighted 
                        ? 'border-yellow-400 bg-yellow-400 bg-opacity-20' 
                        : 'border-blue-400 bg-blue-400 bg-opacity-20'
                    } animate-pulse flex items-center justify-center`}>
                      <div className="text-white text-xs font-bold text-center">
                        ${product.price}
                      </div>
                    </div>

                    {/* Product Info Overlay */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black bg-opacity-80 text-white p-2 rounded text-xs min-w-max">
                      <div className="font-semibold">{product.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-green-500 text-white text-xs">
                          <Star size={10} className="mr-1" />
                          {product.rating}
                        </Badge>
                        {scannedProduct.isHighlighted && (
                          <Badge className="bg-yellow-500 text-white text-xs">
                            DEAL!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Scanning Grid */}
              {!scanComplete && !isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                    <p className="text-gray-300 mb-6">Point at a product shelf and tap scan</p>
                    <Button 
                      onClick={simulateARScan}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      <Scan className="mr-2" size={20} />
                      Scan Shelf
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
            <p className="text-sm text-gray-600">Found {scannedProducts.length} products on this shelf</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scannedProducts.map(scannedProduct => {
                const product = getProductDetails(scannedProduct.id);
                if (!product) return null;

                return (
                  <div 
                    key={scannedProduct.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedProduct === scannedProduct.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProduct(
                      selectedProduct === scannedProduct.id ? null : scannedProduct.id
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-lg font-bold text-green-600">
                            ${product.price}
                          </span>
                          {scannedProduct.isHighlighted && (
                            <Badge className="bg-yellow-500">
                              Special Deal!
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className="bg-green-100 text-green-700">
                            <Heart size={12} className="mr-1" />
                            Health: {product.healthScore}/5
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700">
                            <Star size={12} className="mr-1" />
                            {product.rating}
                          </Badge>
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <Leaf size={12} className="mr-1" />
                            Eco: {product.ecoScore}/5
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {selectedProduct === scannedProduct.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        
                        {product.nutrients && (
                          <div className="bg-gray-50 p-3 rounded mb-3">
                            <h5 className="font-medium text-sm mb-2">Nutrition Facts (per serving)</h5>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span>Calories: {product.nutrients.calories}</span>
                              <span>Protein: {product.nutrients.protein}g</span>
                              <span>Carbs: {product.nutrients.carbs}g</span>
                              <span>Fat: {product.nutrients.fat}g</span>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => addToCart(product.id)}
                            className="flex-1"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <TrendingDown size={16} className="mr-2" />
                            Compare
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-800 mb-2">AR Scanner Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Point your camera directly at product shelves</li>
            <li>• Look for highlighted products with special deals</li>
            <li>• Tap on any product overlay to see detailed information</li>
            <li>• Use AR scanning to compare prices and health scores instantly</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARScanner;
