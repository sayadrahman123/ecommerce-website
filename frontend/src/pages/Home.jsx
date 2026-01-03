import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import BrandBar from '../components/BrandBar';
import NewArrivals from '../components/NewArrivals';
import TopSelling from '../components/TopSelling';
import CategoryGrid from '../components/CategoryGrid';
import Testimonials from '../components/Testimonials';
import { searchProducts } from '../services/api';
// Assuming you have a ProductCard to display search results.
// If not, we might need to check where NewArrivals imports it from.
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search'); // Read ?search=... from URL
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Search Results when query changes
    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery) {
                setLoading(true);
                try {
                    const data = await searchProducts(searchQuery);
                    setSearchResults(data);
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchResults();
    }, [searchQuery]);

    // VIEW 1: SEARCH RESULTS MODE
    if (searchQuery) {
        return (
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-display font-bold mb-8">
                    Search Results for "{searchQuery}"
                </h2>

                {loading ? (
                    <p>Searching...</p>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group">
                                <div className="bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square mb-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                </div>
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="font-bold text-xl">${product.price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No products found for "{searchQuery}".</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="mt-4 text-black underline font-bold"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // VIEW 2: NORMAL HOMEPAGE MODE
    return (
        <main>
            <Hero />
            <BrandBar />
            <NewArrivals />
            <TopSelling />
            <CategoryGrid />
            <Testimonials />
        </main>
    );
};

export default Home;