// src/pages/ProductListingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { products as allProducts, getProductsFiltered } from '../data/productData';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import CustomSortDropdown from '../components/CustomSortDropdown';
import Breadcrumbs from '../components/BreadCrumbs';
import { AnimatePresence, motion } from 'framer-motion';
import { ListFilter } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductListingPage = () => {
  const { category, subcategory, collectionName } = useParams();
  const location = useLocation();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [pageTitle, setPageTitle] = useState("Shop All Products");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const [filters, setFilters] = useState({
    inStock: false,
    outOfStock: false,
    minPrice: '',
    maxPrice: '',
    selectedSizes: [],
  });

  useEffect(() => {
    let baseProductsForRoute = [...allProducts];
    let currentTitle = "Shop All";

    if (location.pathname === "/shop-all") {
      baseProductsForRoute = [...allProducts];
      currentTitle = "Shop All";
    } else if (collectionName) {
      const formattedCollectionName = collectionName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      baseProductsForRoute = getProductsFiltered(null, null, formattedCollectionName);
      currentTitle = `${formattedCollectionName}`;
    } else if (category && subcategory) {
      baseProductsForRoute = getProductsFiltered(category, subcategory);
      currentTitle = `${capitalize(category)} - ${capitalize(subcategory)}`;
    } else if (category) {
      baseProductsForRoute = getProductsFiltered(category);
      currentTitle = `${capitalize(category)}`;
    } else if (location.pathname === "/best-sellers") {
      baseProductsForRoute = allProducts.filter(p => p.isBestseller);
      currentTitle = "Best Sellers";
    } else if (location.pathname === "/new-arrivals") {
      baseProductsForRoute = allProducts.filter(p => p.isNewArrival);
      currentTitle = "New Arrivals";
    } else if (location.pathname === "/sale") {
      baseProductsForRoute = allProducts.filter(p => p.sale);
      currentTitle = "Sale";
    }
    else if (location.pathname.startsWith("/lookbooks")) {
      currentTitle = "Lookbooks";
      if (collectionName) {
        currentTitle += ` - ${collectionName.split('-').map(word => capitalize(word)).join(' ')}`;
      }
    }


    let productsAfterGeneralFilters = [...baseProductsForRoute];

    if (filters.inStock) {
      productsAfterGeneralFilters = productsAfterGeneralFilters.filter(p => p.inStock);
    }
    if (filters.outOfStock) {
      productsAfterGeneralFilters = productsAfterGeneralFilters.filter(p => !p.inStock);
    }
    if (filters.minPrice !== '') {
      productsAfterGeneralFilters = productsAfterGeneralFilters.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice !== '') {
      productsAfterGeneralFilters = productsAfterGeneralFilters.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.selectedSizes.length > 0) {
      productsAfterGeneralFilters = productsAfterGeneralFilters.filter(p =>
        p.sizes && p.sizes.some(size => filters.selectedSizes.includes(size))
      );
    }

    let productsAfterSortFilters = [...productsAfterGeneralFilters];
    if (sortBy === 'best-selling') {
      productsAfterSortFilters = productsAfterSortFilters.filter(p => p.isBestseller);
    } else if (sortBy === 'newest') {
      productsAfterSortFilters = productsAfterSortFilters.filter(p => p.isNewArrival);
    }

    let finalSortedProducts = [...productsAfterSortFilters];

    if (sortBy === 'price-asc') {
      finalSortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      finalSortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha-asc') {
      finalSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alpha-desc') {
      finalSortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setDisplayedProducts(finalSortedProducts);
    setPageTitle(currentTitle);

  }, [category, subcategory, collectionName, location.pathname, sortBy, filters]);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto py-8 mt-12 md:mt-34">
        <Breadcrumbs />

        {/* Title, Filters, Sorting - Layout adjusted for mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center px-3 md:px-5 border-t border-gray-200 py-3">
          {/* Page Title*/}
          <h1 className="w-full text-center text-sm md:text-lg font-thin uppercase text-gray-800 md:flex-grow md:text-left mb-2 md:mb-0">
            {pageTitle}
          </h1>

          {/* Filter and Sort Bar */}
          <div className="w-full flex justify-between items-center md:w-auto md:space-x-3">
            <button
              onClick={() => setIsFilterSidebarOpen(true)}
              className="flex items-center space-x-1.5 text-xs md:text-sm text-gray-700 px-3 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <ListFilter size={16} />
              <span>Filter</span>
            </button>

            <CustomSortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>

        <AnimatePresence>
          {isFilterSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/40 z-30"
                onClick={() => setIsFilterSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Sidebar */}
              <motion.div
                className="fixed top-0 right-0 h-full w-[360px] bg-white z-40 shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <FilterSidebar
                  onClose={() => setIsFilterSidebarOpen(false)}
                  currentFilters={filters}
                  onFilterChange={setFilters}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* All Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center px-2">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="w-full"
              >
                <ProductCard
                  product={product}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg font-light text-gray-600 py-10">
              No products found in this section. Please check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;