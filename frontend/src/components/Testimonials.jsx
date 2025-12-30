import React from 'react';
import { Star, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Sarah M.",
        rating: 5,
        text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 2,
        name: "Alex K.",
        rating: 5,
        text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
        id: 3,
        name: "James L.",
        rating: 5,
        text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
    {
        id: 4,
        name: "Mooen",
        rating: 4,
        text: "The shipping was incredibly fast and the packaging was eco-friendly. I appreciate a brand that cares about the details as much as the product itself."
    },
    {
        id: 5,
        name: "Emily R.",
        rating: 5,
        text: "I love how the clothes fit! The size guide was super accurate. Will definitely be ordering again for the summer collection."
    }
];

const Testimonials = () => {
    return (
        <section className="py-12 md:py-20 bg-white mb-20">
            <div className="container mx-auto px-6 md:px-12 relative">

                {/* Header + Arrows */}
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-shop-black">
                        Our Happy Customers
                    </h2>
                    <div className="flex gap-4">
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                            <ArrowLeft size={24} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-200 transition">
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Testimonial Container with Blur Edges */}
                <div className="relative overflow-hidden">

                    {/* Left Blur Gradient Overlay */}
                    <div className="absolute top-0 left-0 h-full w-[10%] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:block hidden" />

                    {/* Right Blur Gradient Overlay */}
                    <div className="absolute top-0 right-0 h-full w-[10%] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:block hidden" />

                    {/* Scrolling List - Scrollbar Hidden */}
                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="
                  flex-shrink-0
                  w-full             /* Mobile: Full Width */
                  md:w-[32%]         /* Desktop: 32% Width (fits 3 items with gap) */
                  border border-gray-200 rounded-[20px] p-6 md:p-8
                  snap-center bg-white hover:border-black/10 transition
                "
                            >
                                {/* Stars */}
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                            strokeWidth={0}
                                        />
                                    ))}
                                </div>

                                {/* Name + Verified Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="font-bold text-xl font-sans">{review.name}</h3>
                                    <CheckCircle2 size={20} className="text-green-500 fill-green-500 text-white" />
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    "{review.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;