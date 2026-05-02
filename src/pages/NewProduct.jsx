import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

export default function NewProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await productAPI.create({
        ...product,
        price: Number(product.price)
      });
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Fill in the product details and publish it to your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border dark:border-gray-700">
        {error && (
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            {error}
          </div>
        )}

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300">Title</span>
          <input
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300">Price</span>
          <input
            name="price"
            type="number"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300">Category</span>
          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 dark:text-gray-300">Image URL</span>
          <input
            name="image"
            type="url"
            value={product.image}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-gray-700 dark:text-gray-300">Description</span>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
