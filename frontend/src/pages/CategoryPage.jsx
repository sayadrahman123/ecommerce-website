import React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';

// Dummy data for the grid
const products = Array(9).fill({
    title: "Gradient Graphic T-shirt",
    rating: 3.5,
    price: 145,
    image: "https://placehold.co/400x400/png?text=Product",
}).map((p, i) => ({ ...p, id: i }));

const CategoryPage = () => {
    const { category } = useParams(); // e.g., "casual"

    return (
        <div className="container mx-auto px-6 md:px-12 py-8">

            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
                <span>Home</span> <span>&gt;</span>
                <span className="capitalize text-black font-medium">{category || 'Casual'}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters (Hidden on small mobile, can be made toggleable later) */}
                <div className="w-full md:w-[295px] shrink-0">
                    <Filters />
                </div>

                {/* Main Content */}
                <div className="flex-1">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold capitalize flex items-baseline gap-2">
                            {category || 'Casual'}
                            <span className="text-sm font-normal text-gray-500">Showing 1-10 of 100 Products</span>
                        </h2>

                        <div className="hidden md:flex items-center gap-2 text-gray-600">
                            <span>Sort by:</span>
                            <button className="font-medium text-black flex items-center gap-1">
                                Most Popular <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
                            <ArrowLeft size={16} /> Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="hidden md:flex items-center gap-1">
                            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-medium">1</button>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg text-gray-500">2</button>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg text-gray-500">3</button>
                            <span className="px-2 text-gray-500">...</span>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg text-gray-500">8</button>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg text-gray-500">9</button>
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg text-gray-500">10</button>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
                            Next <ArrowRight size={16} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CategoryPage;