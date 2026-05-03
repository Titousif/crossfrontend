import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await authAPI.login({ email, password });
      console.log('Login success:', data);
      
      // Store user info
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Check if admin (simple check - in production use proper role system)
      if (data.user?.role === 'admin') {
        localStorage.setItem('isAdmin', 'true');
      }
      
      // Redirect to home page
      navigate('/');
      window.location.reload(); // Refresh to update auth state
      
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-slate-950 dark:border dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline dark:text-cyan-300">
          Create an account
        </a>
      </p>
    </div>
  );
};

export default Login;