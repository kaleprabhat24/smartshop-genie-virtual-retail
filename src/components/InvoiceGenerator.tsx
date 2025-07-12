
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, CheckCircle, Star } from 'lucide-react';
import { getProductById } from '@/data/products';

interface CartItem {
  productId: string;
  quantity: number;
}

const InvoiceGenerator = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getTax = () => {
    return getTotalPrice() * 0.08;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getTax();
  };

  const generateInvoice = () => {
    setShowInvoice(true);
    setTimeout(() => {
      setShowRating(true);
    }, 2000);
  };

  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob(['Invoice data would be here'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `SmartShop-Invoice-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No items to invoice</h3>
        <p className="text-gray-500 mb-6">Add some products to your cart first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {!showInvoice ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Generate Invoice</span>
            </CardTitle>
            <p className="text-gray-600">Review your cart and generate a professional invoice</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cart Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Order Summary</h3>
              {cartItems.map(item => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">
                      ${(product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button 
              onClick={generateInvoice}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full"
            >
              <FileText size={16} className="mr-2" />
              Generate Professional Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Invoice */}
          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">SmartShop Genie</h1>
                  </div>
                  <p className="text-gray-600">AI-Powered Shopping Assistant</p>
                  <p className="text-sm text-gray-500">123 Innovation Drive, Tech City, TC 12345</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h2>
                  <p className="text-sm text-gray-600">Invoice #: SSG-{Date.now().toString().slice(-6)}</p>
                  <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <Badge className="bg-green-500 text-white mt-2">PAID</Badge>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
                  <p className="text-gray-600">SmartShop Customer</p>
                  <p className="text-gray-600">customer@smartshop.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Payment Method:</h3>
                  <p className="text-gray-600">Credit Card ending in ****1234</p>
                  <p className="text-gray-600">Transaction ID: TXN-{Date.now().toString().slice(-8)}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-4 gap-4 font-semibold text-gray-800">
                    <span>Item</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span className="text-right">Total</span>
                  </div>
                </div>
                {cartItems.map(item => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                      <span className="text-gray-600">{item.quantity}</span>
                      <span className="text-gray-600">${product.price.toFixed(2)}</span>
                      <span className="text-right font-semibold text-gray-800">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%):</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${getFinalTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-2">Thank you for shopping with SmartShop Genie!</p>
                <p className="text-sm text-gray-500">Questions? Contact us at support@smartshopgenie.com</p>
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">AI-Powered • Privacy-First • Sustainable Shopping</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          <div className="text-center">
            <Button 
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full px-8 py-3"
            >
              <Download size={18} className="mr-2" />
              Download PDF Invoice
            </Button>
          </div>

          {/* Rating Popup */}
          {showRating && (
            <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-2xl">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rate Your Experience</h3>
                <p className="text-gray-600 mb-4">How was your SmartShop Genie experience?</p>
                
                <div className="flex justify-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors duration-200"
                    >
                      <Star 
                        size={32} 
                        className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                      />
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRating(false)}
                    className="flex-1"
                  >
                    Skip
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowRating(false);
                      // Could save rating to localStorage here
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={rating === 0}
                  >
                    Submit Rating
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
