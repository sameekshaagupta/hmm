
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Search, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    // Listen for changes from other tabs
    const handler = () => setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Items' },
    { path: '/add-item', label: 'List Item' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  // Mock favorites data
  const favorites = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop',
      category: 'Outerwear',
      points: 150
    },
    {
      id: '2',
      title: 'Designer Handbag',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&h=150&fit=crop',
      category: 'Accessories',
      points: 200
    }
  ];

  // Mock profile data
  const profile = {
    name: 'Sarah Chen',
    phoneNumber: '+1 (555) 123-4567',
    city: 'New York',
    state: 'NY',
    pincode: '10001'
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-xl group-hover:from-purple-200 group-hover:to-magenta-200 transition-all duration-300">
              <Leaf className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-purple-600 to-magenta-600 bg-clip-text text-transparent">
              ReWear
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.filter(item => {
              if ((item.path === '/dashboard' || item.path === '/add-item') && !isLoggedIn) return false;
              return true;
            }).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-charcoal-500 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-purple-50 hover:text-purple-600">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Favorites Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-purple-50 hover:text-magenta-500 relative"
                onClick={() => setShowFavorites(!showFavorites)}
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-magenta-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>

              {showFavorites && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-purple-200 z-50">
                  <div className="p-4 border-b border-purple-100">
                    <h3 className="font-semibold text-charcoal-900">Your Favorites</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {favorites.length > 0 ? (
                      <div className="p-2">
                        {favorites.map((item) => (
                          <div key={item.id} className="flex items-center p-3 hover:bg-purple-50 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-charcoal-900 text-sm">{item.title}</h4>
                              <p className="text-xs text-charcoal-600">{item.category}</p>
                              <p className="text-xs text-purple-600 font-medium">{item.points} points</p>
                            </div>
                            <Button variant="ghost" size="sm" className="p-1 text-red-500 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="p-3 border-t border-purple-100">
                          <Link to="/favorites">
                            <Button className="w-full purple-button-secondary text-sm">
                              View All Favorites
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <Heart className="h-12 w-12 text-charcoal-300 mx-auto mb-2" />
                        <p className="text-charcoal-500 text-sm">No favorites yet</p>
                        <p className="text-charcoal-400 text-xs">Start adding items you love!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-purple-50 hover:text-purple-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-5 w-5" />
              </Button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-purple-200 z-50">
                  <div className="p-4 border-b border-purple-100">
                    <h3 className="font-semibold text-charcoal-900">Profile Settings</h3>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        readOnly
                        className="w-full px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phoneNumber}
                        className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-1">City</label>
                        <input
                          type="text"
                          value={profile.city}
                          className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-1">State</label>
                        <input
                          type="text"
                          value={profile.state}
                          className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        value={profile.pincode}
                        className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    
                    <Button className="w-full purple-button-primary text-sm">
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-500">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="purple-button-primary text-sm py-2 px-4">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Button variant="outline" size="sm" className="rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-500" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-purple-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-200/50 animate-fade-in">
            <div className="space-y-2">
              {navItems.filter(item => {
                if ((item.path === '/dashboard' || item.path === '/add-item') && !isLoggedIn) return false;
                return true;
              }).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-charcoal-500 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-4 border-t border-purple-200/50">
                {!isLoggedIn && (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" className="w-full rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button className="w-full purple-button-primary">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <Button variant="outline" className="w-full rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {(showFavorites || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowFavorites(false);
            setShowProfile(false);
          }}
        />
      )}
    </nav>
  );
};

export default NavBar;
