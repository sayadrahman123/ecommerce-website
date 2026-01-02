import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../services/api'; // Import API

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await loginUser({ email, password });

            // 1. Save user info to localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // 2. Trigger an event so the Navbar can update immediately (we will fix Navbar next)
            window.dispatchEvent(new Event("storage"));

            alert(`Welcome back, ${user.name}!`);

            // 3. Redirect to Homepage
            navigate('/');

        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-24 flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-[20px] p-8 md:p-10 shadow-sm">

                <h1 className="text-3xl font-display font-bold uppercase text-center mb-8">Login</h1>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">Email Address</label>
                        <div className="bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
                            <Mail className="text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none w-full text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">Password</label>
                        <div className="bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
                            <Lock className="text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="bg-transparent border-none outline-none w-full text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="#" className="text-sm text-gray-500 hover:text-black hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-medium rounded-full py-3 hover:bg-gray-800 transition">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-black hover:underline">
                        Sign Up
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;