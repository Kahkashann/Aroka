import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { products as allProducts } from '../data/productData';
import ProductCard from '../components/ProductCard';
import InteractiveImageSection from '../components/InteractiveImageSection';
import AboutUsStorySection from '../components/AboutusStorySection';
import FeaturedSection from '../components/FeaturedSection';

const HomePage = () => {
	const newArrivals = allProducts.slice(0, 8);
	const bestsellers = allProducts.filter(product => product.isBestseller);
	console.log(bestsellers)

	const [isPearlfallHovered, setIsPearlfallHovered] = useState(false);
	const pearlfallMainImg = "/pearlfall-set.png";
	const pearlfallHoverImg = "allStyles/pearlfall-asymmetric-denim-top-main.png";

	const { scrollYProgress } = useScroll();
	
	// Parallax effects for different sections
	const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

	useEffect(() => {
		const smoothScroll = () => {
			document.documentElement.style.scrollBehavior = 'smooth';
		};
		smoothScroll();
		
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	const myProductHotspots = [
		{
			id: 1,
			top: '64%',
			left: '80%',
			product: {
				name: 'Desire Halter Dress in Red',
				price: '₹ 22,000',
				link: 'desire-halter-dress-in-red',
				thumb: 'allStyles/desire-halter-dress-in-red-hover.png'
			}
		},
		{
			id: 2,
			top: '20%',
			left: '18%',
			product: {
				name: 'Pearlfall Asymmetric Denim Top',
				price: '₹ 19,300',
				link: 'pearlfall-asymmetric-denim-top',
				thumb: 'allStyles/pearlfall-asymmetric-denim-top-hover.png'
			}
		}
	];

	const fadeInUp = {
		hidden: { opacity: 0, y: 60 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" }
		}
	};

	const fadeInLeft = {
		hidden: { opacity: 0, x: -60 },
		visible: { 
			opacity: 1, 
			x: 0,
			transition: { duration: 0.8, ease: "easeOut" }
		}
	};

	const fadeInRight = {
		hidden: { opacity: 0, x: 60 },
		visible: { 
			opacity: 1, 
			x: 0,
			transition: { duration: 0.8, ease: "easeOut" }
		}
	};

	const staggerContainer = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	return (
		<div>
			{/* Hero Banner with Parallax */}
			<motion.div
				initial={{ opacity: 0, scale: 1.05 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.5, ease: [0.25, 0.25, 0.25, 0.75] }}
				style={{ y: heroY, opacity: heroOpacity }}
				className="relative overflow-hidden"
			>
				<Link to="/shop-all" className="hidden lg:block w-full h-full object-cover">
					<motion.img 
						src="/desktop-banner.png" 
						alt="Desktop Banner" 
						className="w-full h-full"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.6 }}
					/>
				</Link>

				<Link to="/shop-all" className="block lg:hidden w-full h-full object-cover">
					<motion.img 
						src="/mobile-banner.png" 
						alt="Mobile Banner" 
						className="w-full h-full"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.6 }}
					/>
				</Link>
			</motion.div>

			{/* Category Section */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3 }}
				variants={staggerContainer}
			>
				<div className="flex overflow-x-auto scrollbar-hidden pb-4 md:grid md:grid-cols-3">
					{/* Item 1 */}
					<motion.div 
						variants={fadeInUp}
						className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-auto relative group overflow-hidden"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
						>
							<img src="/allStyles/aura-gown-main.png" alt="Dresses" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 text-white">
								<motion.h2 
									className="text-2xl font-light mb-2"
									variants={fadeInUp}
								>
									Dresses
								</motion.h2>
								<motion.div
									variants={fadeInUp}
								>
									<Link to="/women/dresses" className="border-b border-white text-sm font-light w-fit hover:border-opacity-80 transition-all duration-300">
										Shop Now
									</Link>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>

					{/* Item 2 */}
					<motion.div 
						variants={fadeInUp}
						className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-auto relative group overflow-hidden"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
						>
							<img src="/allStyles/beyond-blue-set-hover.png" alt="Co-ords" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 text-white">
								<motion.h2 
									className="text-2xl font-light mb-2"
									variants={fadeInUp}
								>
									Co ords
								</motion.h2>
								<motion.div
									variants={fadeInUp}
								>
									<Link to="/women/co-ords" className="border-b border-white text-sm font-light w-fit hover:border-opacity-80 transition-all duration-300">
										Shop Now
									</Link>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>

					{/* Item 3 */}
					<motion.div 
						variants={fadeInUp}
						className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-auto relative group overflow-hidden"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
						>
							<img src="/allStyles/haze-slit-skirt-main.png" alt="Skirt" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6 text-white">
								<motion.h2 
									className="text-2xl font-light mb-2"
									variants={fadeInUp}
								>
									Skirts
								</motion.h2>
								<motion.div
									variants={fadeInUp}
								>
									<Link to="/women/skirts" className="border-b border-white text-sm font-light w-fit hover:border-opacity-80 transition-all duration-300">
										Shop Now
									</Link>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* NEW ARRIVAL SECTION */}
			<motion.section 
				className="py-12 px-2"
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.2 }}
			>
				<motion.h2 
					className="text-3xl font-light text-center mb-8"
					variants={fadeInUp}
				>
					NEW ARRIVALS
				</motion.h2>

				<motion.div 
					className="flex overflow-x-auto scrollbar-hidden pb-4 space-x-4"
					variants={staggerContainer}
				>
					{newArrivals.map((product, index) => (
						<motion.div 
							key={product.id} 
							className="flex-shrink-0 w-64 md:w-72"
							variants={fadeInUp}
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<Link to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}>
								<ProductCard product={product} />
							</Link>
						</motion.div>
					))}
				</motion.div>

				<motion.div 
					className="text-center mt-2"
					variants={fadeInUp}
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to="/new-arrivals"
							className="inline-block px-8 py-3 border border-black text-black font-light text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
						>
							VIEW ALL
						</Link>
					</motion.div>
				</motion.div>
			</motion.section>

			{/* BESTSELLER SECTION */}
			<motion.section 
				className="py-12 px-2"
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.2 }}
			>
				<motion.h2 
					className="text-3xl font-light text-center mb-8"
					variants={fadeInUp}
				>
					BESTSELLER
				</motion.h2>

				<motion.div 
					className="flex overflow-x-auto scrollbar-hidden pb-4 space-x-4"
					variants={staggerContainer}
				>
					{bestsellers.map((product, index) => (
						<motion.div 
							key={product.id} 
							className="flex-shrink-0 w-64 md:w-72"
							variants={fadeInUp}
							whileHover={{ y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<Link to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}>
								<ProductCard product={product} />
							</Link>
						</motion.div>
					))}
				</motion.div>

				<motion.div 
					className="text-center mt-2"
					variants={fadeInUp}
				>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to="/best-sellers" 
							className="inline-block px-8 py-3 border border-black text-black font-light text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
						>
							VIEW ALL
						</Link>
					</motion.div>
				</motion.div>
			</motion.section>

			{/* Video and Image Section */}
			<motion.section 
				className='pb-10'
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3 }}
			>
				<div className="flex flex-col lg:flex-row gap-8 items-center">
					{/* Video on Left */}
					<motion.div 
						className="w-full lg:w-1/2"
						variants={fadeInLeft}
					>
						<motion.video
							src="/video/homepage-1.mp4"
							autoPlay
							loop
							muted
							playsInline
							className="w-full h-full object-cover"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.4 }}
						>
						</motion.video>
					</motion.div>

					{/* Right Section */}
					<motion.div 
						className="w-full lg:w-1/2 flex items-center justify-center"
						variants={fadeInRight}
					>
						<div className='flex flex-row md:p-15 p-10 md:gap-4 gap-2 w-full justify-center'>
							{/* Pearlfall Set */}
							<motion.div
								onMouseEnter={() => setIsPearlfallHovered(true)}
								onMouseLeave={() => setIsPearlfallHovered(false)}
								className="w-[48%] min-w-[150px] flex flex-col items-center relative"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								<Link to="/product/pearlfall-asymmetric-denim-top" className="block w-full">
									<motion.img
										src={isPearlfallHovered ? pearlfallHoverImg : pearlfallMainImg}
										alt="Pearlfall Set"
										className="w-full h-auto object-cover max-h-96"
										animate={{ 
											opacity: isPearlfallHovered ? [0.8, 1] : 1 
										}}
										transition={{ duration: 0.3 }}
									/>
								</Link>
								<motion.div 
									className='absolute -bottom-10 md:-bottom-12 left-1.5 text-sm font-extralight text-black'
									variants={fadeInUp}
								>
									<h3>Pearlfall Set</h3>
									<p>₹ 20,880</p>
								</motion.div>
							</motion.div>

							<motion.div 
								className="w-[48%] min-w-[150px] flex justify-center"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								<img
									src="HandSmock.png"
									alt="Artisanally hand-smocked"
									className="w-full h-auto object-cover max-h-96"
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Animated wrapper for other sections */}
			<motion.div
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3, margin: "0px" }}
				variants={{
					hidden: { opacity: 0 },
					visible: { 
						opacity: 1,
						transition: { duration: 0.8 }
					}
				}}
			>
				<InteractiveImageSection
					hotspotData={myProductHotspots}
				/>
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3, margin: "0px" }}
				variants={{
					hidden: { opacity: 0, y: 50 },
					visible: { 
						opacity: 1, 
						y: 0,
						transition: { duration: 0.8 }
					}
				}}
			>
				<AboutUsStorySection />
			</motion.div>

			<motion.div
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3, margin: "0px" }}
				variants={{
					hidden: { opacity: 0, y: 50 },
					visible: { 
						opacity: 1, 
						y: 0,
						transition: { duration: 0.8 }
					}
				}}
			>
				<FeaturedSection/>
			</motion.div>

			{/* Final Banner Section */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				exit="hidden"
				viewport={{ once: false, amount: 0.3, margin: "0px" }}
				variants={{
					hidden: { opacity: 0, scale: 0.95 },
					visible: { 
						opacity: 1, 
						scale: 1,
						transition: { duration: 0.8 }
					}
				}}
			>
				<img className='w-full hidden lg:block' src="/desktop-4.png" alt="" />
				<img className='w-full block lg:hidden' src="/mob-4.jpg" alt="" />
			</motion.section>
		</div>
	);
}

export default HomePage;