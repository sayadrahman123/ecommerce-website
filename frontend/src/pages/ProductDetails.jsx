import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
// Import the new components
import ReviewsSection from '../components/ReviewsSection';
import ProductRecommendations from '../components/ProductRecommendations';

const ProductDetails = () => {
    const { id } = useParams();

    // ... (Keep existing state and product data EXACTLY as before) ...
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('brown');
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);

    const product = {
        title: "ONE LIFE GRAPHIC T-SHIRT",
        price: 260,
        originalPrice: 300,
        discount: 40,
        rating: 4.5,
        description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        images: [
            "https://placehold.co/600x600/555B49/ffffff?text=Front+View",
            "https://placehold.co/600x600/555B49/ffffff?text=Back+View",
            "https://placehold.co/600x600/555B49/ffffff?text=Detail+View"
        ],
        colors: [
            { name: 'brown', class: 'bg-[#4F4631]' },
            { name: 'green', class: 'bg-[#314F4A]' },
            { name: 'navy', class: 'bg-[#31344F]' },
        ],
        sizes: ['Small', 'Medium', 'Large', 'X-Large']
    };

    return (
        <div className="container mx-auto px-6 md:px-12 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
                <span>Home</span> <span>&gt;</span>
                <span>Shop</span> <span>&gt;</span>
                <span>Men</span> <span>&gt;</span>
                <span className="text-black font-medium">T-shirts</span>
            </div>

            {/* Top Section: Grid for Image Gallery & Info */}
            <div className="grid md:grid-cols-2 gap-10 mb-20">
                {/* ... (Keep existing image gallery and info code EXACTLY as before) ... */}
                {/* LEFT: Image Gallery */}
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-auto">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border rounded-[20px] overflow-hidden w-24 h-24 md:w-32 md:h-32 shrink-0 ${selectedImage === index ? 'border-black border-2' : 'border-transparent'}`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden">
                        <img
                            src={product.images[selectedImage]}
                            alt="Main Product"
                            className="w-full h-full object-cover object-center max-h-[500px] md:max-h-[600px]"
                        />
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-display font-bold uppercase">{product.title}</h1>
                    <div className="flex items-center gap-2 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={0} />
                        ))}
                        <span className="text-black text-sm ml-1">{product.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold">${product.price}</span>
                        <span className="text-3xl font-bold text-gray-300 line-through">${product.originalPrice}</span>
                        <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-full font-medium">-{product.discount}%</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed border-b border-gray-200 pb-6">{product.description}</p>
                    <div>
                        <p className="text-gray-500 mb-3 text-sm">Select Colors</p>
                        <div className="flex gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center border-2 ${selectedColor === color.name ? 'border-white ring-1 ring-black' : 'border-transparent'}`}
                                >
                                    {selectedColor === color.name && <span className="text-white">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-gray-500 mb-3 text-sm">Choose Size</p>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-[#F0F0F0] rounded-full flex items-center px-5 py-3 gap-6">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={20} /></button>
                            <span className="font-medium w-4 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}><Plus size={20} /></button>
                        </div>
                        <button className="flex-1 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* NEW: Reviews Section */}
            <ReviewsSection />

            {/* NEW: Recommendations Section */}
            <ProductRecommendations />
        </div>
    );
};

export default ProductDetails;