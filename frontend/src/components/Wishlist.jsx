import React from 'react'
import { useCart } from '../context/CartContext';
import {motion} from "framer-motion"
import ProductCard from './ProductCard';

const Wishlist = () => {

  const { wishlistItems, removeFromWishlist, addToWishlist, isInWishlist } = useCart();

  const handleRemoveFromWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation(); 
    removeFromWishlist(productId);
  };

  return (
    <div className='w-full'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product, index) => (
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
                removeFromWishlist={handleRemoveFromWishlist}
                isInWishlist={isInWishlist(product.id)} 
                />
            </motion.div>
          ))
        ) : (
          <p className="text-lg font-thin text-gray-600">
            Your wishlist is empty
          </p>
        )}
      </div>
    </div>
  )
}

export default Wishlist



