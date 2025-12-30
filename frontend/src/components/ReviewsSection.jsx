import React, { useState } from 'react';
import { Star, CheckCircle2, MoreHorizontal, SlidersHorizontal, ChevronDown } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Samantha D.",
        rating: 4.5,
        date: "August 14, 2023",
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
    },
    {
        id: 2,
        name: "Alex M.",
        rating: 5,
        date: "August 15, 2023",
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
    },
    {
        id: 3,
        name: "Ethan R.",
        rating: 3.5,
        date: "August 16, 2023",
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
    },
    {
        id: 4,
        name: "Olivia P.",
        rating: 5,
        date: "August 17, 2023",
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."
    },
    {
        id: 5,
        name: "Liam K.",
        rating: 5,
        date: "August 18, 2023",
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."
    },
    {
        id: 6,
        name: "Ava H.",
        rating: 4.5,
        date: "August 19, 2023",
        text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
    }
];

const ReviewsSection = () => {
    const [activeTab, setActiveTab] = useState('reviews');

    return (
        <section className="mb-20">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 mb-8">
                {['Product Details', 'Rating & Reviews', 'FAQs'].map((tab) => {
                    const key = tab.toLowerCase().includes('rating') ? 'reviews' : tab.toLowerCase().replace(' ', '-');
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 pb-4 text-center text-lg font-medium transition relative ${
                                activeTab === key ? 'text-black font-semibold' : 'text-gray-500'
                            }`}
                        >
                            {tab}
                            {activeTab === key && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Header (Filter & Sort) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    All Reviews <span className="text-base text-gray-500 font-normal">(451)</span>
                </h3>

                <div className="flex gap-3">
                    <button className="bg-[#F0F0F0] p-3 rounded-full hover:bg-gray-200">
                        <SlidersHorizontal size={20} />
                    </button>
                    <button className="bg-[#F0F0F0] px-5 py-3 rounded-full flex items-center gap-2 hover:bg-gray-200 font-medium hidden md:flex">
                        Latest <ChevronDown size={16} />
                    </button>
                    <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800">
                        Write a Review
                    </button>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-[20px] p-8 space-y-4">
                        <div className="flex justify-between items-start">
                            {/* Stars */}
                            <div className="flex text-yellow-400 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                                        strokeWidth={0}
                                    />
                                ))}
                            </div>
                            <button className="text-gray-400 hover:text-black">
                                <MoreHorizontal />
                            </button>
                        </div>

                        {/* Name */}
                        <h4 className="font-bold text-lg flex items-center gap-2">
                            {review.name} <CheckCircle2 size={18} className="text-green-500 fill-green-500 text-white" />
                        </h4>

                        {/* Text */}
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            "{review.text}"
                        </p>

                        {/* Date */}
                        <p className="text-gray-500 font-medium text-sm pt-2">
                            Posted on {review.date}
                        </p>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10">
                <button className="border border-gray-300 px-12 py-3 rounded-full hover:bg-black hover:text-white transition font-medium">
                    Load More Reviews
                </button>
            </div>
        </section>
    );
};

export default ReviewsSection;