import React, { useState } from 'react';
import { ChevronRight, ChevronUp, SlidersHorizontal, Check } from 'lucide-react';

const Filters = () => {
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [selectedColor, setSelectedColor] = useState('Blue');
    const [selectedSize, setSelectedSize] = useState('Large');

    const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
    const colors = [
        { name: 'Green', class: 'bg-green-500' },
        { name: 'Red', class: 'bg-red-500' },
        { name: 'Yellow', class: 'bg-yellow-400' },
        { name: 'Orange', class: 'bg-orange-500' },
        { name: 'Cyan', class: 'bg-cyan-400' },
        { name: 'Blue', class: 'bg-blue-600' },
        { name: 'Purple', class: 'bg-purple-600' },
        { name: 'Pink', class: 'bg-pink-500' },
        { name: 'White', class: 'bg-white border' },
        { name: 'Black', class: 'bg-black' },
    ];
    const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
    const styles = ["Casual", "Formal", "Party", "Gym"];

    return (
        <div className="border border-gray-200 rounded-[20px] p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                <h3 className="font-bold text-xl">Filters</h3>
                <SlidersHorizontal className="text-gray-400" size={20} />
            </div>

            {/* Categories List */}
            <div className="border-b border-gray-200 pb-6 space-y-4">
                {categories.map((cat) => (
                    <div key={cat} className="flex justify-between items-center text-gray-600 cursor-pointer hover:text-black">
                        <span>{cat}</span>
                        <ChevronRight size={16} />
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Price</h4>
                    <ChevronUp size={16} />
                </div>
                <input
                    type="range"
                    min="0"
                    max="500"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-sm font-medium mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* Colors */}
            <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Colors</h4>
                    <ChevronUp size={16} />
                </div>
                <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.name)}
                            className={`w-9 h-9 rounded-full ${c.class} flex items-center justify-center border transition ${selectedColor === c.name ? 'ring-2 ring-gray-300' : 'border-transparent'}`}
                        >
                            {selectedColor === c.name && <Check size={14} className={c.name === 'White' ? 'text-black' : 'text-white'} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg">Size</h4>
                    <ChevronUp size={16} />
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dress Style */}
            <div className="border-b border-gray-200 pb-6 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">Dress Style</h4>
                    <ChevronUp size={16} />
                </div>
                {styles.map((style) => (
                    <div key={style} className="flex justify-between items-center text-gray-600 cursor-pointer hover:text-black">
                        <span>{style}</span>
                        <ChevronRight size={16} />
                    </div>
                ))}
            </div>

            <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition">
                Apply Filter
            </button>

        </div>
    );
};

export default Filters;