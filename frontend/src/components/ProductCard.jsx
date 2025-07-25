// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();
    const isFavorited = isInWishlist(product.id);

    const displayImageUrl =
        isHovered && product.hoverImageUrl ? product.hoverImageUrl : product.imageUrl;

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);

    const productSlug = product.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        if (isFavorited) {
            removeFromWishlist(product.id);
            console.log(`Product ${product.name} removed from wishlist`);
        } else {
            addToWishlist(product); 
            console.log(`Product ${product.name} added to wishlist`);
        }
    };

    return (
        <div
            className="w-full max-w-[350px] group relative flex flex-col cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${productSlug}`} className="block h-full">
                <div className="relative w-full overflow-hidden bg-gray-50">
                    <motion.img
                        src={displayImageUrl}
                        alt={product.name || 'Product image'}
                        initial={false}
                        animate={{ scale: isHovered ? 1.06 : 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />

                    <motion.button
                        onClick={handleFavoriteClick}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: isHovered ? 0.15 : 0 }}
                        className="absolute top-3 right-3 z-20 text-black " 
                        aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        {isFavorited ? (
                            <MdFavorite className="h-5 w-5 text-red-500" /> 
                        ) : (
                            <MdOutlineFavoriteBorder className="h-5 w-5" /> 
                        )}
                    </motion.button>
                </div>

                {/* Text Content */}
                <div className="p-4 pb-10 flex justify-between gap-8 items-start">
                    <motion.h3
                        className="md:text-[1.1vw] text-xs font:extralight md:font-light text-gray-900 leading-tight line-clamp-2 "
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        {product.name.toUpperCase()}
                    </motion.h3>

                    <motion.p
                        className="text-xs md:text-sm font-light md:font-semibold text-gray-800"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        {formatPrice(product.price)}
                    </motion.p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;