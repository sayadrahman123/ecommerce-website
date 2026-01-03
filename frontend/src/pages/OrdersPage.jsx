import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { Package } from 'lucide-react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-20">Loading Orders...</div>;

    return (
        <div className="container mx-auto px-6 md:px-12 py-8">
            <h1 className="text-3xl font-display font-bold uppercase mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">You haven't placed any orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-100 pb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                    <p className="font-bold text-lg text-green-600">{order.status}</p>
                                    <p className="font-bold">Total: ${order.totalAmount}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{item.productName}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;