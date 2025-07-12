
import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import NavBar from '@/components/NavBar';

const AdminDashboard = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'approve' | 'disapprove' | null>(null);
  const [remarks, setRemarks] = useState('');

  // Mock data for pending listings
  const pendingListings = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      description: 'Classic brown leather jacket in excellent condition',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
      uploader: 'Sarah Chen',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      dateSubmitted: '2024-01-15'
    },
    {
      id: '2',
      title: 'Designer Evening Dress',
      description: 'Elegant black evening dress, worn once',
      image: 'https://images.unsplash.com/photo-1566479179817-c5cd3b659ad0?w=300&h=300&fit=crop',
      uploader: 'Emma Wilson',
      category: 'Dresses',
      size: 'S',
      condition: 'Like New',
      dateSubmitted: '2024-01-14'
    }
  ];

  const approvedListings = [
    {
      id: '3',
      title: 'Cotton Summer Tee',
      description: 'Comfortable cotton t-shirt in mint green',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      uploader: 'Alex Rodriguez',
      category: 'Tops',
      size: 'L',
      condition: 'Good',
      dateApproved: '2024-01-12'
    }
  ];

  const spamListings = [
    {
      id: '4',
      title: 'Inappropriate Content',
      description: 'This listing was marked as spam',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      uploader: 'Unknown User',
      category: 'Unknown',
      size: 'Unknown',
      condition: 'Unknown',
      dateMarked: '2024-01-10'
    }
  ];

  const handleAction = (item: any, action: 'approve' | 'disapprove') => {
    setSelectedItem(item);
    setModalType(action);
  };

  const handleMarkAsSpam = (item: any) => {
    // Handle spam marking logic
    console.log('Marked as spam:', item);
  };

  const handleSubmitRemarks = () => {
    console.log(`${modalType} item:`, selectedItem, 'Remarks:', remarks);
    setSelectedItem(null);
    setModalType(null);
    setRemarks('');
  };

  const ListingCard = ({ item, showActions = true, status }: any) => (
    <div className="purple-card p-6">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-charcoal-900 mb-2">{item.title}</h3>
          <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs">
              {item.category}
            </span>
            <span className="bg-magenta-100 text-magenta-700 px-2 py-1 rounded-lg text-xs">
              Size {item.size}
            </span>
            <span className="bg-plum-100 text-plum-700 px-2 py-1 rounded-lg text-xs">
              {item.condition}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-charcoal-900">{item.uploader}</p>
              <p className="text-xs text-charcoal-500">
                {status === 'pending' && `Submitted: ${new Date(item.dateSubmitted).toLocaleDateString()}`}
                {status === 'approved' && `Approved: ${new Date(item.dateApproved).toLocaleDateString()}`}
                {status === 'spam' && `Marked: ${new Date(item.dateMarked).toLocaleDateString()}`}
              </p>
            </div>

            {showActions && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkAsSpam(item)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                >
                  <AlertTriangle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(item, 'disapprove')}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAction(item, 'approve')}
                  className="purple-button-primary"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-magenta-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="purple-card p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
                Admin Dashboard 👨‍💼
              </h1>
              <p className="text-charcoal-600">
                Manage listings and maintain community standards
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{pendingListings.length}</div>
                <div className="text-sm text-charcoal-600">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-plum-600">{approvedListings.length}</div>
                <div className="text-sm text-charcoal-600">Approved Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-1/2 bg-white rounded-2xl p-1 shadow-sm">
            <TabsTrigger value="pending" className="rounded-xl">
              Pending ({pendingListings.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="rounded-xl">
              Approved ({approvedListings.length})
            </TabsTrigger>
            <TabsTrigger value="spam" className="rounded-xl">
              Spam ({spamListings.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Listings */}
          <TabsContent value="pending" className="space-y-6">
            <h2 className="text-2xl font-bold text-charcoal-900">Pending Approval</h2>
            <div className="space-y-4">
              {pendingListings.map((item) => (
                <ListingCard key={item.id} item={item} status="pending" />
              ))}
            </div>
          </TabsContent>

          {/* Approved Listings */}
          <TabsContent value="approved" className="space-y-6">
            <h2 className="text-2xl font-bold text-charcoal-900">Approved Listings</h2>
            <div className="space-y-4">
              {approvedListings.map((item) => (
                <ListingCard key={item.id} item={item} showActions={false} status="approved" />
              ))}
            </div>
          </TabsContent>

          {/* Spam Listings */}
          <TabsContent value="spam" className="space-y-6">
            <h2 className="text-2xl font-bold text-charcoal-900">Spam/Inappropriate</h2>
            <div className="space-y-4">
              {spamListings.map((item) => (
                <ListingCard key={item.id} item={item} showActions={false} status="spam" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Remarks Modal */}
        {selectedItem && modalType && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="purple-card p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                {modalType === 'approve' ? 'Approve' : 'Disapprove'} Listing
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-charcoal-600 mb-2">Item: {selectedItem.title}</p>
                <p className="text-sm text-charcoal-600">Uploader: {selectedItem.uploader}</p>
              </div>

              <div className="mb-6">
                <Label htmlFor="remarks" className="text-sm font-medium text-charcoal-700">
                  Remarks (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-1 rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                  placeholder={`Add remarks for ${modalType === 'approve' ? 'approval' : 'disapproval'}...`}
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedItem(null);
                    setModalType(null);
                    setRemarks('');
                  }}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRemarks}
                  className={`flex-1 rounded-xl ${
                    modalType === 'approve' 
                      ? 'purple-button-primary' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {modalType === 'approve' ? 'Approve' : 'Disapprove'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
