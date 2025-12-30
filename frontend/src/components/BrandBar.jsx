import React from 'react';

const BrandBar = () => {
    return (
        <div className="bg-black py-10">
            <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-center gap-8">

                {/* We are using text to mimic logos for now.
            Later, you can replace these <h2 /> with <img src="/zara-logo.svg" />
        */}

                <h2 className="text-white text-3xl md:text-4xl font-display font-bold uppercase tracking-widest">
                    VERSACE
                </h2>

                <h2 className="text-white text-3xl md:text-4xl font-serif font-bold tracking-tight italic">
                    ZARA
                </h2>

                <h2 className="text-white text-3xl md:text-4xl font-display font-bold tracking-wider">
                    GUCCI
                </h2>

                <h2 className="text-white text-3xl md:text-4xl font-display font-bold tracking-wider">
                    PRADA
                </h2>

                <h2 className="text-white text-2xl md:text-3xl font-sans font-normal tracking-tight">
                    Calvin Klein
                </h2>

            </div>
        </div>
    );
};

export default BrandBar;