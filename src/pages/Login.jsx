import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaSearch, FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import logo from "../assets/logo.png";
import { signInWithGoogle, signInWithGithub } from '../firebase';

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Images', 'Videos', 'News', 'Shopping', 'Books', 'Finance'];

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');
 
  useEffect(() => {
    if (isAuthenticated) { 
      navigate('/');  
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!form.name.trim()) {
        toast.error('Please enter your full name');
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (!form.email || !form.password) {
        toast.error('Please fill all fields');
        return;
      }
      try {
        const response = await fetch('http://localhost:4000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.message || 'Signup failed');
          return;
        }
        toast.success('Signup successful! You can now login.');
        setIsSignup(false);
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
      } catch (error) {
        toast.error('Error during signup');
      }
    } else {
      if (!form.email || !form.password) {
        toast.error('Enter email and password');
        return;
      }
      try {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: form.email, password: form.password }),
  });
  if (!response.ok) {
    const errMsg = await response.text();
    throw new Error(`Error: ${errMsg}`);
  }
  const data = await response.json();

  if (!data.token) {
    throw new Error('Token not received from server');
  }

  localStorage.setItem('loggedInUser', JSON.stringify(data.user));
  localStorage.setItem('token', data.token); 
  toast.success(`Welcome back, ${data.user.name}!`);
  setForm({ name: '', email: '', password: '', confirmPassword: '' });
  navigate('/');
} catch (err) {
  toast.error(err.message || 'Login failed');
}
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
 
      localStorage.setItem('token', 'some-auth-token');
      localStorage.setItem('loggedInUser', JSON.stringify({ name: user.displayName || user.email, email: user.email }));

      toast.success(`Logged in as ${user.displayName || user.email}`);
 
      navigate('/');
    } catch (err) {
      toast.error('Google sign-in failed: ' + err.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithGithub();
      const user = result.user;

      localStorage.setItem('token', 'some-auth-token');
      localStorage.setItem('loggedInUser', JSON.stringify({ name: user.displayName || user.email, email: user.email }));

      toast.success(`Logged in as ${user.displayName || user.email}`);
 
      navigate('/');
    } catch (err) {
      toast.error('GitHub sign-in failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <Toaster position="top-center" />
 
      <div className="w-1/2 p-6 hidden md:block"> 
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-3 rounded-full text-white">
            <FaSearch className='text-3xl' />
          </div>
          <img src={logo} alt="logo" className="h-24" />
        </div> 
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-white p-4 rounded-full shadow-md focus:outline-none pl-10"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> 
        <div className="flex flex-wrap gap-3">
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(item)}
              className={`cursor-pointer px-4 py-2 rounded-full shadow transition-all ${
                selectedCategory === item ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
 
      <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg max-w-md"> 
        <div className="flex justify-between mb-6 bg-gray-100 rounded-full overflow-hidden">
          <button
            onClick={() => { setIsSignup(false); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }}
            className={`w-1/2 py-2 cursor-pointer ${!isSignup ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsSignup(true); setForm({ name: '', email: '', password: '', confirmPassword: '' }); }}
            className={`w-1/2 py-2 cursor-pointer ${isSignup ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold' : 'text-gray-500'}`}
          >
            Signup
          </button>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          {isSignup ? 'Signup Form' : 'Login Form'}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full focus:outline-none"
                value={form.name}
                onChange={handleChange}
                required={isSignup}
              />
            </div>
          )}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full focus:outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {isSignup && (
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full focus:outline-none"
                value={form.confirmPassword}
                onChange={handleChange}
                required={isSignup}
              />
            </div>
          )}
          {!isSignup && (
            <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
              Forgot Password?
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>

        {/* OAuth options */}
        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
 
        <div className="flex gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 p-3 border rounded"
          >
            <FcGoogle /> Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 p-3 border rounded text-gray-800"
          >
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;