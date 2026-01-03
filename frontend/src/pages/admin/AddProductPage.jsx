import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {addProduct, addProductWithImage} from '../../services/api';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 't-shirts',
        imageUrl: '',
        colors: [],
        sizes: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle comma-separated lists for colors/sizes
    const handleArrayChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.split(',').map(item => item.trim()) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please select an image file");
            return;
        }

        try {
            const data = new FormData();

            // Create the JSON object for product details
            const productBlob = new Blob([JSON.stringify(formData)], {
                type: 'application/json'
            });

            data.append('product', productBlob); // Matches @RequestPart("product")
            data.append('image', imageFile);     // Matches @RequestPart("image")

            await addProductWithImage(data);
            alert("Product Added Successfully!");
            navigate('/admin');
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="container mx-auto px-6 py-10 max-w-2xl">
            <Link to="/admin" className="flex items-center text-gray-500 hover:text-black mb-6">
                <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input name="name" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition" placeholder="e.g. Vintage T-Shirt" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea name="description" onChange={handleChange} required rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition" placeholder="Product details..." />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                        <input type="number" name="price" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition" placeholder="0.00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select name="category" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition">
                            <option value="t-shirts">T-Shirts</option>
                            <option value="shirts">Shirts</option>
                            <option value="jeans">Jeans</option>
                            <option value="shorts">Shorts</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 2MB)</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div>
                    {imageFile && <p className="text-sm text-green-600 mt-2">Selected: {imageFile.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colors (comma separated)</label>
                    <input name="colors" onChange={handleArrayChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition" placeholder="Red, Blue, Green" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sizes (comma separated)</label>
                    <input name="sizes" onChange={handleArrayChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-black transition" placeholder="S, M, L, XL" />
                </div>

                <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition flex justify-center items-center gap-2">
                    <CheckCircle size={20} /> Publish Product
                </button>

            </form>
        </div>
    );
};

export default AddProductPage;