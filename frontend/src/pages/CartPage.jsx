import React, { useState } from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const initialCart = [
    {
        id: 1,
        name: "Gradient Graphic T-shirt",
        size: "Large",
        color: "White",
        price: 145,
        quantity: 1,
        image: "https://placehold.co/200x200/png?text=Gradient+Tee"
    },
    {
        id: 2,
        name: "Checkered Shirt",
        size: "Medium",
        color: "Red",
        price: 180,
        quantity: 1,
        image: "https://placehold.co/200x200/png?text=Checkered+Shirt"
    },
    {
        id: 3,
        name: "Skinny Fit Jeans",
        size: "Large",
        color: "Blue",
        price: 240,
        quantity: 1,
        image: "https://placehold.co/200x200/png?text=Jeans"
    }
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCart);

    // Handle Quantity Change
    const updateQuantity = (id, change) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    // Handle Remove Item
    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    // Calculations
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal * 0.20; // 20% discount based on screenshot
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
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
                    )}
                </div>

                {/* RIGHT: Order Summary */}
                <div className="w-full lg:w-[450px] shrink-0">
                    <div className="border border-gray-200 rounded-[20px] p-6 space-y-6">
                        <h2 className="text-2xl font-bold">Order Summary</h2>

                        <div className="space-y-4 text-gray-600">
                            <div className="flex justify-between text-lg">
                                <span>Subtotal</span>
                                <span className="font-bold text-black">${subtotal.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Discount (-20%)</span>
                                <span className="font-bold text-red-500">-${discount.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span>Delivery Fee</span>
                                <span className="font-bold text-black">${deliveryFee}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>

                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(0)}</span>
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

                        <button className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition shadow-lg">
                            Go to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;