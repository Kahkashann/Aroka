// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // State for Cart Items
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCartItems = localStorage.getItem('cartItems');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return [];
        }
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const storedWishlistItems = localStorage.getItem('wishlistItems');
            return storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
        } catch (error) {
            console.error("Failed to parse wishlist items from localStorage", error);
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);


    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Cart Functions
    const addItemToCart = useCallback((product, quantity, selectedSize) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity,
                };
                return updatedItems;
            } else {
                return [
                    ...prevItems,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.imageUrl, 
                        quantity,
                        selectedSize,
                    },
                ];
            }
        });
    }, []);

    const updateItemQuantity = useCallback((id, selectedSize, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.selectedSize === selectedSize
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    }, []);

    const removeItemFromCart = useCallback((id, selectedSize) => {
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.id === id && item.selectedSize === selectedSize))
        );
    }, []);

    const addToWishlist = useCallback((product) => {
        setWishlistItems(prevItems => {
            const itemExists = prevItems.some(item => item.id === product.id);

            if (itemExists) {
                console.log(`${product.name} is already in the wishlist.`);
                return prevItems;
            } else {
                return [
                    ...prevItems,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl, 
                    },
                ];
            }
        });
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlistItems(prevItems =>
            prevItems.filter(item => item.id !== productId)
        );
    }, []);

    const getTotalItems = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getTotalPrice = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const isInWishlist = useCallback((productId) => {
        return wishlistItems.some(item => item.id === productId);
    }, [wishlistItems]);


    const value = {
        cartItems,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        getTotalItems,
        getTotalPrice,
        wishlistItems, 
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};