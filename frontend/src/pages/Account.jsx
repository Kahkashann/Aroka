import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../config/axios.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

import Orders from '../components/Orders';
import Addresses from '../components/Addresses';
import Wishlist from '../components/Wishlist';

const Account = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(() => {
        if (location.pathname === '/pages/wishlist') {
            return 'wishlist';
        } else if (location.pathname === '/account/addresses') {
            return 'addresses';
        }
        return 'orders';
    });

    useEffect(() => {
        if (location.pathname === '/pages/wishlist') {
            setActiveTab('wishlist');
        } else if (location.pathname === '/account/addresses') {
            setActiveTab('addresses');
        } else {
            setActiveTab('orders');
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logout');
            setIsAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const tabs = [
        { id: 'orders', label: 'Orders' },
        { id: 'addresses', label: 'Addresses' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'logout', label: 'Logout', action: handleLogout },
    ];

    const handleTabClick = (tabId) => {
        if (tabId === 'logout') {
            tabs.find(tab => tab.id === 'logout').action();
            return;
        }

        setActiveTab(tabId);

        let newPath = '/account';
        if (tabId === 'wishlist') {
            newPath = '/pages/wishlist';
        } else if (tabId === 'addresses') {
            newPath = '/account/addresses';
        } else if (tabId === 'orders') {
            newPath = '/account';
        }

        window.history.pushState({}, '', newPath);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return <Orders />;
            case 'addresses':
                return <Addresses />;
            case 'wishlist':
                return <Wishlist />;
            default:
                return (
                    <div className="text-center mt-8 text-gray-500 text-base">
                        Select a section to view your account info.
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen pt-16 sm:pt-20 md:pt-40 bg-white text-black font-sans">
            <div className="flex flex-col">
                {/* Mobile Navigation - Simple and clean */}
                <div className="w-full md:hidden px-4 sm:px-6 py-6">
                    <nav className="flex justify-center space-x-8 overflow-x-auto scrollbar-hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`flex-shrink-0 text-sm font-light tracking-wide whitespace-nowrap pb-1 transition-all duration-300 border-b-2
                                    ${activeTab === tab.id
                                        ? 'text-black font-normal border-black'
                                        : 'text-gray-500 hover:text-gray-800 border-transparent hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Desktop and Mobile Content Layout */}
                <div className="flex flex-col md:flex-row">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-full md:w-1/5 p-6 md:p-8">
                        <nav className="space-y-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`block text-left text-sm w-fit font-light tracking-wide transition-all duration-300 pb-1
                                        ${activeTab === tab.id
                                            ? 'text-black font-normal border-b-2 border-black'
                                            : 'text-gray-600 hover:text-black hover:border-b hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className='w-full px-4 sm:px-6 md:px-16 pb-8'>
                        <h2 className="text-xl sm:text-2xl font-extralight mb-6 mt-2">
                            {activeTab === 'orders' && 'Order History'}
                            {activeTab === 'addresses' && 'Your Addresses'}
                            {activeTab === 'wishlist' && 'Wishlist'}
                        </h2>
                        
                        <div className="w-full">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Account;