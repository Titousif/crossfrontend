import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../../logo.jpg';

export default function Navbar({ searchTerm, setSearchTerm }) {
  const { totalItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-gradient-to-r from-[#08080f] via-[#111118] to-[#0f0e17] shadow-[0_20px_60px_rgba(0,0,0,0.35)] sticky top-0 z-50 transition-colors duration-300 border-b border-gray-800">
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-wide text-amber-300 uppercase">
          <img src={logo} alt="cross Logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-300/40" />
          <span>cross</span>
        </Link>
        <button className="md:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>

      {/* ✅ Functional Search Bar */}
      <div className="flex-1 max-w-md mx-4 w-full">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search premium products..."
            className="w-full px-4 py-2 border rounded-full bg-[#111118] border-[#3f3d56] text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <span className="absolute right-4 top-2.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 font-semibold items-center mt-4 md:mt-0">
        <Link to="/wishlist" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-0.5 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {wishlist.length}
            </span>
          )}
        </Link>


        <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Add Product button - only for logged in users */}
        {localStorage.getItem('token') && (
          <Link to="/products/new" className="bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg shadow-amber-400/20 flex items-center gap-2 hover:scale-[1.02] transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Product
          </Link>
        )}

        {/* ✅ Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          )}
        </button>


        <Link to="/login" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md shadow-indigo-200 dark:shadow-none">Admin</Link>
      </div>
    </nav>
  );
}
