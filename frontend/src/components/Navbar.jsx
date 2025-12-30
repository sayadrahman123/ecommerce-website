import React, { useState } from 'react';
import { Search, ShoppingCart, CircleUserRound, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="border-b border-shop-border bg-white sticky top-0 z-50">
            {/* Increased padding from px-4 to px-6 (mobile) and px-12 (desktop) */}
            <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-8">

                {/* Mobile Menu Button + Logo */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                    <Link to="/" className="text-3xl font-display font-bold uppercase tracking-tighter">
                        RAHMANI
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-6 text-base font-medium">
                    <Link to="/shop" className="hover:text-gray-600">Shop</Link>
                    <Link to="/sale" className="hover:text-gray-600">On Sale</Link>
                    <Link to="/new" className="hover:text-gray-600">New Arrivals</Link>
                    <Link to="/brands" className="hover:text-gray-600">Brands</Link>
                </div>

                {/* Search Bar - Changed background to bg-gray-200 for better visibility */}
                <div className="hidden md:flex flex-1 max-w-xl bg-gray-200 rounded-full px-4 py-3 items-center gap-2">
                    <Search className="text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 text-black"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <Search className="md:hidden" size={24} />
                    <Link to="/cart">
                        <ShoppingCart size={24} className="hover:text-gray-600 cursor-pointer" />
                    </Link>
                    <Link to="/profile">
                        <CircleUserRound size={24} className="hover:text-gray-600 cursor-pointer" />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-4 font-medium">
                    <Link to="/shop" className="block">Shop</Link>
                    <Link to="/sale" className="block">On Sale</Link>
                    <Link to="/new" className="block">New Arrivals</Link>
                    <Link to="/brands" className="block">Brands</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;