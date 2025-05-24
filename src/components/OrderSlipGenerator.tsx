
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Download, Share2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface OrderSlipGeneratorProps {
  onClose: () => void;
}

const OrderSlipGenerator = ({ onClose }: OrderSlipGeneratorProps) => {
  const [customerName, setCustomerName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const slipRef = useRef<HTMLDivElement>(null);

  const generateOrderId = () => {
    return `PS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const getUserAgent = () => {
    return navigator.userAgent;
  };

  const handleGenerateSlip = async () => {
    if (!customerName.trim() && !user) {
      toast({
        title: "Name required",
        description: "Please enter your name to generate the order slip.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderId = generateOrderId();
    const orderData = {
      id: orderId,
      customerName: user?.name || customerName,
      items: cartItems,
      total: getCartTotal(),
      timestamp: new Date().toISOString(),
      userAgent: getUserAgent(),
      isSignedIn: !!user
    };

    // Save order to localStorage (simulating CSV storage)
    const existingOrders = JSON.parse(localStorage.getItem('polytechnic-orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('polytechnic-orders', JSON.stringify(existingOrders));

    // Clear cart after successful order
    clearCart();
    
    setIsGenerating(false);
    
    toast({
      title: "Order slip generated!",
      description: `Order ${orderId} has been created successfully.`,
    });
  };

  const handleDownload = () => {
    if (slipRef.current) {
      // In a real implementation, this would generate a PDF
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Order Slip</title>
              <style>
                body { font-family: monospace; padding: 20px; }
                .slip { max-width: 300px; margin: 0 auto; }
              </style>
            </head>
            <body>
              ${slipRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const orderId = generateOrderId();
  const now = new Date();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Generate Order Slip</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {!user && (
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Full Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          )}

          {/* Order Slip Preview */}
          <div 
            ref={slipRef}
            className="bg-white border-2 border-dashed border-gray-300 p-4 text-xs font-mono relative overflow-hidden"
            style={{ 
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 35px,
                  rgba(0,0,0,0.03) 35px,
                  rgba(0,0,0,0.03) 40px
                ),
                linear-gradient(
                  to bottom,
                  rgba(0,0,0,0.02),
                  rgba(0,0,0,0.02)
                )
              `
            }}
          >
            {/* Watermarks */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="text-gray-200 text-2xl font-bold transform -rotate-45 opacity-30"
                style={{ fontSize: '8px' }}
              >
                Powered by Polytechnic Store
              </div>
            </div>
            <div className="absolute top-4 right-4 text-gray-200 text-xs opacity-20 transform rotate-12">
              {orderId}
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center border-b border-gray-400 pb-2 mb-3">
                <div className="font-bold text-sm">POLYTECHNIC STORE</div>
                <div className="text-xs">Student Campus Store</div>
                <div className="text-xs">Order Slip</div>
              </div>

              {/* Order Info */}
              <div className="space-y-1 mb-3 text-xs">
                <div>Order ID: {orderId}</div>
                <div>Date: {now.toLocaleDateString()}</div>
                <div>Time: {now.toLocaleTimeString()}</div>
                <div>Customer: {user?.name || customerName || 'N/A'}</div>
                {user?.email && <div>Email: {user.email}</div>}
                {user && <div>Status: Signed In</div>}
              </div>

              {/* Items */}
              <div className="border-t border-gray-400 pt-2 mb-3">
                <div className="font-bold mb-2">ITEMS:</div>
                {cartItems.map(item => (
                  <div key={item.id} className="mb-1">
                    <div className="flex justify-between">
                      <span className="truncate flex-1">{item.name}</span>
                      <span>₦{item.price.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-600">Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-gray-400 pt-2 mb-3">
                <div className="flex justify-between font-bold">
                  <span>TOTAL:</span>
                  <span>₦{getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-gray-600 border-t border-gray-400 pt-2">
                <div>Thank you for your order!</div>
                <div>Present this slip at the store</div>
                <div className="mt-1 text-gray-500">
                  Generated: {getUserAgent().split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={handleGenerateSlip} 
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? 'Generating...' : 'Generate Order'}
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Polytechnic Store Order',
                    text: `Order ${orderId} - Total: ₦${getCartTotal().toLocaleString()}`
                  });
                } else {
                  toast({
                    title: "Share",
                    description: "Share functionality is not available on this device.",
                  });
                }
              }}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSlipGenerator;
