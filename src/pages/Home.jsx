import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [limit, setLimit] = useState(8);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productAPI.getAll(currentPage, limit, selectedCategory);
      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, limit, selectedCategory]);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-b from-[#05050b] via-[#0a0a12] to-[#111118] min-h-screen text-gray-100">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300 mb-4">Luxury Collection</p>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Discover Elegant Products</h1>
        <p className="mx-auto max-w-2xl text-gray-400 text-lg">Curated premium items for modern lifestyles. Shop with style, sophistication, and confidence.</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleCategoryChange('')}
          className={`px-4 py-2 rounded-full font-semibold tracking-wide ${
            selectedCategory === '' 
              ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/20' 
              : 'bg-[#14141c] text-gray-300 border border-[#2a2a3b]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange('electronics')}
          className={`px-4 py-2 rounded ${
            selectedCategory === 'electronics' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Electronics
        </button>
        <button
          onClick={() => handleCategoryChange('clothing')}
          className={`px-4 py-2 rounded ${
            selectedCategory === 'clothing' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Clothing
        </button>
        <button
          onClick={() => handleCategoryChange('books')}
          className={`px-4 py-2 rounded ${
            selectedCategory === 'books' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Books
        </button>
        <button
          onClick={() => handleCategoryChange('furniture')}
          className={`px-4 py-2 rounded ${
            selectedCategory === 'furniture' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Furniture
        </button>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value={4}>4 products</option>
          <option value={8}>8 products</option>
          <option value={12}>12 products</option>
          <option value={24}>24 products</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>❌ Error: {error}</p>
            <button
              onClick={fetchProducts}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#14141c] text-gray-100 rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;