
import React from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  id: string;
  title: string;
  image: string;
  uploader: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  location?: string;
  rating?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onClick?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  image,
  uploader,
  category,
  size,
  condition,
  points,
  location,
  rating,
  isLiked = false,
  onLike,
  onClick
}) => {
  return (
    <div className="purple-card group cursor-pointer overflow-hidden" onClick={onClick}>
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
              isLiked ? 'text-magenta-500' : 'text-charcoal-400 hover:text-magenta-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current heart-liked' : ''}`} />
          </Button>
        </div>

        {/* Points badge */}
        <div className="absolute bottom-3 left-3">
          <span className="points-badge">
            {points} points
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-charcoal-900 group-hover:text-purple-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Details */}
        <div className="flex items-center text-sm text-charcoal-600 mb-3">
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg mr-2">
            {category}
          </span>
          <span className="bg-magenta-100 text-magenta-700 px-2 py-1 rounded-lg mr-2">
            Size {size}
          </span>
        </div>

        {/* Condition */}
        <div className="mb-3">
          <span className={`status-badge ${
            condition === 'Excellent' ? 'status-available' :
            condition === 'Good' ? 'status-pending' : 'status-swapped'
          }`}>
            {condition}
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-magenta-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-sm font-medium text-purple-700">
                {uploader.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal-900">{uploader}</p>
              {location && (
                <div className="flex items-center text-xs text-charcoal-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                </div>
              )}
            </div>
          </div>
          
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-charcoal-600 ml-1">{rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
