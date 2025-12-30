import React from 'react';
import ProductCard from './ProductCard';

const recommendedProducts = [
    {
        id: 11,
        title: "Polo with Contrast Trims",
        rating: 4.0,
        price: 212,
        originalPrice: 242,
        discount: 20,
        image: "https://placehold.co/400x400/png?text=Polo+Shirt",
    },
    {
        id: 12,
        title: "Gradient Graphic T-shirt",
        rating: 3.5,
        price: 145,
        image: "https://placehold.co/400x400/png?text=Gradient+Tee",
    },
    {
        id: 13,
        title: "Polo with Tipping Details",
        rating: 4.5,
        price: 180,
        image: "https://placehold.co/400x400/png?text=Tipping+Polo",
    },
    {
        id: 14,
        title: "Black Striped T-shirt",
        rating: 5.0,
        price: 120,
        originalPrice: 150,
        discount: 30,
        image: "https://placehold.co/400x400/png?text=Striped+Tee",
    }
];

const ProductRecommendations = () => {
    return (
        <section className="mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 uppercase">
                You might also like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
};

export default ProductRecommendations;