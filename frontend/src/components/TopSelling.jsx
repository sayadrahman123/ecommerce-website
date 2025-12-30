import React from 'react';
import ProductCard from './ProductCard';

// Data from "Top Selling" screenshot
const products = [
    {
        id: 5, // Continuing IDs from previous section
        title: "Vertical Striped Shirt",
        rating: 5.0,
        price: 212,
        originalPrice: 232,
        discount: 20,
        image: "https://placehold.co/400x400/png?text=Striped+Shirt",
    },
    {
        id: 6,
        title: "Courage Graphic T-shirt",
        rating: 4.0,
        price: 145,
        image: "https://placehold.co/400x400/png?text=Graphic+Tee",
    },
    {
        id: 7,
        title: "Loose Fit Bermuda Shorts",
        rating: 3.0,
        price: 80,
        image: "https://placehold.co/400x400/png?text=Bermuda+Shorts",
    },
    {
        id: 8,
        title: "Faded Skinny Jeans",
        rating: 4.5,
        price: 210,
        image: "https://placehold.co/400x400/png?text=Skinny+Jeans",
    }
];

const TopSelling = () => {
    return (
        <section className="py-16 md:py-24 border-b border-gray-200">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 uppercase text-shop-black">
                    Top Selling
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-10">
                    <button className="border border-gray-300 px-16 py-3 rounded-full hover:bg-black hover:text-white transition font-medium text-lg cursor-pointer">
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopSelling;