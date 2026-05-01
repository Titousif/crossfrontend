import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist } = useContext(WishlistContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      {/* Placeholder image - you can add images later */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">📦 {product.category}</span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description || 'Product description'}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-sm text-green-600">📦 {product.stock} left</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
              disabled={product.stock === 0}
            >
              🛒 Add
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
            >
              ❤️
            </button>
          </div>
        </div>
        
        {product.stock === 0 && (
          <p className="text-red-500 text-sm mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;