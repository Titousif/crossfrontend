import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { productAPI } from '../services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productAPI.getOne(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error('Failed to load product details:', err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!product) return <div className="p-8 text-center text-xl dark:text-white dark:bg-gray-950 h-screen">Product not found.</div>; 
  
  return ( 
    <div className="dark:bg-gray-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-8">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Products
        </Link>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-12 border dark:border-gray-700"> 
          <div className="w-full md:w-1/2 flex justify-center bg-white rounded-xl p-4 dark:bg-gray-900">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1555529669-2a7d7c8ca9f0?auto=format&fit=crop&w=800&q=80'}
            alt={product.title}
            className="max-h-[450px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center"> 
            <p className="text-indigo-600 dark:text-violet-400 font-bold uppercase tracking-widest text-sm mb-2">{product.category}</p>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">{product.title}</h2> 
            
            <div className="flex items-center gap-4 mb-8">
               <span className="text-indigo-600 dark:text-violet-400 text-5xl font-extrabold">${product.price}</span> 
               <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-bold rounded-full">In Stock</div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10 text-lg">{product.description}</p> 
             
            <button  
              onClick={() => addToCart(product)} 
              className="bg-indigo-600 text-white py-4 px-10 rounded-xl font-bold text-xl hover:bg-indigo-700 transition w-full md:w-auto shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-3"> 
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Add to Cart 
            </button> 
          </div> 
        </div> 
      </div>
    </div> 
  ); 
}
