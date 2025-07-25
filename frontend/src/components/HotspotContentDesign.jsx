import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HotspotContentDesign = ({ product }) => {
	const [isVisible, setIsVisible] = useState(false);


	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 10); 

		return () => clearTimeout(timer); 
	}, []);

	if (!product) return null;

	return (
		<Link to={`/product/${product.link}`} className="block group">
			<div className={`bg-white py-4 px-3 shadow-md flex items-start space-x-2 w-max min-w-[300px] max-w-[400px]
transition-all duration-300 ease-out
    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
`}>
				{/* Product Thumbnail */}
				{product.thumb && (
					<img
						src={product.thumb}
						alt={product.name}
						className="w-16 h-24 object-cover flex-shrink-0"
					/>
				)}
				{/* Product Info */}
				<div className="flex flex-col justify-between py-1">
					<h4 className="text-sm font-light text-gray-800 text-nowrap leading-tight">
						{product.name}
					</h4>
					<p className="text-sm font-thin text-gray-900 mt-1">
						{product.price}
					</p>
					{/* Quick view link */}
					<span className="text-xs border-b cursor-pointer mt-1 w-fit">
						Quick view
					</span>
				</div>
			</div>
		</Link>
	);
};

export default HotspotContentDesign;