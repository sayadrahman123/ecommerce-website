import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex gap-4 border-b border-gray-200 py-6 last:border-0">
            {/* Product Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F0EEED] rounded-[20px] overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg md:text-xl mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: <span className="text-gray-600">{item.size}</span></p>
                        <p className="text-sm text-gray-500">Color: <span className="text-gray-600">{item.color}</span></p>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">${item.price}</span>

                    {/* Quantity Selector */}
                    <div className="bg-[#F0F0F0] rounded-full flex items-center px-4 py-2 gap-4">
                        <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="hover:text-black text-gray-600"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-medium text-sm">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="hover:text-black text-gray-600"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;