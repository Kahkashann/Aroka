// src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

import { products as allProducts } from '../data/productData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Minus, Plus } from 'lucide-react';

const getRandomProducts = (arr, count, exclude = []) => {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	const filtered = shuffled.filter(p => !exclude.includes(p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')));
	return filtered.slice(0, count);
};

const ProductDetailsPage = ({ onAddToCartSuccess }) => {
	const { productSlug } = useParams();
	const [product, setProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [activeInfoTab, setActiveInfoTab] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const imageScrollRef = useRef(null);
	const mainContentRef = useRef(null);

	const { addItemToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

	const isFavorited = product ? isInWishlist(product.id) : false;

	useEffect(() => {
		const found = allProducts.find(p =>
			p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === productSlug
		);

		if (found) {
			setProduct(found);
			if (found.sizes && found.sizes.length > 0) {
				setSelectedSize(found.sizes[0]);
			} else {
				setSelectedSize('');
			}
		} else {
			setProduct(null);
		}

		window.scrollTo(0, 0);
	}, [productSlug]);

	const gallery = product
		? [product.imageUrl, ...(Array.isArray(product.images) ? product.images : [])]
		: [];

	const uniqueGallery = Array.from(new Set(gallery));
	console.log(uniqueGallery)

	useEffect(() => {
		const handleWheel = (e) => {
			if (!imageScrollRef.current || !mainContentRef.current) return;

			const container = imageScrollRef.current;
			const mainContentDiv = mainContentRef.current;
			const isMobile = window.innerWidth < 768;

			const path = e.composedPath();
			const isInsideMainContentDiv = path.includes(mainContentDiv);

			if (!isInsideMainContentDiv) {
				return;
			}

			let canScrollContainer = false;

			if (isMobile) {
				const max = container.scrollWidth - container.clientWidth;
				const current = container.scrollLeft;

				if (e.deltaY > 0) {
					canScrollContainer = current < max;
				} else {
					canScrollContainer = current > 0;
				}

				if (canScrollContainer) {
					e.preventDefault();
					container.scrollLeft += e.deltaY;
				}
			} else {
				const max = container.scrollHeight - container.clientHeight;
				const current = container.scrollTop;

				if (e.deltaY > 0) {
					canScrollContainer = current < max;
				} else {
					canScrollContainer = current > 0;
				}

				if (canScrollContainer) {
					e.preventDefault();
					container.scrollTop += e.deltaY;
				}
			}
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		return () => window.removeEventListener('wheel', handleWheel);
	}, [uniqueGallery.length]);

	const formatPrice = (price) =>
		new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);

	const handleQuantity = (type) => {
		if (type === 'increment') {
			setQuantity(prev => prev + 1);
		} else if (type === 'decrement' && quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	const handleAddToCart = () => {
		if (!product) return;

		if (product.sizes && product.sizes.length > 0 && !selectedSize) {
			setErrorMessage('Please select a size before adding to cart.');
			return;
		}

		setErrorMessage('');
		addItemToCart(product, quantity, selectedSize);
		setQuantity(1);
		if (onAddToCartSuccess) onAddToCartSuccess();
	};

	const toggleFavorite = () => {
		if (!product) return;
		if (isFavorited) {
			removeFromWishlist(product.id);
		} else {
			addToWishlist(product);
		}
	};

	const getRelated = (slugs) => {
		if (!slugs || slugs.length === 0) return [];
		return allProducts.filter(p => slugs.includes(p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')));
	};

	const related = product ? getRelated(product.relatedProductSlugs) : [];
	const excludeSlugs = [productSlug, ...related.map(p => p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))];
	const suggested = getRandomProducts(allProducts, 4, excludeSlugs);

	const deliveryTimeline = [
		"Delivery in 6-8 Business days within India",
		"International orders will take 12-15 Business days for the delivery",
		"For selected items that are readily available, we ensure prompt shipment within 48 hours after confirmation with the team (+918591034648)",
		"Kindly note that delivery times may be subject to variations during unforeseen circumstances. We remain committed to keeping you informed and providing exceptional service."
	];

	if (!product) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center text-gray-600 pt-16">
				<p>product not found...</p>
			</div>
		);
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15, 
				delayChildren: 0.2 
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 10,
				stiffness: 100
			}
		}
	};

	return (
		<div className="w-full">
			<div ref={mainContentRef} className="flex flex-col md:flex-row md:gap-8">
				{/* IMAGE GALLERY */}
				<div className="md:w-1/2 md:h-screen">
					<div className="md:sticky md:top-0 h-full">
						{uniqueGallery.length > 0 && (
							<div ref={imageScrollRef} className="h-full md:overflow-y-scroll overflow-x-scroll md:overflow-x-hidden scrollbar-hidden">
								<div className="flex md:flex-col h-full md:h-auto">
									{uniqueGallery.map((url, i) => (
										<img key={i} src={url} alt={`image ${i + 1}`} className="w-screen md:w-full block flex-shrink-0" />
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* PRODUCT INFO */}
				<div className="md:w-1/2 flex flex-col px-5 py-5 md:px-20 md:py-40">
					<div className="flex justify-between items-start mb-2">
						<h1 className="text-2xl md:text-3xl font-thin text-gray-900 leading-tight pr-4">{product.name}</h1>
						<button
							onClick={toggleFavorite}
							className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
							aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
						>
							{isFavorited ? <MdFavorite className="h-6 w-6 text-red-500" /> : <MdOutlineFavoriteBorder className="h-6 w-6 text-gray-700" />}
						</button>
					</div>

					<p className="text-lg font-light text-gray-800 mb-4">{formatPrice(product.price)}</p>

					{/* SIZE SELECT */}
					{product.sizes && product.sizes.length > 0 && (
						<div className="mb-6">
							<h2 className="text-sm font-extralight text-black mb-3">Size</h2>
							<div className="flex flex-wrap gap-2">
								{product.sizes.map(size => (
									<button
										key={size}
										onClick={() => {
											setSelectedSize(size);
											setErrorMessage('');
										}}
										className={`px-4 py-2 text-sm font-extralight border transition-colors duration-200 ${selectedSize === size
											? 'bg-black text-white border-black'
											: 'border-gray-300 text-gray-700 hover:bg-gray-100'
											}`}
									>
										{size}
									</button>
								))}
							</div>
							{errorMessage && <span className="block mt-2 text-sm text-red-600">{errorMessage}</span>}
						</div>
					)}

					{/* QUANTITY */}
					<div className="mb-8">
						<h2 className="text-sm font-extralight text-black mb-3">Quantity</h2>
						<div className="flex items-center border border-gray-300 w-fit p-3">
							<button
								onClick={() => handleQuantity('decrement')}
								disabled={quantity <= 1}
								className="text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<Minus size={18} />
							</button>
							<span className="px-4 text-md font-thin text-gray-800">{quantity}</span>
							<button onClick={() => handleQuantity('increment')} className="text-gray-700">
								<Plus size={18} />
							</button>
						</div>
					</div>

					{/* ADD TO CART */}
					<motion.button
						onClick={handleAddToCart}
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						transition={{ duration: 0.1 }}
						className={`w-full py-2.5 text-lg font-light uppercase mt-auto transition-all duration-200 ${product.inStock
							? 'bg-white text-black hover:bg-black hover:text-white border border-black'
							: 'text-white bg-gray-400 cursor-not-allowed'
							}`}
						disabled={!product.inStock || (product.sizes?.length > 0 && !selectedSize)}
					>
						{product.inStock ? 'Add to Bag' : 'Out of Stock'}
					</motion.button>

					{/* INFO ACCORDION */}
					<div className="mt-8 border-t border-gray-200">
						{['DESCRIPTION', 'WASH & CARE', 'DELIVERY TIMELINES'].map(tab => (
							<div key={tab} className="border-b border-gray-200">
								<button
									onClick={() => setActiveInfoTab(activeInfoTab === tab ? '' : tab)}
									className="w-full py-4 text-left text-sm font-light text-black flex justify-between items-center"
								>
									{tab}
									<span>{activeInfoTab === tab ? '-' : '+'}</span>
								</button>
								<AnimatePresence>
									{activeInfoTab === tab && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className="overflow-hidden"
										>
											<div className="pb-4 font-light text-gray-700 text-sm">
												{tab === 'DESCRIPTION' && (
													Array.isArray(product.description) ? (
														<ul className="list-disc pl-5 space-y-1">
															{product.description.map((item, idx) => (
																<li key={idx}>{item}</li>
															))}
														</ul>
													) : product.description || 'Product description goes here.'
												)}
												{tab === 'WASH & CARE' && (product.careInfo || 'Please remember to dry clean our garments for the best care, and shield them from direct sunlight to prevent color variation. Initial washes of hand-dyed items may exhibit color bleeding, which stabilizes over time, creating graceful fades. Additionally, handwoven fabrics like muslin can have tiny black spots and thin thread lines that are natural hallmarks of their beauty and craftsmanship. Embrace these unique qualities that make each piece special.')}
												{tab === 'DELIVERY TIMELINES' && (
													<ul className="list-disc pl-5 space-y-1">
														{deliveryTimeline.map((item, idx) => (
															<li key={idx}>{item}</li>
														))}
													</ul>
												)}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* SUGGESTED PRODUCTS WITH ANIMATION */}
			{suggested.length > 0 && (
				<div className="mt-2 w-full px-4 pb-4">
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">You May Also Like</h2>

					{/* Apply motion.div to the container of the suggested products */}
					<motion.div
						className="overflow-x-auto md:overflow-x-hidden"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }} // THIS IS THE KEY PART
					>
						<div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[600px] md:min-w-0 px-1">
							{suggested.map(prod => (
								<Link
									to={`/product/${prod.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
									key={prod.id}
									className="min-w-[45%] md:min-w-0"
								>
									<motion.div variants={itemVariants}>
										<ProductCard
											product={prod}
											addToWishlist={addToWishlist}
											removeFromWishlist={removeFromWishlist}
											isInWishlist={isInWishlist(prod.id)}
										/>
									</motion.div>
								</Link>
							))}
						</div>
					</motion.div>
				</div>
			)}

		</div>
	);
};

export default ProductDetailsPage;