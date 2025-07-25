// src/routes/MainRoutes.js
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Account from '../pages/Account';
import Signup from '../pages/Signup';
import ProductListingPage from '../pages/ProductListingPage';
import PageNotFound from '../pages/PageNotFound';

import { useAuth } from '../context/AuthContext';
import About from '../pages/About';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import LookBooksPage from '../pages/LookBooksPage';

const MainRoutes = ({ onAddToCartSuccess }) => {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />

			<Route path="/shop-all" element={<ProductListingPage />} />
			<Route path="/lookbooks" element={<LookBooksPage />} />

			<Route path="/:category" element={<ProductListingPage />} />

			<Route path="/:category/:subcategory" element={<ProductListingPage />} />

			<Route path="/collections/:collectionName" element={<ProductListingPage />} />

			<Route path="/product/:productSlug" element={<ProductDetailsPage onAddToCartSuccess={onAddToCartSuccess} />} />

			<Route path="/best-sellers" element={<ProductListingPage />} />
			<Route path="/new-arrivals" element={<ProductListingPage />} />
			<Route path="/sale" element={<ProductListingPage />} />
			
			<Route path="/pages/wishlist" element={isAuthenticated ? <Account /> : <Navigate to="/account/login" replace />} />
			<Route path="/account/addresses" element={isAuthenticated ? <Account /> : <Navigate to="/account/login" replace />} />

			<Route path="/about-us" element={<About />} />

			<Route
				path="/account"
				element={isAuthenticated ? <Account /> : <Navigate to="/account/login" replace />}
			/>

			<Route
				path="/account/login"
				element={isAuthenticated ? <Navigate to="/account" replace /> : <Login />}
			/>

			<Route path="/account/register" element={<Signup />} />

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default MainRoutes;