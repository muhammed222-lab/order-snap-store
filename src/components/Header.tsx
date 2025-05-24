
import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
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
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Polytechnic Store
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {user.profileImage && (
                  <img 
                    src={user.profileImage} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthClick}
                className="flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Sign In</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative flex items-center space-x-1"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:block">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
