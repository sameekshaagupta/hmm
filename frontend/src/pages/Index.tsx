import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Award, ChevronLeft, ChevronRight, Leaf, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import ItemCard from '@/components/ItemCard';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock featured items data
  const featuredItems = [
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
      rating: 4.8
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
      rating: 4.6
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
      rating: 4.9
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
      rating: 4.3
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredItems.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredItems.length / 3)) % Math.ceil(featuredItems.length / 3));
  };

  return (
    <div className="min-h-screen purple-gradient">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-2xl mr-4">
                  <Recycle className="h-8 w-8 text-purple-600" />
                </div>
<span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent px-4 py-2 rounded-full text-sm font-semibold border border-violet-500">
  🌱 Sustainable Fashion
</span>

              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal-900 mb-6 leading-tight">
                Give Clothes a
                <span className="block bg-gradient-to-r from-purple-600 to-magenta-600 bg-clip-text text-transparent">
                  Second Life
                </span>
              </h1>
              
              <p className="text-xl text-charcoal-600 mb-8 leading-relaxed">
                Join our community-driven clothing exchange platform. Swap, redeem, and discover 
                pre-loved fashion while reducing waste and supporting sustainable living.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/browse">
                  <Button className="purple-button-primary group">
                    Start Swapping
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button className="purple-button-secondary">
                    Browse Items
                  </Button>
                </Link>
                <Link to="/add-item">
                  <Button className="purple-button-outline">
                    <Leaf className="mr-2 h-4 w-4" />
                    List an Item
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">12K+</div>
                  <div className="text-sm text-charcoal-600">Items Swapped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5K+</div>
                  <div className="text-sm text-charcoal-600">Happy Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
                  <div className="text-sm text-charcoal-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="purple-card p-8">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
                  alt="Sustainable fashion community"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg animate-fade-in border border-purple-100">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-magenta-500" />
                  <span className="text-sm font-medium text-charcoal-700">2.3K Likes</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 rounded-2xl p-4 shadow-md animate-fade-in border border-violet-200">
  <div className="flex items-center space-x-2">
    <Leaf className="h-5 w-5 text-violet-600" />
    <span className="text-sm font-medium">Eco-Friendly</span>
  </div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Why ReWear Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
              Every piece of clothing deserves a second chance. Join thousands of fashion-conscious 
              individuals making a positive impact on the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <Recycle className="h-8 w-8 text-purple-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Sustainable Impact</h3>
              <p className="text-charcoal-600">
                Reduce textile waste and carbon footprint by giving clothes a new life instead of buying new.
              </p>
            </div>

            <div className="text-center group">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <Users className="h-8 w-8 text-purple-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Community Driven</h3>
              <p className="text-charcoal-600">
                Connect with like-minded individuals in your area who share your passion for sustainable fashion.
              </p>
            </div>

            <div className="text-center group">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <Award className="h-8 w-8 text-purple-600 mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Earn Rewards</h3>
              <p className="text-charcoal-600">
                Earn points for every item you share and use them to get items you love from the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-20 purple-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-charcoal-900 mb-4">
                Featured Items
              </h2>
              <p className="text-charcoal-600">
                Discover amazing pre-loved fashion from our community
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="p-2 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="p-2 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.slice(currentSlide * 3, (currentSlide + 1) * 3).map((item) => (
              <ItemCard
                key={item.id}
                {...item}
                onClick={() => console.log(`Clicked item ${item.id}`)}
                onLike={() => console.log(`Liked item ${item.id}`)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button className="purple-button-primary group">
                View All Items
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-2xl">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-charcoal-900 mb-4">
              Safe & Secure Trading
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto mb-8">
              Every user is verified, all transactions are secured, and our community guidelines 
              ensure a positive experience for everyone.
            </p>
            <Link to="/signup">
              <Button className="purple-button-primary">
                Join Our Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-magenta-600 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-magenta-400 bg-clip-text text-transparent">
                  ReWear
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building a sustainable future through community-driven clothing exchange. 
                Every swap makes a difference.
              </p>
              <div className="text-sm text-plum-400 font-medium">
                🌱 Together for a greener tomorrow
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse" className="hover:text-purple-400 transition-colors">Browse Items</Link></li>
                <li><Link to="/add-item" className="hover:text-purple-400 transition-colors">List Item</Link></li>
                <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link></li>
                <li><Link to="/login" className="hover:text-purple-400 transition-colors">Sign In</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved. Made with 💜 for sustainability.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
