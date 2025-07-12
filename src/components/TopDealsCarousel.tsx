
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Zap, Heart } from 'lucide-react';

const TopDealsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const deals = [
    {
      id: 1,
      name: "Premium Organic Coffee",
      price: 12.99,
      originalPrice: 18.99,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop",
      discount: "32% OFF",
      rating: 4.8,
      tag: "🔥 Hot Deal"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=200&fit=crop",
      discount: "31% OFF",
      rating: 4.9,
      tag: "⚡ Flash Sale"
    },
    {
      id: 3,
      name: "Organic Protein Bars",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      discount: "29% OFF",
      rating: 4.7,
      tag: "🌱 Eco Choice"
    },
    {
      id: 4,
      name: "Wireless Earbuds Pro",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop",
      discount: "25% OFF",
      rating: 4.9,
      tag: "🎵 Premium Audio"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-red-50">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🔥 Today's Top Deals</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full hover:bg-orange-100"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full hover:bg-orange-100"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {deals.map((deal) => (
              <div key={deal.id} className="w-full flex-shrink-0">
                <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 mx-2">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="relative">
                        <img 
                          src={deal.image} 
                          alt={deal.name}
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white font-bold px-3 py-1">
                          {deal.discount}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full">
                          {deal.tag}
                        </Badge>
                        
                        <h3 className="text-2xl font-bold text-gray-800">{deal.name}</h3>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({deal.rating})</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-green-600">${deal.price}</span>
                          <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full flex-1">
                            <Zap size={16} className="mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            <Heart size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDealsCarousel;
