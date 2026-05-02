import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-12 mt-auto border-t dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-violet-400">ross</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            Premium e-commerce experience powered by the latest web technologies. Speed, security, and style.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6 dark:text-white uppercase tracking-wider text-xs">Quick Navigation</h3>
          <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-3">
            <li><Link to="/" className="hover:text-indigo-600 dark:hover:text-violet-400 transition">Explore Products</Link></li>
            <li><Link to="/wishlist" className="hover:text-indigo-600 dark:hover:text-violet-400 transition">My Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-600 dark:hover:text-violet-400 transition">Shopping Cart</Link></li>
            <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-violet-400 transition">Admin Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-6 dark:text-white uppercase tracking-wider text-xs">Secure Payments</h3>
          <div className="flex justify-center md:justify-start gap-4 text-gray-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          </div>
          <p className="text-gray-400 text-xs mt-4">SSL Encrypted Checkout</p>
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs px-4">
        © 2026 ross - Built for croos Mini Project. All rights reserved.
      </div>
    </footer>
  );
}