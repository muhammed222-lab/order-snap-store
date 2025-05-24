
import React, { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import OrderSlipGenerator from '../components/OrderSlipGenerator';
import Footer from '../components/Footer';
import UserAuth from '../components/UserAuth';
import { useCart } from '../contexts/CartContext';

const Index = () => {
  const [showCart, setShowCart] = useState(false);
  const [showOrderSlip, setShowOrderSlip] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { cartItems } = useCart();

  const handleGenerateOrderSlip = () => {
    setShowCart(false);
    setShowOrderSlip(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onCartClick={() => setShowCart(true)} 
        onAuthClick={() => setShowAuth(true)}
        cartItemCount={cartItems.length}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Polytechnic Store
          </h1>
          <p className="text-gray-600 text-lg">
            Your campus essentials, just a click away
          </p>
        </div>
        
        <ProductGrid />
      </main>

      <Footer />

      {showCart && (
        <Cart 
          onClose={() => setShowCart(false)}
          onGenerateOrderSlip={handleGenerateOrderSlip}
        />
      )}

      {showOrderSlip && (
        <OrderSlipGenerator 
          onClose={() => setShowOrderSlip(false)}
        />
      )}

      {showAuth && (
        <UserAuth 
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

export default Index;
