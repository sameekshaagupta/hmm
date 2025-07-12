
import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import ItemCard from '@/components/ItemCard';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for browse items
  const items = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      uploader: 'Sarah Chen',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      points: 150,
      location: 'Downtown',
      rating: 4.8,
      datePosted: '2024-01-15'
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      uploader: 'Emma Wilson',
      category: 'Dresses',
      size: 'S',
      condition: 'Good',
      points: 120,
      location: 'Midtown',
      rating: 4.6,
      datePosted: '2024-01-12'
    },
    {
      id: '3',
      title: 'Designer Wool Coat',
      image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
      uploader: 'Alex Rodriguez',
      category: 'Coats',
      size: 'L',
      condition: 'Excellent',
      points: 300,
      location: 'Uptown',
      rating: 4.9,
      datePosted: '2024-01-10'
    },
    {
      id: '4',
      title: 'Casual Cotton Tee',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      uploader: 'Jordan Kim',
      category: 'T-Shirts',
      size: 'M',
      condition: 'Good',
      points: 50,
      location: 'East Side',
      rating: 4.3,
      datePosted: '2024-01-08'
    },
    {
      id: '5',
      title: 'Elegant Evening Gown',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
      uploader: 'Maya Patel',
      category: 'Formal',
      size: 'M',
      condition: 'Excellent',
      points: 250,
      location: 'Central',
      rating: 4.7,
      datePosted: '2024-01-05'
    },
    {
      id: '6',
      title: 'Comfortable Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a9c6dcb07ff?w=400&h=300&fit=crop',
      uploader: 'Chris Taylor',
      category: 'Hoodies',
      size: 'L',
      condition: 'Good',
      points: 80,
      location: 'West Side',
      rating: 4.4,
      datePosted: '2024-01-03'
    }
  ];

  const categories = ['all', 'Outerwear', 'Dresses', 'Coats', 'T-Shirts', 'Formal', 'Hoodies'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['all', 'Excellent', 'Good', 'Fair'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size === selectedSize;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesSize && matchesCondition;
  });

  return (
    <div className="min-h-screen purple-gradient">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Browse Items</h1>
            <p className="text-charcoal-600">Discover amazing pre-loved fashion from our community</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`rounded-xl ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-xl ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="purple-card p-6 sticky top-8 bg-purple-200/30">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-charcoal-900">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                  <Input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300"
                      />
                      <span className="ml-2 text-sm text-charcoal-700 capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal-700 mb-3">Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg text-xs ${
                        selectedSize === size 
                          ? 'filter-chip-active' 
                          : 'filter-chip-inactive'
                      }`}
                    >
                      {size === 'all' ? 'All' : size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-3">Condition</label>
                <div className="space-y-2">
                  {conditions.map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value={condition}
                        checked={selectedCondition === condition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300"
                      />
                      <span className="ml-2 text-sm text-charcoal-700">
                        {condition === 'all' ? 'All Conditions' : condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Items Grid/List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-charcoal-600">
                Showing {filteredItems.length} of {items.length} items
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    {...item}
                    onClick={() => console.log(`Clicked item ${item.id}`)}
                    onLike={() => console.log(`Liked item ${item.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="purple-card p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-charcoal-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-charcoal-600 mb-2">{item.category} • Size {item.size} • {item.condition}</p>
                        <div className="flex items-center text-sm text-charcoal-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.location}
                          <Star className="h-3 w-3 ml-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600 mb-2">{item.points} pts</div>
                        <Button size="sm" className="purple-button-primary">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="purple-card p-12 text-center">
                <Search className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-charcoal-900 mb-2">No items found</h3>
                <p className="text-charcoal-600">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
