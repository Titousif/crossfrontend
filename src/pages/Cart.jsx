import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ✅ Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: ''
  });

  // ✅ Validation Errors State
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address.";
    
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(formData.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => setIsModalOpen(true);

  const confirmPurchase = (e) => {
    e.preventDefault();
    if (validate()) {
      clearCart();
      setIsModalOpen(false);
      alert(`Success! Thank you ${formData.fullName}, your order for $${totalPrice.toFixed(2)} is being processed.`);
      setFormData({ fullName: '', email: '', address: '', cardNumber: '' });
      setErrors({});
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-20 text-center dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">← Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 relative dark:bg-gray-950 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Shopping Cart</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border dark:border-gray-700">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b dark:border-gray-700 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0 gap-4">
            
            <div className="flex items-center gap-4 w-full md:w-2/5">
              <div className="h-16 w-16 bg-gray-200 rounded p-1 flex items-center justify-center text-center text-xs font-semibold">
                📦 {item.category}
              </div>
              <h4 className="text-sm font-semibold line-clamp-2 dark:text-white" title={item.title}>{item.title}</h4>
            </div>

            <div className="flex items-center justify-center gap-3 w-full md:w-1/5">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 font-bold dark:text-white transition"
              >
                -
              </button>
              <span className="font-bold w-6 text-center dark:text-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 font-bold dark:text-white transition"
              >
                +
              </button>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-2/5 text-right">
              <span className="font-bold text-lg text-indigo-600 dark:text-violet-400">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xs font-bold uppercase p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-4 border dark:border-gray-700">
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          Grand Total: <span className="text-3xl text-indigo-600 dark:text-violet-400 ml-2">${totalPrice.toFixed(2)}</span>
        </span>
        <button
          onClick={handleCheckout}
          className="bg-indigo-600 text-white px-10 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition w-full md:w-auto shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          Checkout Now
        </button>
      </div>

      {/* ✅ Checkout Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Secure Checkout</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <form onSubmit={confirmPurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-200'}`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-200'}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-200'}`}
                  placeholder="123 Cross St, Oran, Algeria"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number (16-digits)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    className={`w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white outline-none focus:ring-2 ${errors.cardNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-200'}`}
                    placeholder="0000 0000 0000 0000"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                  </div>
                </div>
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  Confirm Purchase - ${totalPrice.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
