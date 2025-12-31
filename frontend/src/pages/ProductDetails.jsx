import React, { useState, useEffect } from 'react';
import { Star, Minus, Plus, Check } from 'lucide-react'; // Added 'Check' icon
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import ReviewsSection from '../components/ReviewsSection';
import ProductRecommendations from '../components/ProductRecommendations';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // State for interactive elements
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProductById(id);
                setProduct(data);

                // Auto-select first options if available
                if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
                if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);

            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    // Handle images (Backend only has 1, so we repeat it for gallery effect)
    const images = product.imageUrl ? [product.imageUrl, product.imageUrl, product.imageUrl] : [];

    return (
        <div className="container mx-auto px-6 md:px-12 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
                <span>Home</span> <span>&gt;</span>
                <span>Shop</span> <span>&gt;</span>
                <span>Men</span> <span>&gt;</span>
                <span className="text-black font-medium">{product.name}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-20">

                {/* LEFT: Image Gallery */}
                <div className="flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-auto">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border rounded-[20px] overflow-hidden w-24 h-24 md:w-32 md:h-32 shrink-0 ${selectedImage === index ? 'border-black border-2' : 'border-transparent'}`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden">
                        <img
                            src={images[selectedImage]}
                            alt="Main Product"
                            className="w-full h-full object-cover object-center max-h-[500px] md:max-h-[600px]"
                        />
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-display font-bold uppercase">{product.name}</h1>

                    <div className="flex items-center gap-2 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={0} />
                        ))}
                        <span className="text-black text-sm ml-1">{product.rating}/5</span>
                    </div>

                    {/* FIX: Conditional Price Rendering */}
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold">${product.price}</span>
                        {/* Only show Original Price if it exists */}
                        {product.originalPrice && (
                            <span className="text-3xl font-bold text-gray-300 line-through">${product.originalPrice}</span>
                        )}
                        {/* Only show Discount if it exists */}
                        {product.discount && (
                            <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-full font-medium">-{product.discount}%</span>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed border-b border-gray-200 pb-6">
                        {product.description}
                    </p>

                    {/* FIX: Dynamic Colors from DB */}
                    {product.colors && product.colors.length > 0 && (
                        <div>
                            <p className="text-gray-500 mb-3 text-sm">Select Colors</p>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${selectedColor === color ? 'border-white ring-1 ring-black' : 'border-transparent'}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >
                                        {selectedColor === color && <Check size={16} className="text-white drop-shadow-md" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FIX: Dynamic Sizes from DB */}
                    {product.sizes && product.sizes.length > 0 && (
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
                    )}

                    {/* Add to Cart Section */}
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

            <ReviewsSection />
            <ProductRecommendations />
        </div>
    );
};

export default ProductDetails;