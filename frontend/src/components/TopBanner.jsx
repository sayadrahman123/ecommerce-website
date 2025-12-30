import React, { useState } from 'react';
import { X } from 'lucide-react';

const TopBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-black text-white text-sm py-2 px-4 relative">
            <div className="container mx-auto flex justify-center items-center text-center">
                <p>
                    Sign up and get 20% off to your first order.{' '}
                    <a href="#" className="font-bold underline ml-1 hover:text-gray-300">
                        Sign Up Now
                    </a>
                </p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:block"
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default TopBanner;