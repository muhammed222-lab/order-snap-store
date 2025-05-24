
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../contexts/CartContext';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Engineering Notebook',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    category: 'Stationery',
    description: 'Professional engineering notebook with grid pages'
  },
  {
    id: '2',
    name: 'Scientific Calculator',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    category: 'Electronics',
    description: 'Advanced scientific calculator for complex calculations'
  },
  {
    id: '3',
    name: 'Lab Safety Goggles',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    category: 'Safety Equipment',
    description: 'Professional safety goggles for laboratory work'
  },
  {
    id: '4',
    name: 'Technical Drawing Kit',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
    category: 'Tools',
    description: 'Complete set of technical drawing instruments'
  },
  {
    id: '5',
    name: 'USB Flash Drive 32GB',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    category: 'Electronics',
    description: 'High-speed USB 3.0 flash drive for data storage'
  },
  {
    id: '6',
    name: 'Student Handbook',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    category: 'Books',
    description: 'Official polytechnic student handbook and guide'
  }
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
