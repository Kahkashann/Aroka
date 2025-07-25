// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2, User } from 'lucide-react';
import { axiosInstance } from '../config/axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      await axiosInstance.post('/auth/register', formData, {
        withCredentials: true,
        timeout: 10000,
      });
      setIsAuthenticated(true);
      navigate('/account');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonAnim = {
    whileTap: { scale: 0.98 },
    whileHover: { scale: 1.01 },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-2 md:px-4 py-12">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl" {...inputAnim}>
          <h2 className="text-2xl font-light text-gray-800 text-center mb-8">Sign Up</h2>

          {errorMsg && (
            <motion.div className="bg-red-50 p-2.5 md:p-3 mb-5" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <p className="text-red-700 text-sm text-center font-medium">{errorMsg}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <motion.div {...inputAnim}>
              <label htmlFor="name" className="block text-sm font-extralight text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="Enter your name"
                  className="w-full pl-11 pr-4 py-2 font-light bg-white border border-black focus:outline-none focus:ring-1 focus:ring-black text-gray-800 placeholder-gray-500 placeholder:font-thin placeholder:text-sm transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div {...inputAnim}>
              <label htmlFor="email" className="block text-sm font-extralight text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-2 font-light bg-white border border-black focus:outline-none focus:ring-1 focus:ring-black text-gray-800 placeholder-gray-500 placeholder:font-thin placeholder:text-sm transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div {...inputAnim}>
              <label htmlFor="password" className="block text-sm font-extralight text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-2 font-light bg-white border border-black focus:outline-none focus:ring-1 focus:ring-black text-gray-800 placeholder-gray-500 placeholder:font-thin placeholder:text-sm transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              className={`w-full bg-black text-white font-light py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${isLoading ? 'cursor-not-allowed' : 'hover:bg-gray-900'}`}
              {...buttonAnim}
              disabled={isLoading}
            >
              {isLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Creating account...</> : 'Create Account'}
            </motion.button>
          </form>

          <motion.div className="mt-6 md:mt-8 text-center space-y-4" {...inputAnim}>
            <Link to="/account/login" className="inline-block text-sm font-extralight text-gray-800 hover:text-gray-900 underline">Already have an account? Sign in</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
