import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../data/productData'; 
import ProductCard from './ProductCard'; 
import '../index.css'; 

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const searchBarRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchIcon = document.querySelector('[data-search-icon]');
      if (
        isOpen &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        (!searchIcon || !searchIcon.contains(event.target))
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const imageCards = [
    { src: '/new-arrivals.png', title: 'New Arrivals', to: '/new-arrivals' },
    { src: '/tops.jpg', title: 'Tops', to: '/women/tops' },
    { src: '/co-ords.png', title: 'Co-ords', to: '/women/co-ords' },
    { src: '/accessories.jpg', title: 'Accessories', to: '/women/accessories' },
  ];

  const handleXClick = () => {
    if (searchTerm) {
      setSearchTerm('');
      inputRef.current?.focus();
    } else {
      onClose();
    }
  };

  const filteredProducts = allProducts.filter(product => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (product.name && product.name.toLowerCase().includes(lowerCaseSearchTerm)) {
      return true;
    }

    if (product.category && product.category.toLowerCase().includes(lowerCaseSearchTerm)) {
      return true;
    }
    if (product.subcategory && product.subcategory.toLowerCase().includes(lowerCaseSearchTerm)) {
      return true;
    }
    if (product.collection && Array.isArray(product.collections)) {
      if (product.collection.some(collection => collection.toLowerCase().includes(lowerCaseSearchTerm))) {
        return true;
      }
    }
    return false; 
  });

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: -20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const searchInputVariants = {
    hidden: { 
      opacity: 0,
      y: -10 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95
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

  const productVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const noResultsVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={searchBarRef}
          className={`fixed ${isSmallScreen ? 'top-[60px] h-[calc(100vh-80px)]' : 'top-[150px] h-[calc(100vh-100px)]'} left-0 w-full z-50 bg-white overflow-y-auto scrollbar-hidden`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Search Input */}
          <motion.div 
            className="md:px-8 px-4 pt-10 md:pt-6 pb-6 bg-white sticky top-0 z-50"
            variants={searchInputVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center border-b border-black pb-2">
              <motion.input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow outline-none text-sm text-black placeholder-black bg-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              <motion.button
                onClick={handleXClick}
                className="ml-3 text-gray-700 hover:text-black transition cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Conditional Content */}
          <motion.div 
            className="px-4 pb-10 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {searchTerm === '' ? (
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  key="image-cards"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {imageCards.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={cardVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Link to={item.to} onClick={onClose}>
                        <div className="relative group overflow-hidden">
                          <motion.img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <motion.span 
                              className="text-white text-xl font-light"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                            >
                              {item.title}
                            </motion.span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                filteredProducts.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center"
                    key="search-results"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        className="w-full"
                        variants={productVariants}
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Link to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`} onClick={onClose}>
                          <ProductCard product={product} />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p 
                    className="text-center text-lg text-gray-600 py-10"
                    key="no-results"
                    variants={noResultsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    No products found matching "{searchTerm}".
                  </motion.p>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;