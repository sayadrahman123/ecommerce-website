import React, { useEffect, useState } from 'react';
import { Star, CheckCircle2, MoreHorizontal, SlidersHorizontal, ChevronDown, User } from 'lucide-react';
import { getReviews, addReview } from '../services/api';

const ReviewsSection = ({ productId }) => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        loadReviews();
    }, [productId]);

    const loadReviews = async () => {
        try {
            const data = await getReviews(productId);
            setReviews(data);
        } catch (error) {
            console.error("Failed to load reviews", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to write a review");
            return;
        }
        try {
            await addReview(productId, rating, comment);
            setComment("");
            setShowForm(false);
            await loadReviews();
            alert("Review submitted successfully!"); // Success message
        } catch (error) {
            // NEW: Handle the specific error message from backend
            if (error.response && error.response.status === 403) {
                alert("You can only review products you have purchased.");
            } else {
                alert("Failed to submit review");
            }
        }
    };

    return (
        <section className="mb-20 mt-12">
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
                    All Reviews <span className="text-base text-gray-500 font-normal">({reviews.length})</span>
                </h3>

                <div className="flex gap-3">
                    <button className="bg-[#F0F0F0] p-3 rounded-full hover:bg-gray-200">
                        <SlidersHorizontal size={20} />
                    </button>
                    <button className="bg-[#F0F0F0] px-5 py-3 rounded-full hidden md:flex items-center gap-2 hover:bg-gray-200 font-medium">
                        Latest <ChevronDown size={16} />
                    </button>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800"
                    >
                        {showForm ? "Cancel" : "Write a Review"}
                    </button>
                </div>
            </div>

            {/* --- WRITE REVIEW FORM (Toggleable) --- */}
            {showForm && (
                <div className="bg-gray-50 p-6 rounded-[20px] mb-8 border border-gray-200 animate-fade-in">
                    <h4 className="font-bold text-lg mb-4">Write your review</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-600">Select Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="transition hover:scale-110"
                                    >
                                        <Star
                                            size={28}
                                            fill={star <= rating ? "#FFC633" : "none"}
                                            className={star <= rating ? "text-[#FFC633]" : "text-gray-300"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            placeholder="Share your thoughts about the product..."
                            className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-black min-h-[100px]"
                        />
                        <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-[20px] p-8 space-y-4 bg-white">
                            <div className="flex justify-between items-start">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill={i < review.rating ? "#FFC633" : "none"}
                                            className={i < review.rating ? "text-[#FFC633]" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <button className="text-gray-400 hover:text-black">
                                    <MoreHorizontal />
                                </button>
                            </div>

                            {/* Name */}
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                {review.user?.name || "Anonymous"}
                                <CheckCircle2 size={18} className="text-[#01AB31] fill-[#01AB31] text-white" />
                            </h4>

                            {/* Text */}
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                "{review.comment}"
                            </p>

                            {/* Date */}
                            <p className="text-gray-500 font-medium text-sm pt-2">
                                Posted on {new Date(review.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-10 text-gray-500">
                        No reviews yet. Be the first to write one!
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {reviews.length > 6 && (
                <div className="flex justify-center mt-10">
                    <button className="border border-gray-300 px-12 py-3 rounded-full hover:bg-black hover:text-white transition font-medium">
                        Load More Reviews
                    </button>
                </div>
            )}
        </section>
    );
};

export default ReviewsSection;