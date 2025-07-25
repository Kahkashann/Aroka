// src/components/ProductImageHover.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductImageHover = ({ src1, src2, alt, className = "" }) => {
	const [isHovered, setIsHovered] = useState(false);

	const hasHoverImage = !!src2;

	return (
		<div
			className={`relative overflow-hidden ${className}`}
			onMouseEnter={() => hasHoverImage && setIsHovered(true)}
			onMouseLeave={() => hasHoverImage && setIsHovered(false)}
		>
			<AnimatePresence initial={false}>
				{!isHovered && (
					<motion.img
						key="img1"
						src={src1}
						alt={alt + " - default view"}
						initial={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.2 } }}
						className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				)}
				{isHovered && hasHoverImage && (
					<motion.img
						key="img2"
						src={src2}
						alt={alt + " - hover view"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.3 } }}
						className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				)}
			</AnimatePresence>
			<img src={src1} alt="" className="invisible w-full h-full object-cover" aria-hidden="true" />
		</div>
	);
};

export default ProductImageHover;