import React from 'react';
import ProductCard from './ProductCard';

const products = [
    {
        id: 1,
        title: "T-shirt with Tape Details",
        rating: 4.5,
        price: 120,
        image: "https://placehold.co/400x400/png?text=T-Shirt", // Replace with real image later
    },
    {
        id: 2,
        title: "Skinny Fit Jeans",
        rating: 3.5,
        price: 240,
        originalPrice: 260,
        discount: 20,
        image: "https://placehold.co/400x400/png?text=Jeans",
    },
    {
        id: 3,
        title: "Checkered Shirt",
        rating: 4.5,
        price: 180,
        image: "https://placehold.co/400x400/png?text=Checkered+Shirt",
    },
    {
        id: 4,
        title: "Sleeve Striped T-shirt",
        rating: 4.5,
        price: 130,
        originalPrice: 160,
        discount: 30,
        image: "https://placehold.co/400x400/png?text=Striped+T-Shirt",
    }
];

const NewArrivals = () => {
    return (
        <section className="py-16 border-b border-gray-200">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 uppercase">
                    New Arrivals
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-10">
                    <button className="border border-gray-300 px-16 py-3 rounded-full hover:bg-black hover:text-white transition font-medium text-lg">
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;