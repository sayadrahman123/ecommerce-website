import React from 'react';

const Hero = () => {
    return (
        <section className="bg-[#F2F0F1] pt-8 md:pt-12 pb-12">
            {/* Updated padding to px-6 md:px-12 to match Navbar alignment */}
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* Left Content */}
                <div className="space-y-8 py-4">
                    <h1 className="text-5xl md:text-[64px] font-display font-bold leading-[1] tracking-tighter uppercase text-shop-black">
                        Find Clothes That Matches Your Style
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-lg leading-relaxed">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>

                    <button className="bg-black text-white px-16 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition shadow-lg w-full md:w-auto">
                        Shop Now
                    </button>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-8 md:gap-12 pt-8">
                        <div className="border-r border-gray-300 pr-6 md:pr-10">
                            <h3 className="text-3xl font-bold font-sans text-shop-black">200+</h3>
                            <p className="text-sm text-gray-500">International Brands</p>
                        </div>
                        <div className="border-r border-gray-300 pr-6 md:pr-10">
                            <h3 className="text-3xl font-bold font-sans text-shop-black">2,000+</h3>
                            <p className="text-sm text-gray-500">High-Quality Products</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold font-sans text-shop-black">30,000+</h3>
                            <p className="text-sm text-gray-500">Happy Customers</p>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative h-full min-h-[400px] md:min-h-[600px] flex items-end justify-center">
                    <div className="absolute top-1/3 right-5 text-5xl animate-bounce">✨</div>
                    <div className="absolute bottom-1/3 left-0 text-3xl animate-pulse">✨</div>

                    <img
                        src="https://placehold.co/600x600/png?text=Model+Image"
                        alt="Models"
                        className="object-cover max-h-[500px] md:max-h-[700px] w-full drop-shadow-xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;