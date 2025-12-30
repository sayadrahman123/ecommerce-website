import React from 'react';
import { Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-[#F0F0F0] mt-40 pt-20 pb-10">

            {/* Newsletter Section (Floating Top) */}
            <div className="absolute -top-24 left-0 w-full px-6 md:px-12">
                <div className="container mx-auto bg-black rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white max-w-lg uppercase leading-tight">
                        Stay upto date about our latest offers
                    </h2>
                    <div className="w-full md:w-auto flex flex-col gap-4">
                        <div className="bg-white rounded-full px-4 py-3 flex items-center gap-3 w-full md:w-[350px]">
                            <Mail className="text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="outline-none w-full text-sm"
                            />
                        </div>
                        <button className="bg-white text-black font-medium rounded-full px-4 py-3 w-full hover:bg-gray-100 transition">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 md:px-12 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-gray-300 pb-12">

                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1.5 space-y-6">
                        <h2 className="text-3xl font-display font-bold uppercase tracking-tighter">RAHMANI</h2>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-[250px]">
                            We have clothes that suits your style and which you’re proud to wear. From women to men.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Facebook, Instagram, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition group">
                                    <Icon size={16} className="text-black group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1">
                        <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Company</h3>
                        <ul className="space-y-4 text-gray-600 text-sm">
                            {['About', 'Features', 'Works', 'Career'].map((item) => (
                                <li key={item}><Link to="#" className="hover:text-black">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Help</h3>
                        <ul className="space-y-4 text-gray-600 text-sm">
                            {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                                <li key={item}><Link to="#" className="hover:text-black">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">FAQ</h3>
                        <ul className="space-y-4 text-gray-600 text-sm">
                            {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((item) => (
                                <li key={item}><Link to="#" className="hover:text-black">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="font-bold uppercase tracking-widest mb-6 text-sm">Resources</h3>
                        <ul className="space-y-4 text-gray-600 text-sm">
                            {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map((item) => (
                                <li key={item}><Link to="#" className="hover:text-black">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-4">
                    <p className="text-gray-500 text-sm">Rahmani © 2000-2026, All Rights Reserved</p>

                    {/* Payment Badges (Simulated with simple div boxes) */}
                    <div className="flex gap-3">
                        {['Visa', 'Mastercard', 'PayPal', 'ApplePay', 'G Pay'].map(pay => (
                            <div key={pay} className="bg-white border border-gray-200 rounded px-3 py-1 text-[10px] font-bold text-gray-600 shadow-sm">
                                {pay}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;