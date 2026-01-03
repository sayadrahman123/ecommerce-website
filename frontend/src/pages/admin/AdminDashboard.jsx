import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../services/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is Admin
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        // OLD (Incorrect): if (!user || user.role !== 'ADMIN')
        // NEW (Correct): Check if the roles array includes 'ADMIN'
        if (!user || !user.roles || !user.roles.includes('ADMIN')) {
            alert("Access Denied: Admins Only");
            navigate('/');
        }
    }, [navigate]);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this product?")) {
            try {
                await deleteProduct(id);
                // Refresh list after delete
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Package size={32} /> Admin Dashboard
                </h1>
                <Link to="/admin/add-product" className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition">
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600">ID</th>
                        <th className="p-4 font-semibold text-gray-600">Image</th>
                        <th className="p-4 font-semibold text-gray-600">Name</th>
                        <th className="p-4 font-semibold text-gray-600">Price</th>
                        <th className="p-4 font-semibold text-gray-600">Category</th>
                        <th className="p-4 font-semibold text-gray-600">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                            <td className="p-4 text-gray-500">#{product.id}</td>
                            <td className="p-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                            </td>
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4">${product.price}</td>
                            <td className="p-4 capitalize text-gray-500">{product.category}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                    title="Delete Product"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;