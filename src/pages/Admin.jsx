import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    // Check if user is logged in (any user can access admin for now)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll(1, 100); // Get all products
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // For now, just remove from local state
        // In production, implement delete API
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price)
      };

      await productAPI.create(productData);
      alert('Product added successfully!');
      setNewProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
      setShowAddForm(false);
      loadProducts(); // Reload products
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#07070d] text-gray-200">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#07070d] min-h-screen transition-colors duration-300 text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-amber-300">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your luxury store catalog from one elegant interface.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 px-6 py-2 rounded-full font-bold hover:shadow-lg hover:shadow-amber-300/30 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Product
          </button>
          <Link
            to="/products/new"
            className="bg-blue-500/10 text-blue-600 dark:text-blue-300 px-6 py-2 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all border border-blue-200 dark:border-blue-900/30 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Product Page
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 text-red-600 dark:text-red-400 px-6 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-200 dark:border-red-900/30 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-[#10101a] shadow-[0_40px_120px_rgba(0,0,0,0.25)] rounded-3xl p-6 mb-8 border border-[#2d2c44]">
          <h2 className="text-2xl font-bold text-amber-300 mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={newProduct.title}
                onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter product title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                rows="3"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="e.g., electronics, clothing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-amber-300 text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-amber-400 transition"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-[#2d2c44] text-gray-200 px-6 py-2 rounded-full font-bold hover:bg-[#41405e] transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-5 font-bold uppercase tracking-wider text-xs">ID</th>
                <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">Image</th>
                <th className="p-5 font-bold uppercase tracking-wider text-xs">Product Title</th>
                <th className="p-5 font-bold uppercase tracking-wider text-xs">Price</th>
                <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-5 text-gray-500 dark:text-gray-400 font-medium">#{p.id}</td>
                  <td className="p-5">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 bg-white rounded-lg p-1 flex items-center justify-center border dark:border-gray-700">
                        <img src={p.image} className="max-h-full max-w-full object-contain" alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm font-semibold text-gray-800 dark:text-gray-200 max-w-md truncate">{p.title}</td>
                  <td className="p-5 font-bold text-indigo-600 dark:text-violet-400">${p.price}</td>
                  <td className="p-5">
                    <div className="flex gap-3 justify-center">
                      <button className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}