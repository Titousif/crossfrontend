import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300 dark:bg-gray-950">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
          Your Wishlist
        </h2>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Continue Shopping</Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your wishlist is empty.</p>
          <Link to="/" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
