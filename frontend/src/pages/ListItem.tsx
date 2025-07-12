import React, { useState } from 'react';
import { Upload, X, Camera, Tag, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import NavBar from '@/components/NavBar';
import { toast } from 'sonner';

const ListItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    tags: '',
    points: ''
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories', 
    'Formal', 'Casual', 'Sports', 'Underwear', 'Sleepwear'
  ];
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const conditions = ['Excellent', 'Good', 'Fair'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (images.length === 0) {
    toast.warning('No image uploaded — your item will be listed without pictures.');
    return;
  }

  if (!formData.title || !formData.category || !formData.size || !formData.condition) {
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/items/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        images: images.length > 0 ? images : [],
        tags: formData.tags
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to list item');
    }

    toast.success('Item listed successfully! It will be reviewed shortly.');
    setFormData({
      title: '',
      description: '',
      category: '',
      size: '',
      condition: '',
      tags: '',
      points: ''
    });
    setImages([]);
  } catch (err: any) {
    toast.error(`Listing failed: ${err.message}`);
  }
};


  return (
    <div className="min-h-screen purple-gradient">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal-900 mb-2">List New Item</h1>
          <p className="text-charcoal-600">Share something amazing from your closet with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <Card className="purple-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal-900">
                <Camera className="h-5 w-5 text-purple-600 mr-2" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-purple-300 hover:border-purple-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-charcoal-700 mb-2">
                    Drag & drop your images here
                  </p>
                  <p className="text-charcoal-500 mb-4">or</p>
                  <Button
                    type="button"
                    className="purple-button-outline"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Choose Files
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                  <p className="text-xs text-charcoal-500 mt-4">
                    PNG, JPG, GIF up to 10MB each. Maximum 5 images.
                  </p>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card className="purple-card">
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal-900">
                <Package className="h-5 w-5 text-purple-600 mr-2" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-charcoal-700 mb-2">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g., Vintage Denim Jacket"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="rounded-xl border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-charcoal-700 mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe your item's features, styling tips, or story..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="rounded-xl resize-none border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Category, Size, Condition Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-charcoal-700"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Size *
                  </label>
                  <select
                    id="size"
                    name="size"
                    required
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-charcoal-700"
                  >
                    <option value="">Select size</option>
                    {sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-charcoal-700"
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags and Points Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="vintage, summer, casual (comma separated)"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="rounded-xl border-purple-200 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Suggested Points
                  </label>
                  <Input
                    id="points"
                    name="points"
                    type="number"
                    placeholder="e.g., 150"
                    value={formData.points}
                    onChange={handleInputChange}
                    className="rounded-xl border-purple-200 focus:border-purple-500"
                  />
                  <p className="text-xs text-charcoal-500 mt-1">
                    Leave blank for automatic calculation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="purple-card bg-purple-100/50 border-purple-300">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-purple-800 mb-3">📋 Listing Guidelines</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Take clear, well-lit photos from multiple angles</li>
                <li>• Be honest about condition and any flaws</li>
                <li>• Include measurements when helpful</li>
                <li>• Use descriptive titles and detailed descriptions</li>
                <li>• Only list items you own and are ready to swap</li>
              </ul>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border-purple-300 text-purple-600 hover:bg-purple-50"
              onClick={() => {
                setFormData({
                  title: '',
                  description: '',
                  category: '',
                  size: '',
                  condition: '',
                  tags: '',
                  points: ''
                });
                setImages([]);
              }}
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              className="purple-button-primary px-8"
            >
              <Tag className="h-4 w-4 mr-2" />
              List Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListItem;
