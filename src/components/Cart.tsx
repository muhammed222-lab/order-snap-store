
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  onClose: () => void;
  onGenerateOrderSlip: () => void;
}

const Cart = ({ onClose, onGenerateOrderSlip }: CartProps) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Cart</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Cart ({cartItems.length} items)</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-96">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total: ${getCartTotal().toFixed(2)}</span>
          </div>
          <Button 
            onClick={onGenerateOrderSlip} 
            className="w-full"
            size="lg"
          >
            Generate Order Slip
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
