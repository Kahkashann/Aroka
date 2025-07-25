import { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const checkAuth = async () => {
		try {
			const response = await axiosInstance.get('/auth/me');
			if (response.status === 200 && response.data) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		} catch (err) {
			console.error("Authentication check failed:", err);
			setIsAuthenticated(false);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
