
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Store, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customerName: string;
  items: any[];
  total: number;
  timestamp: string;
  userAgent: string;
  isSignedIn: boolean;
  status?: string;
}

const AdminDashboard = () => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchResult, setSearchResult] = useState<Order | null>(null);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'found' | 'not-found' | 'fake'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    if (!localStorage.getItem('admin-authenticated')) {
      navigate('/admin');
      return;
    }

    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('polytechnic-orders') || '[]');
    setOrders(savedOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    navigate('/');
  };

  const handleSearchOrder = () => {
    if (!searchOrderId.trim()) return;

    const order = orders.find(o => o.id === searchOrderId.trim());
    
    if (order) {
      setSearchResult(order);
      setSearchStatus(order.status === 'completed' ? 'found' : 'found');
    } else {
      setSearchResult(null);
      setSearchStatus('fake');
    }
  };

  const handleMarkCompleted = () => {
    if (!searchResult) return;

    const updatedOrders = orders.map(order => 
      order.id === searchResult.id 
        ? { ...order, status: 'completed' }
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('polytechnic-orders', JSON.stringify(updatedOrders));
    
    setSearchResult({ ...searchResult, status: 'completed' });
    
    toast({
      title: "Order Updated",
      description: `Order ${searchResult.id} has been marked as completed.`,
    });
  };

  const handleLaunchStorefront = () => {
    window.open('/', '_blank');
  };

  const pendingOrders = orders.filter(order => order.status !== 'completed');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Admin Panel</h1>
            <p className="text-gray-600">Manage orders and store operations</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleLaunchStorefront} variant="outline">
              <Store className="w-4 h-4 mr-2" />
              Launch Storefront
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verify">Verify Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending Orders ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Verification</CardTitle>
                <p className="text-sm text-gray-600">
                  Enter an Order ID to verify its authenticity and status
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                      id="orderId"
                      value={searchOrderId}
                      onChange={(e) => setSearchOrderId(e.target.value)}
                      placeholder="PS-1234567890-ABC123DEF"
                    />
                  </div>
                  <Button onClick={handleSearchOrder} className="mt-6">
                    <Search className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </div>

                {searchStatus === 'found' && searchResult && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Valid Order</span>
                        </div>
                        {searchResult.status === 'completed' ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ✅ Already Completed
                          </Badge>
                        ) : (
                          <Button onClick={handleMarkCompleted} size="sm">
                            Mark as Completed
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Order ID:</strong> {searchResult.id}</p>
                          <p><strong>Customer:</strong> {searchResult.customerName}</p>
                          <p><strong>Total:</strong> ${searchResult.total.toFixed(2)}</p>
                          <p><strong>Date:</strong> {new Date(searchResult.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                          <p><strong>Items:</strong> {searchResult.items.length}</p>
                          <p><strong>Signed In:</strong> {searchResult.isSignedIn ? 'Yes' : 'No'}</p>
                          <p><strong>Status:</strong> {searchResult.status || 'Pending'}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <strong>Items:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {searchResult.items.map(item => (
                            <li key={item.id}>
                              {item.name} (Qty: {item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {searchStatus === 'fake' && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-4">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">
                          ❌ Fake Order – Not from our store
                        </span>
                      </div>
                      <p className="text-red-700 text-sm mt-2">
                        This Order ID does not exist in our system. This may be a fraudulent slip.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No pending orders</p>
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map(order => (
                <Card key={order.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">Order: {order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items • {order.isSignedIn ? 'Signed In' : 'Guest'}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No completed orders</p>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map(order => (
                <Card key={order.id} className="border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">Order: {order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items • {order.isSignedIn ? 'Signed In' : 'Guest'}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
