import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedSection = () => {

	const mediaLogos = [
		{ name: 'Vogue India', src: '/vogue.png' },
		{ name: 'Bazaar', src: 'Bazaar.png' },
		{ name: 'Elle', src: 'elle.png' },
		{ name: 'Filmfare', src: 'filmfare.png' },
		{ name: 'Homegrown', src: 'home-grown.png' },
		{ name: 'The Lab Mag', src: 'the-lab-mag.png' },
	];

	// Animation variants
	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { 
				duration: 0.6, 
				ease: "easeOut" 
			}
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

	const logoVariant = {
		hidden: { 
			opacity: 0, 
			y: 20,
			scale: 0.9
		},
		visible: { 
			opacity: 1, 
			y: 0,
			scale: 1,
			transition: { 
				duration: 0.5, 
				ease: "easeOut" 
			}
		}
	};

	return (
		<motion.section 
			className="w-full py-6 md:py-16 bg-white"
			initial="hidden"
			whileInView="visible"
			exit="hidden"
			viewport={{ once: false, amount: 0.3 }}
		>
			<div className="container mx-auto px-2 mb-6 md:mb-12">
				<motion.h2 
					className="text-xl md:text-xl font-extralight text-gray-800 text-center mb-8"
					variants={fadeInUp}
				>
					Featured In
				</motion.h2>
				
				<motion.div 
					className="flex overflow-x-auto flex-nowrap justify-start md:justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 py-2 scrollbar-hidden"
					variants={staggerContainer}
				>
					{mediaLogos.map((logo, index) => (
						<motion.img
							key={index}
							src={logo.src}
							alt={logo.name}
							className="h-8 md:h-10 object-contain max-w-[120px] flex-shrink-0"
							variants={logoVariant}
							whileHover={{ 
								scale: 1.1,
								transition: { duration: 0.2 }
							}}
						/>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
};

export default FeaturedSection;