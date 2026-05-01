import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

function validate(fields) {
  const errors = {}
  if (!fields.fullName.trim()) errors.fullName = 'Le nom complet est requis.'
  if (!fields.email.trim()) {
    errors.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Format d'email invalide."
  }
  if (!fields.address.trim()) errors.address = "L'adresse de livraison est requise."
  if (!fields.cardNumber.trim()) {
    errors.cardNumber = 'Le numéro de carte est requis.'
  } else if (!/^\d{16}$/.test(fields.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Le numéro de carte doit contenir exactement 16 chiffres.'
  }
  return errors
}

export default function CheckoutModal({ onClose }) {
  const { clearCart, cartTotal } = useCart()
  const [fields, setFields] = useState({
    fullName: '', email: '', address: '', cardNumber: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16)
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
      setFields(prev => ({ ...prev, cardNumber: formatted }))
    } else {
      setFields(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setApiError('')

    try {
      // POST the order to the Node.js backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,           // hardcoded for now (TP7 — no auth yet)
          totalPrice: cartTotal
        })
      })

      if (!response.ok) {
        const data = await response.json()
        setApiError(data.error || 'Erreur lors de la commande.')
        setLoading(false)
        return
      }

      setSuccess(true)
      clearCart()
      setTimeout(onClose, 3000)

    } catch (err) {
      setApiError('Impossible de contacter le serveur. Vérifiez que le backend tourne sur le port 3000.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle size={64} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Commande confirmée !</h2>
          <p className="text-gray-500 dark:text-gray-400">Commande enregistrée dans PostgreSQL ✅</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Finaliser la commande</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">

          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
            <p className="text-sm text-emerald-700 dark:text-emerald-300">Total à payer</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">${cartTotal.toFixed(2)}</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="fullName" value={fields.fullName} onChange={handleChange}
              placeholder="Ahmed Benali"
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.fullName ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email" name="email" value={fields.email} onChange={handleChange}
              placeholder="ahmed@example.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Adresse de livraison <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address" value={fields.address} onChange={handleChange}
              placeholder="Rue, Ville, Wilaya, Algérie" rows={2}
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${errors.address ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Numéro de carte (16 chiffres) <span className="text-red-500">*</span>
            </label>
            <input
              type="text" name="cardNumber" value={fields.cardNumber} onChange={handleChange}
              placeholder="1234 5678 9012 3456" maxLength={19}
              className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider ${errors.cardNumber ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
            />
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>

          {/* API Error */}
          {apiError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{apiError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            {loading ? 'Enregistrement...' : `Confirmer la commande — $${cartTotal.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  )
}
