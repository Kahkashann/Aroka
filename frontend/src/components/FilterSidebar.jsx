import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { products as allProducts } from '../data/productData';

const allSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const getGlobalMinMaxPrice = () => {
	if (!allProducts || allProducts.length === 0) return { min: 0, max: 1000 }; 
	const prices = allProducts.map(p => p.price);
	return {
		min: Math.min(...prices),
		max: Math.max(...prices)
	};
};

const { min: globalMinPrice, max: globalMaxPrice } = getGlobalMinMaxPrice();

const FilterSidebar = ({ onClose, currentFilters, onFilterChange }) => {
	const [localFilters, setLocalFilters] = useState({
		...currentFilters,
		minPrice: currentFilters.minPrice === '' ? globalMinPrice : currentFilters.minPrice,
		maxPrice: currentFilters.maxPrice === '' ? globalMaxPrice : currentFilters.maxPrice,
	});

	useEffect(() => {
		setLocalFilters({
			...currentFilters,
			minPrice: currentFilters.minPrice === '' ? globalMinPrice : currentFilters.minPrice,
			maxPrice: currentFilters.maxPrice === '' ? globalMaxPrice : currentFilters.maxPrice,
		});
	}, [currentFilters]);

	const handleAvailabilityChange = (type) => {
		setLocalFilters(prevFilters => ({
			...prevFilters,
			inStock: type === 'inStock' ? !prevFilters.inStock : prevFilters.inStock,
			outOfStock: type === 'outOfStock' ? !prevFilters.outOfStock : prevFilters.outOfStock,
		}));
	};

	const handlePriceChange = (e) => {
		const { name, value, type } = e.target;

		setLocalFilters(prevFilters => {
			let newMin = prevFilters.minPrice;
			let newMax = prevFilters.maxPrice;

			// Handle empty string for number inputs
			const parsedValue = value === '' ? '' : parseFloat(value);

			if (name === 'minPrice') {
				newMin = parsedValue;
			} else if (name === 'maxPrice') {
				newMax = parsedValue;
			}

			if (newMin !== '' && newMax !== '') {
				if (newMin > newMax) {
					if (name === 'minPrice') {
						newMax = newMin; 
					} else if (name === 'maxPrice') {
						newMin = newMax;
					}
				}
			}

			if (newMin !== '') newMin = Math.max(globalMinPrice, newMin);
			if (newMax !== '') newMax = Math.min(globalMaxPrice, newMax);


			return {
				...prevFilters,
				minPrice: newMin,
				maxPrice: newMax,
			};
		});
	};

	const handleSizeToggle = (size) => {
		setLocalFilters(prevFilters => {
			const newSelectedSizes = prevFilters.selectedSizes.includes(size)
				? prevFilters.selectedSizes.filter(s => s !== size)
				: [...prevFilters.selectedSizes, size];
			return { ...prevFilters, selectedSizes: newSelectedSizes };
		});
	};

	const handleApplyFilters = () => {
		const filtersToApply = {
			...localFilters,
			minPrice: localFilters.minPrice === '' ? '' : parseFloat(localFilters.minPrice),
			maxPrice: localFilters.maxPrice === '' ? '' : parseFloat(localFilters.maxPrice),
		};
		onFilterChange(filtersToApply);
		onClose();
	};

	const handleResetFilters = () => {
		const resetValues = {
			inStock: false,
			outOfStock: false,
			minPrice: globalMinPrice, 
			maxPrice: globalMaxPrice, 
			selectedSizes: [],
		};
		setLocalFilters(resetValues);
		onFilterChange({
			...resetValues,
			minPrice: '',
			maxPrice: '',
		});
	};

	return (
		<div
			className="w-[360px] h-full bg-white shadow-2xl px-5 py-7 overflow-y-auto z-50"
			onClick={(e) => e.stopPropagation()}
		>
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-thin uppercase tracking-wide text-gray-800">FILTER</h2>
				<button
					onClick={onClose}
					className="p-1 hover:bg-gray-100 transition-colors"
					aria-label="Close filters"
				>
					<X className="text-gray-600 hover:text-black" size={22} />
				</button>
			</div>

			{/* Availability */}
			<div className="mb-5 border-t border-gray-200 pt-5">
				<h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Availability</h3>
				<label className="flex items-center mb-2 text-sm text-gray-700 cursor-pointer">
					<input
						type="checkbox"
						className="mr-3 h-4 w-4 text-black focus:ring-black border-gray-300"
						checked={localFilters.inStock}
						onChange={() => handleAvailabilityChange('inStock')}
					/>
					In Stock
				</label>
				<label className="flex items-center text-sm text-gray-700 cursor-pointer">
					<input
						type="checkbox"
						className="mr-3 h-4 w-4 text-black focus:ring-black border-gray-300"
						checked={localFilters.outOfStock}
						onChange={() => handleAvailabilityChange('outOfStock')}
					/>
					Out of Stock
				</label>
			</div>

			{/* Price Range Slider */}
			<div className="mb-5 border-t border-gray-200 pt-5">
				<h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Price</h3>
				<div className="flex justify-between items-center text-sm mb-3 font-medium text-gray-800">
					<span>₹{localFilters.minPrice === '' ? globalMinPrice : localFilters.minPrice}</span>
					<span>₹{localFilters.maxPrice === '' ? globalMaxPrice : localFilters.maxPrice}</span>
				</div>

				{/* Slider Container */}
				<div className="relative h-2 mb-4">
					<div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded"></div>
					<div
						className="absolute top-0 h-1 bg-black rounded"
						style={{
							left: `${((localFilters.minPrice === '' ? globalMinPrice : localFilters.minPrice) / globalMaxPrice) * 100}%`,
							width: `${(((localFilters.maxPrice === '' ? globalMaxPrice : localFilters.maxPrice) - (localFilters.minPrice === '' ? globalMinPrice : localFilters.minPrice)) / globalMaxPrice) * 100}%`,
						}}
					></div>

					{/* Min Price Slider Thumb */}
					<input
						type="range"
						name="minPrice"
						min={globalMinPrice}
						max={globalMaxPrice}
						step="10" 
						value={localFilters.minPrice === '' ? globalMinPrice : localFilters.minPrice}
						onChange={handlePriceChange}
						className="absolute w-full h-2 top-0 left-0 appearance-none bg-transparent cursor-pointer
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow
                                   [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:shadow"
						style={{ zIndex: 10 }} // Ensure thumb is on top
					/>
					<input
						type="range"
						name="maxPrice"
						min={globalMinPrice}
						max={globalMaxPrice}
						step="10" 
						value={localFilters.maxPrice === '' ? globalMaxPrice : localFilters.maxPrice}
						onChange={handlePriceChange}
						className="absolute w-full h-2 top-0 left-0 appearance-none bg-transparent cursor-pointer
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow
                                   [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:shadow"
						style={{ zIndex: 10 }} 
					/>
				</div>

				<div className="flex items-center gap-2 mt-5">
					<input
						type="number"
						name="minPrice"
						placeholder="₹ Min"
						className="border border-gray-300 px-2.5 py-1.5 text-sm w-1/2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
						value={localFilters.minPrice === '' ? '' : localFilters.minPrice}
						onChange={handlePriceChange}
					/>
					<span className="text-gray-500">-</span>
					<input
						type="number"
						name="maxPrice"
						placeholder="₹ Max"
						className="border border-gray-300 px-2.5 py-1.5 text-sm w-1/2 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
						value={localFilters.maxPrice === '' ? '' : localFilters.maxPrice}
						onChange={handlePriceChange}
					/>
				</div>
			</div>

			{/* Size */}
			<div className="mb-7 border-t border-gray-200 pt-5">
				<h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Size</h3>
				<div className="flex flex-wrap gap-2">
					{allSizes.map((size) => (
						<button
							key={size}
							onClick={() => handleSizeToggle(size)}
							className={`border text-sm px-3.5 py-1.5 transition-colors text-gray-700
                                ${localFilters.selectedSizes.includes(size)
									? 'bg-black text-white border-black'
									: 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
								}
                            `}
						>
							{size}
						</button>
					))}
				</div>
			</div>

			{/* Sticky Buttons at the bottom */}
			<div className="sticky bottom-0 bg-white py-3 -mx-5 px-5 border-t border-gray-200 shadow-top">
				<div className="flex justify-between gap-2">
					<button
						onClick={handleResetFilters}
						className="flex-1 border border-black text-gray-700 px-4 py-2 text-sm font-medium uppercase hover:bg-black hover:text-white transition-all duration-300"
					>
						Reset
					</button>
					<button
						onClick={handleApplyFilters}
						className="flex-1 bg-black text-white border border-black px-4 py-2 text-sm font-medium uppercase hover:bg-white hover:text-black transition-all duration-300"
					> 
						Apply Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;