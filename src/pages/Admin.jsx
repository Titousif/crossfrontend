import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [navigate]);

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    alert(`Product ${id} deleted locally!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your store products and inventory.</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500/10 text-red-600 dark:text-red-400 px-6 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-200 dark:border-red-900/30 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>

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