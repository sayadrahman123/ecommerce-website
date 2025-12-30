import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register attempt:", formData);
        // Backend logic will go here
    };

    return (
        <div className="container mx-auto px-6 md:px-12 py-12 md:py-24 flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-[20px] p-8 md:p-10 shadow-sm">

                <h1 className="text-3xl font-display font-bold uppercase text-center mb-8">Sign Up</h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">Full Name</label>
                        <div className="bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
                            <User className="text-gray-400" size={20} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="bg-transparent border-none outline-none w-full text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">Email Address</label>
                        <div className="bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
                            <Mail className="text-gray-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="bg-transparent border-none outline-none w-full text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 ml-1">Confirm Password</label>
                        <div className="bg-[#F0F0F0] rounded-full px-4 py-3 flex items-center gap-3">
                            <Lock className="text-gray-400" size={20} />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="bg-transparent border-none outline-none w-full text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-medium rounded-full py-3 hover:bg-gray-800 transition mt-4">
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-black hover:underline">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;