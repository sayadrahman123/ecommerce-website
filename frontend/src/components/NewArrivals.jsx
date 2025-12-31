import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api'; // Import the service

const NewArrivals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                // Take the first 4 items
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to load new arrivals:", error);
            }
        };

        loadProducts();
    }, []);

    return (
        <section className="py-16 md:py-24 border-b border-gray-200">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 uppercase text-shop-black">
                    New Arrivals
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            rating={product.rating}
                            price={product.price}
                            image={product.imageUrl}
                        />
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <button className="border border-gray-300 px-16 py-3 rounded-full hover:bg-black hover:text-white transition font-medium text-lg cursor-pointer">
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;