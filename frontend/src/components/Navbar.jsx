import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, CircleUserRound, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`); // We'll reuse the Home page to show results
            setSearchTerm(""); // Clear input
        }
    };

    // Check login status on load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }

        // Listen for login/logout events (so the navbar updates instantly)
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem('user'));
            setUser(updatedUser);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="border-b border-shop-border bg-white sticky top-0 z-50">
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


                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px]">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for hoodies, t-shirts..."
                        className="bg-transparent border-none outline-none ml-2 w-full text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                {/* Icons Area - NOW UPDATED */}
                <div className="flex items-center gap-4">
                    <Search className="md:hidden" size={24} />
                    <Link to="/cart">
                        <ShoppingCart size={24} className="hover:text-gray-600 cursor-pointer" />
                    </Link>

                    {/* DYNAMIC USER SECTION */}
                    {user ? (
                        <div className="flex items-center gap-3 group relative cursor-pointer">
                            {/* Show Name (Hidden on very small screens) */}
                            <span className="text-sm font-medium hidden md:block">Hi, {user.name}</span>

                            {/* User Avatar (First letter of name) */}
                            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold uppercase">
                                {user.username ? user.username.charAt(0) : 'U'}
                            </div>

                            {/* Dropdown Menu (Appears on Hover) */}

                            <div
                                className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 hidden group-hover:block hover:block z-50 p-2"
                            >
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    ) : (
                        // Not Logged In? Show Default Icon
                        <Link to="/login">
                            <CircleUserRound size={24} className="hover:text-gray-600 cursor-pointer" />
                        </Link>
                    )}
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