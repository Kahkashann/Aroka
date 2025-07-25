import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
    const {
        cartItems,
        updateItemQuantity,
        removeItemFromCart,
        getTotalItems,
        getTotalPrice
    } = useCart();

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }
    };

    const emptyCartVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const exploreContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
            }
        },
        exit: { opacity: 0 }
    };

    const exploreCardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: 20 }
    };

    const exploreCardTextVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
    };

    const buttonSlideUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } },
        exit: { opacity: 0, y: 20 }
    };

    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.3 } },
        exit: { opacity: 0, y: 50 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-white/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 h-full w-[90vw] sm:w-[500px] shadow-lg bg-white z-50 flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                    >
                        <motion.div
                            className="flex justify-between items-center px-8 py-2 border-b border-gray-100"
                            variants={headerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div>
                                <h2 className="text-2xl font-light tracking-wide text-black">Cart</h2>
                                <p className="text-sm text-gray-500 mt-1 font-light">
                                    {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <X size={20} className="text-gray-600" />
                            </motion.button>
                        </motion.div>

                        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6">
                            {cartItems.length > 0 ? (
                                <motion.div
                                    className="space-y-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, staggerChildren: 0.1 }}
                                >
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={`${item.id}-${item.selectedSize}`}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="flex gap-6 pb-8 border-b border-gray-50 last:border-b-0 last:pb-0"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-24 h-32 object-cover bg-gray-100"
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="text-lg font-light text-black mb-2 leading-tight">
                                                        {item.name}
                                                    </h4>
                                                    {item.selectedSize && (
                                                        <p className="text-gray-500 text-xs font-light">Size: {item.selectedSize}</p>
                                                    )}
                                                    <p className="text-gray-600 font-light mt-1">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center border border-gray-200">
                                                        <motion.button
                                                            onClick={() =>
                                                                updateItemQuantity(item.id, item.selectedSize, -1)
                                                            }
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Minus size={14} />
                                                        </motion.button>
                                                        <motion.span
                                                            className="w-12 h-10 flex items-center justify-center text-sm border-x border-gray-200"
                                                            key={item.quantity}
                                                            initial={{ scale: 1.2 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            {item.quantity}
                                                        </motion.span>
                                                        <motion.button
                                                            onClick={() =>
                                                                updateItemQuantity(item.id, item.selectedSize, 1)
                                                            }
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Plus size={14} />
                                                        </motion.button>
                                                    </div>

                                                    <motion.button
                                                        onClick={() =>
                                                            removeItemFromCart(item.id, item.selectedSize)
                                                        }
                                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex flex-col items-start justify-between h-full text-center"
                                    variants={emptyCartVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h3 className="text-xl font-extralight mb-6 text-black">Your cart is empty</h3>
                                    <div className='w-full'>
                                        <p className="font-light mb-6 text-sm uppercase text-start">
                                            Explore our collection
                                        </p>
                                        <motion.div
                                            className="flex gap-2 mb-10 w-full"
                                            variants={exploreContainerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <motion.div
                                                className="relative w-full overflow-hidden" 
                                                variants={exploreCardVariants}
                                            >
                                                <Link to="/new-arrivals" onClick={onClose}>
                                                    <motion.img 
                                                        src="/new-arrivals.png"
                                                        alt="New Arrivals"
                                                        className="w-full h-68 object-cover bg-gray-100"
                                                        whileHover={{ scale: 1.05 }} 
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    <div className="absolute left-2 bottom-2">
                                                        <motion.span
                                                            className="text-white font-light text-sm uppercase tracking-wide"
                                                            variants={exploreCardTextVariants}
                                                        >
                                                            New Arrivals
                                                        </motion.span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                            <motion.div
                                                className="relative w-full overflow-hidden" 
                                                variants={exploreCardVariants}
                                            >
                                                <Link to="/women/co-ords" onClick={onClose}>
                                                    <motion.img 
                                                        src="/co-ords.png"
                                                        alt="Co-ords"
                                                        className="w-full h-68 object-cover bg-gray-100"
                                                        whileHover={{ scale: 1.05 }} 
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    <div className="absolute left-2 bottom-2">
                                                        <motion.span
                                                            className="text-white font-light text-sm uppercase tracking-wide"
                                                            variants={exploreCardTextVariants}
                                                        >
                                                            Co-ords
                                                        </motion.span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                        <Link to="/shop-all" className='w-full'>
                                            <motion.button
                                                onClick={onClose}
                                                className="px-8 py-3 w-full bg-black border text-white font-light tracking-wide hover:bg-white hover:text-black border-black transition-colors"
                                                variants={buttonSlideUpVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Continue Shopping
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <motion.div
                                className="px-8 py-6 border-t border-gray-100 bg-white"
                                variants={footerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xl">
                                        <span className="font-light text-[1rem] text-black">Subtotal</span>
                                        <span className="font-light text-[1rem] text-black">{formatPrice(getTotalPrice())}</span>
                                    </div>

                                    <motion.button
                                        className="w-full bg-black text-white py-4 font-light tracking-wider text-sm uppercase hover:bg-gray-800 transition-colors mt-6"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;