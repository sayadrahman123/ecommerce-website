import React, { useEffect, useState } from 'react';
import { Tag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react'; // Added Icons
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, placeOrder } from "../services/api.js";
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
    const [cart, setCart] = useState(null); // Changed from [] to null to handle object structure
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // 1. Fetch Cart from Backend
    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error("Failed to load cart:", error);
            setCart(null);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Handle Remove Item (Connects to API)
    const handleRemoveItem = async (cartItemId) => {
        if(!confirm("Are you sure you want to remove this item?")) return;

        try {
            // Optimistic UI update (optional, but makes it feel faster)
            const updatedItems = cart.items.filter(item => item.id !== cartItemId);
            setCart({ ...cart, items: updatedItems });

            // Call API
            await removeFromCart(cartItemId);

            // Re-fetch to ensure totals are perfectly synced with backend
            fetchCartData();
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item.");
        }
    };

    const handleCheckout = async () => {
        try {
            // await placeOrder();
            // alert("Order Placed Successfully!");
            navigate('/checkout'); // Redirect to Order History
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    // Loading State
    if (isLoading) return <div className="text-center py-20">Loading Cart...</div>;

    // Empty State
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/new" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    // 3. Calculations
    // Note: We calculate subtotal here based on items to allow for dynamic UI updates
    // const subtotal = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const subtotal = cart.totalPrice;
    const discount = subtotal * 0.20; // 20% Logic
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

    return (
        <div className="container mx-auto px-6 md:px-12 py-8">

            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-6 space-x-2">
                <Link to="/">Home</Link> <span>&gt;</span>
                <span className="text-black font-medium">Cart</span>
            </div>

            <h1 className="text-4xl font-display font-bold uppercase mb-8">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT: Cart Items List */}
                <div className="flex-1 border border-gray-200 rounded-[20px] p-4 md:p-6 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border-b border-gray-100 last:border-0 items-center">

                            {/* Product Image */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{item.productName}</h3>
                                        <div className="text-sm text-gray-500 mt-1 space-x-3">
                                            <span>Size: <span className="text-black">L</span></span>
                                            <span>Color: <span className="text-black">Standard</span></span>
                                        </div>
                                        <p className="text-xl font-bold mt-2">${item.productPrice}</p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Quantity (Visual Only for now) */}
                            <div className="flex flex-col items-end justify-between h-full">
                                <div className="bg-[#F0F0F0] rounded-full flex items-center px-4 py-2 gap-4 mt-2">
                                    {/* Note: Update Quantity API requires a new backend endpoint, leaving as display for now */}
                                    <Minus size={16} className="text-gray-400 cursor-not-allowed" />
                                    <span className="font-medium">{item.quantity}</span>
                                    <Plus size={16} className="text-gray-400 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Order Summary */}
                <div className="w-full lg:w-[450px] shrink-0">
                    <div className="border border-gray-200 rounded-[20px] p-6 space-y-6">
                        <h2 className="text-2xl font-bold">Order Summary</h2>

                        <div className="space-y-4 text-gray-600">
                            <div className="flex justify-between text-lg">
                                <span>Subtotal</span>
                                <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Discount (-20%)</span>
                                <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Delivery Fee</span>
                                <span className="font-bold text-black">${deliveryFee.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {/* Promo Code Input */}
                        <div className="flex gap-3">
                            <div className="bg-[#F0F0F0] rounded-full flex items-center px-4 py-3 flex-1 gap-2">
                                <Tag className="text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Add promo code"
                                    className="bg-transparent border-none outline-none w-full text-sm"
                                />
                            </div>
                            <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                                Apply
                            </button>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg cursor-pointer">
                            Go to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;