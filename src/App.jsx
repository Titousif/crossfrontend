import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Admin from './pages/Admin';
import NewProduct from './pages/NewProduct';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100 transition-colors duration-300">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/new" element={<NewProduct />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;