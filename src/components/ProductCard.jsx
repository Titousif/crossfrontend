import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist } = useContext(WishlistContext);

  const placeholderImages = {
    electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    clothing: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    furniture: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
  };

  const imageSrc = product.image || placeholderImages[product.category] || 'https://images.unsplash.com/photo-1555529669-2a7d7c8ca9f0?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-[#0f0f18] rounded-3xl border border-[#2f2e45] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <div className="w-full h-52 bg-gradient-to-br from-[#1f1f33] to-[#0a0a10] flex items-center justify-center overflow-hidden">
        <img src={imageSrc} alt={product.title} className="h-full w-full object-cover" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-100 mb-3">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description || 'A premium item with exceptional quality.'}</p>
        
        <div className="flex flex-wrap justify-between gap-3 items-center mb-4">
          <span className="text-sm bg-amber-500/15 text-amber-200 px-3 py-1 rounded-full border border-amber-300/20">
            {product.category}
          </span>
          <span className="text-sm text-gray-300">{product.stock} in stock</span>
        </div>
        
        <div className="flex justify-between items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-amber-300">${product.price}</span>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-amber-300 text-[#111118] px-4 py-2 rounded-full font-semibold hover:bg-amber-400 transition"
              disabled={product.stock === 0}
            >
              Add
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
            >
              ♥
            </button>
          </div>
        </div>
        
        {product.stock === 0 && (
          <p className="text-red-400 text-sm mt-3">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;