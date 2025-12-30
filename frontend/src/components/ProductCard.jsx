import {Link} from "react-router-dom";
import {Star} from "lucide-react";


const ProductCard = ({id, title, rating, price, originalPrice, discount, image}) => {
    return (
        <Link to={`/product/${id}`} className="block group">
        {/*    Image Container   */}
            <div className="bg-[#FOEEED] rounded-[20px] aspect-square overflow-hidden mb-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
            </div>

        {/*    Product Info  */}
            <h3 className="font-bold text-lg md:text-xl mb-1">{title}</h3>

            {/*      Rating    */}
            <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star
                        key={i}
                        size={18}
                        fill={i < Math.floor(rating) ? "currentColor" : "none"}
                        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                        strokeWidth={0}
                        />
                    ))}
                    { /* Half star logic can be added here, for now using simple fill */}
                </div>
                <span className="text-sm text-gray-500">{rating}/5</span>
            </div>


        {/*    Price Section    */}
            <div className="flex items-center gap-3 text-xl md:text-2xl font-bold">
                <span>${price}</span>
                {originalPrice && (
                    <span className="text-gray-400 line-through decoration-2 text-xl">
                        ${originalPrice}
                    </span>
                )}
                {discount && (
                    <span className="text-red-500 bg-red-100 text-xs md:text-sm px-3 py-1 rounded-full font-medium">
                        -{discount}%
                    </span>
                )}
            </div>


        </Link>
    )
}

export default ProductCard;