import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Check } from 'lucide-react';

const sortOptions = [
	{ value: '', label: 'Featured' },
	{ value: 'best-selling', label: 'Best Selling' },
	{ value: 'newest', label: 'Newest Arrivals' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'alpha-asc', label: 'Alphabetically, A-Z' },
	{ value: 'alpha-desc', label: 'Alphabetically, Z-A' },
];

const CustomSortDropdown = ({ sortBy, setSortBy }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const currentLabel = sortOptions.find(option => option.value === sortBy)?.label || 'Featured';

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleOptionClick = (value) => {
		setSortBy(value);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 text-sm text-gray-700 px-3 py-1.5 hover:bg-gray-100 transition-colors w-auto min-w-[10rem]"
			>
				<span className="whitespace-nowrap">Sort By: {currentLabel}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ArrowDownUp size={16} />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-1 w-48 bg-white shadow-lg z-50 overflow-hidden"
					>
						{sortOptions.map((option) => (
							<div
								key={option.value}
								onClick={() => handleOptionClick(option.value)}
								className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors"
							>
								<span>{option.label}</span>
								{sortBy === option.value && (
									<Check size={16} className="text-black" />
								)}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CustomSortDropdown;