
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, ArrowLeft, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // so cookies (jwt) are set
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error toast
        toast({
          title: 'Login failed',
          description: data?.email || data?.password || data?.message || 'Invalid credentials',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: `Welcome back! 💜`,
        description: `You've successfully signed in as ${loginType}.`,
      });

      // Set login flag
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect based on login type
      if (loginType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen purple-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="purple-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-2xl">
                <Leaf className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Welcome Back</h1>
            <p className="text-charcoal-600">Sign in to continue your sustainable journey</p>
          </div>

          {/* Role Toggle */}
          <div className="flex mb-6 bg-purple-50 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setLoginType('user')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginType === 'user'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Login as User
            </button>
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                loginType === 'admin'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              <Shield className="h-4 w-4 mr-2" />
              Login as Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-charcoal-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-charcoal-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-purple-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  className="rounded border-purple-300"
                />
                <Label htmlFor="rememberMe" className="ml-2 text-sm text-charcoal-600">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full purple-button-primary py-3"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                `Sign In as ${loginType === 'admin' ? 'Admin' : 'User'}`
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-charcoal-600 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
