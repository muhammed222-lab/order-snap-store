
import React from 'react';
import { ShoppingCart, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  cartItemCount: number;
}

const Header = ({ onCartClick, onAuthClick, cartItemCount }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Polytechnic Store
              </span>
              <p className="text-sm text-gray-500 hidden sm:block">Campus Essentials</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-2">
                {user.profileImage && (
                  <img 
                    src={user.profileImage} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthClick}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl px-4 py-2"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block font-medium">Sign In</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl px-4 py-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:block font-medium">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
