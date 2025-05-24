
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const categories = [
  'Stationery',
  'Electronics', 
  'Books & Learning Materials',
  'Safety Equipment',
  'Tools',
  'Food & Snacks',
  'Personal Care',
  'Campus Accessories'
];

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Engineering Notebook',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    category: 'Stationery',
    description: 'Professional engineering notebook with grid pages'
  },
  {
    id: '2',
    name: 'Scientific Calculator',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    category: 'Electronics',
    description: 'Advanced scientific calculator for complex calculations'
  },
  {
    id: '3',
    name: 'Lab Safety Goggles',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    category: 'Safety Equipment',
    description: 'Professional safety goggles for laboratory work'
  },
  {
    id: '4',
    name: 'Technical Drawing Kit',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
    category: 'Tools',
    description: 'Complete set of technical drawing instruments'
  },
  {
    id: '5',
    name: 'USB Flash Drive 32GB',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    category: 'Electronics',
    description: 'High-speed USB 3.0 flash drive for data storage'
  },
  {
    id: '6',
    name: 'Student Handbook',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    category: 'Books & Learning Materials',
    description: 'Official polytechnic student handbook and guide'
  },
  {
    id: '7',
    name: 'Energy Drink',
    price: 800,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop',
    category: 'Food & Snacks',
    description: 'Refreshing energy drink for late study sessions'
  },
  {
    id: '8',
    name: 'Ballpoint Pens (Pack of 5)',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1586952518485-11b180e92764?w=400&h=400&fit=crop',
    category: 'Stationery',
    description: 'High-quality ballpoint pens for everyday writing'
  },
  {
    id: '9',
    name: 'Campus ID Lanyard',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Campus Accessories',
    description: 'Durable lanyard for your student ID and keys'
  }
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('polytechnic-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('polytechnic-products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...productData, id } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('polytechnic-products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('polytechnic-products', JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
};
