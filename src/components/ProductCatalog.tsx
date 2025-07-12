
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ShoppingCart, Star, Heart, Leaf } from 'lucide-react';
import { products, categories, searchProducts, getProductsByCategory, Product } from '@/data/products';

const ProductCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('smartshop-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    let result = products;

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery).filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'health':
          return b.healthScore - a.healthScore;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortBy]);

  const addToCart = (productId: string) => {
    const newCart = [...cart, productId];
    setCart(newCart);
    localStorage.setItem('smartshop-cart', JSON.stringify(newCart));
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600 bg-green-100';
    if (score >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 4) return 'text-emerald-600 bg-emerald-100';
    if (score >= 3) return 'text-lime-600 bg-lime-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Product Catalog</h2>
        <p className="text-gray-600">Discover amazing products with smart recommendations</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="health">Health Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredProducts.length} products
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute top-2 left-2 bg-red-500">
                  SALE
                </Badge>
              )}
              {!product.availability && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-green-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Health and Eco Scores */}
                <div className="flex space-x-2">
                  <Badge className={getHealthScoreColor(product.healthScore)}>
                    <Heart size={12} className="mr-1" />
                    Health: {product.healthScore}/5
                  </Badge>
                  <Badge className={getEcoScoreColor(product.ecoScore)}>
                    <Leaf size={12} className="mr-1" />
                    Eco: {product.ecoScore}/5
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Nutrients (if available) */}
                {product.nutrients && (
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <div className="grid grid-cols-2 gap-1">
                      <span>Calories: {product.nutrients.calories}</span>
                      <span>Protein: {product.nutrients.protein}g</span>
                      <span>Carbs: {product.nutrients.carbs}g</span>
                      <span>Fat: {product.nutrients.fat}g</span>
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button 
                  onClick={() => addToCart(product.id)}
                  disabled={!product.availability || cart.includes(product.id)}
                  className="w-full"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
