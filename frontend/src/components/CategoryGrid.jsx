import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        title: "Casual",
        image: "https://placehold.co/400x300/png?text=Casual", // Replace with real image
        className: "col-span-1 md:col-span-4 bg-white"
    },
    {
        id: 2,
        title: "Formal",
        image: "https://placehold.co/600x300/png?text=Formal",
        className: "col-span-1 md:col-span-8 bg-white"
    },
    {
        id: 3,
        title: "Party",
        image: "https://placehold.co/600x300/png?text=Party",
        className: "col-span-1 md:col-span-8 bg-white"
    },
    {
        id: 4,
        title: "Gym",
        image: "https://placehold.co/400x300/png?text=Gym",
        className: "col-span-1 md:col-span-4 bg-white"
    }
];

const CategoryGrid = () => {
    return (
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-6 md:px-12">

                {/* Gray Container */}
                <div className="bg-[#F0F0F0] rounded-[40px] px-6 md:px-16 py-12 md:py-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 uppercase text-shop-black">
                        Browse by dress style
                    </h2>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {categories.map((category) => (
                            <Link
                                to={`/category/${category.title.toLowerCase()}`}
                                key={category.id}
                                className={`${category.className} h-[200px] md:h-[280px] rounded-[20px] relative overflow-hidden group cursor-pointer shadow-sm`}
                            >
                                {/* Text Label */}
                                <span className="absolute top-6 left-6 text-2xl md:text-4xl font-bold z-10 font-sans">
                  {category.title}
                </span>

                                {/* Image */}
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="absolute inset-0 w-full h-full object-cover object-right-top group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CategoryGrid;