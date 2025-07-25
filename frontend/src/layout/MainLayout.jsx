// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import App from '../App'; 
import Cart from '../components/Cart'; 

const MainLayout = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const toggleCart = () => {
		setIsCartOpen(prev => !prev);
	};

	return (
		<>
			<App onCartClick={toggleCart} />
			<Cart isOpen={isCartOpen} onClose={toggleCart} />
		</>
	);
};

export default MainLayout;