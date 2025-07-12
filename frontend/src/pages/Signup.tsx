
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to our terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);


    console.log("Sending to backend:", {
  email: formData.email,
  password: formData.password,
  phoneNumber: formData.phoneNumber,
  city: formData.city,
  state: formData.state,
  pincode: formData.pincode
});

    // Simulate API call with 100 points initialization
    try {
  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  toast({
    title: "Welcome to ReWear! 💜",
    description: `Your account has been created with ${data.user.points} points!`,
  });

  setFormData({
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

} catch (error: any) {
  toast({
    title: "Signup failed",
    description: error.message,
    variant: "destructive"
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

        {/* Signup Card */}
        <div className="purple-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-2xl">
                <Leaf className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Join ReWear</h1>
            <p className="text-charcoal-600">Start your sustainable fashion journey today</p>
          </div>

          {/* Signup Form */}
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
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-charcoal-700">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-charcoal-700">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-medium text-charcoal-700">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="State"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pincode" className="text-sm font-medium text-charcoal-700">
                Pincode
              </Label>
              <Input
                id="pincode"
                name="pincode"
                type="text"
                required
                value={formData.pincode}
                onChange={handleChange}
                className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter pincode"
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
                  placeholder="Create a strong password"
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

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-charcoal-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500 pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-purple-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                }
                className="rounded border-purple-300 mt-1"
              />
              <Label htmlFor="agreeToTerms" className="ml-2 text-sm text-charcoal-600 leading-5">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full purple-button-primary py-3"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account & Get 100 Points'
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-charcoal-600 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
