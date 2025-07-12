
import React from 'react';
import { CheckCircle, Clock, XCircle, Package } from 'lucide-react';

interface SwapStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'available';
  size?: 'sm' | 'md' | 'lg';
}

const SwapStatusBadge: React.FC<SwapStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          icon: Package,
          label: 'Available',
          className: 'status-available'
        };
      case 'pending':
        return {
          icon: Clock,
          label: 'Pending',
          className: 'status-pending'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          label: 'Approved',
          className: 'status-available'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Swapped',
          className: 'status-swapped'
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'Rejected',
          className: 'bg-red-100 text-red-700 border border-red-200'
        };
      default:
        return {
          icon: Package,
          label: 'Unknown',
          className: 'status-swapped'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <span className={`status-badge ${config.className} ${sizeClasses[size]} inline-flex items-center gap-1`}>
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
};

export default SwapStatusBadge;
