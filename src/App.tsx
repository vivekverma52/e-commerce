import React from 'react';
import './App.css';
import NavBar from './components/Nav';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  return (
   <>
   <BrowserRouter>
   <CartProvider>
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
   </CartProvider>
   </BrowserRouter>
   </>
  );
}

export default App;
