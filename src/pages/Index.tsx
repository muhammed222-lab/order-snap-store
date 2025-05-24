
import React, { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import OrderSlipGenerator from '../components/OrderSlipGenerator';
import Footer from '../components/Footer';
import UserAuth from '../components/UserAuth';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Star, Users, Clock } from 'lucide-react';

const Index = () => {
  const [showCart, setShowCart] = useState(false);
  const [showOrderSlip, setShowOrderSlip] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { cartItems } = useCart();

  const handleGenerateOrderSlip = () => {
    setShowCart(false);
    setShowOrderSlip(true);
  };

  const features = [
    {
      icon: ShoppingBag,
      title: "Easy Shopping",
      description: "Browse and order your campus essentials with just a few clicks"
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Generate order slips instantly and collect from store"
    },
    {
      icon: Users,
      title: "Student Friendly",
      description: "Designed specifically for polytechnic students"
    },
    {
      icon: Star,
      title: "Quality Products",
      description: "Curated selection of academic and lifestyle essentials"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        onCartClick={() => setShowCart(true)} 
        onAuthClick={() => setShowAuth(true)}
        cartItemCount={cartItems.length}
      />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your Campus Store,
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Get everything you need for your polytechnic journey. No payments required - just order and collect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Shopping
                </button>
                <button 
                  onClick={() => setShowAuth(true)}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Store?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've designed the perfect shopping experience for busy students
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Campus Essentials
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need for your academic and campus life
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>
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
