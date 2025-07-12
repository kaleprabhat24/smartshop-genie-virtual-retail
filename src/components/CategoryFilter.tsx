
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Coffee, Apple, Shirt, Gamepad2, Heart, Leaf } from 'lucide-react';

interface CategoryFilterProps {
  setActiveTab: (tab: string) => void;
}

const CategoryFilter = ({ setActiveTab }: CategoryFilterProps) => {
  const categories = [
    {
      id: 'beverages',
      name: 'Beverages',
      icon: Coffee,
      count: 15,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50'
    },
    {
      id: 'snacks',
      name: 'Snacks',
      icon: Apple,
      count: 22,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: Shirt,
      count: 8,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: Gamepad2,
      count: 12,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    }
  ];

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Search className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold">🔍 Discover by Category</span>
          </div>
          <Button 
            onClick={() => setActiveTab('products')}
            className="bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            View All Products
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br ${category.bgColor}`}
              onClick={() => setActiveTab('products')}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                <Badge className="bg-white/80 text-gray-700 mb-3">
                  {category.count} products
                </Badge>
                <div className="flex justify-center space-x-2">
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <Leaf size={10} className="mr-1" />
                    Eco-friendly
                  </Badge>
                  <Badge className="bg-red-100 text-red-700 text-xs">
                    <Heart size={10} className="mr-1" />
                    Bestseller
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryFilter;
