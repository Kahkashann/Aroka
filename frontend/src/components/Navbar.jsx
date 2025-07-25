import { Heart, Search, ShoppingCart, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';

const Navbar = ({ onCartClick }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isProductDetailsPage = location.pathname.startsWith('/product/') && location.pathname.split('/').length > 2;
    const isCondensedPage = ['/account', '/pages/wishlist'].includes(location.pathname);
    const isAboutUsPage = location.pathname === '/about-us';

    const { getTotalItems } = useCart();

    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [scrolled, setScrolled] = useState(0);
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsNavbarVisible(currentScrollY < prevScrollY.current || currentScrollY < 10);
            setScrolled(currentScrollY);
            prevScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLeftSidebar = () => setIsLeftSidebarOpen(prev => !prev);
    const toggleSearchBar = () => setIsSearchBarOpen(prev => !prev);

    const handleMenuOpen = () => {
        if (!isLeftSidebarOpen) setIsLeftSidebarOpen(true);
        if (isSearchBarOpen) setIsSearchBarOpen(false);
    };

    const handleMouseLeaveNavbar = () => {
        if (!isMobile) setIsLeftSidebarOpen(false);
    };

    const mainMenuItems = ['Shop', 'BestSellers', 'New Arrival', 'About', 'Sale'];

    const getNavbarStyles = () => {
        const shouldHaveTransparentBackground =
            (isHomePage || isProductDetailsPage || isAboutUsPage) && 
            scrolled < 10 &&
            !isSearchBarOpen &&
            !(isMobile && isLeftSidebarOpen);

        let backgroundColor = "bg-white"; 
        let textColor = "text-black";    
        let logoSrc = "/logo-black.avif";
        let logoHeight = "h-10"; 

        if (shouldHaveTransparentBackground) {
            backgroundColor = ""; 

            if (isHomePage || isAboutUsPage) { 
                textColor = "text-white";
                logoSrc = "/logo-white.avif";
                logoHeight = "h-8";
            } else if (isProductDetailsPage) {
                textColor = "text-black";
                logoSrc = "/logo-black.avif";
                logoHeight = "h-10";
            }
        }

        if (isMobile && isLeftSidebarOpen || isSearchBarOpen) {
            backgroundColor = "bg-white";
            textColor = "text-black";
            logoSrc = "/logo-black.avif"; 
            logoHeight = "h-10";
        }

        return {
            textColor: textColor,
            hoverTextColor: (shouldHaveTransparentBackground && (isHomePage || isAboutUsPage)) ? "hover:text-gray-300" : "hover:text-gray-600", // Added isAboutUsPage
            underlineColor: (shouldHaveTransparentBackground && (isHomePage || isAboutUsPage)) ? "bg-white" : "bg-black", // Added isAboutUsPage
            backgroundColor: backgroundColor,
            logoSrc: logoSrc,
            logoHeight: logoHeight
        };
    };

    const styles = getNavbarStyles();

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        hover: {
            scale: 1.1,
            transition: { type: "spring", stiffness: 300, damping: 10 }
        }
    };

    const menuItemTextVariants = {
        hover: {
            scale: 1.03,
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    const shouldShowMenuButton = isMobile || isCondensedPage;

    return (
        <>
            <motion.div
                className={`w-full ${styles.textColor} ${styles.backgroundColor} pt-6 pb-2 px-8 flex md:items-start items-center justify-between fixed top-0 left-0 z-30 transition-colors duration-300`}
                initial={{ y: '0%' }}
                animate={{ y: isNavbarVisible ? '0%' : '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <div className='text-sm font-light flex flex-col gap-1.5'>
                    {shouldShowMenuButton ? (
                        <div
                            onClick={toggleLeftSidebar}
                            className="cursor-pointer relative group"
                        >
                            <h4 className={`relative text-sm font-light ${styles.textColor} transition-colors duration-200 leading-tight`}>
                                <span className="relative inline-block pb-0.5">
                                    {isLeftSidebarOpen ? "Close" : "Menu"}
                                    <span
                                        className={`absolute bottom-0 left-0 h-[1px] ${styles.underlineColor} ${isLeftSidebarOpen ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-300 ease-out`}
                                    />
                                </span>
                            </h4>
                        </div>
                    ) : (
                        // Desktop Main Menu Items
                        <>
                            {mainMenuItems.map(item => (
                                <motion.h4
                                    key={item}
                                    onMouseEnter={handleMenuOpen}
                                    className={`cursor-pointer relative group ${styles.textColor} transition-colors duration-200 leading-tight`}
                                    whileHover="hover"
                                >
                                    <motion.span variants={menuItemTextVariants} className="relative inline-block pb-0.5">
                                        {/* Ensure 'About' links to '/about-us' */}
                                        <Link to={item === 'About' ? '/about-us' : `/${item.toLowerCase().replace(' ', '-')}`}>
                                            {item}
                                        </Link>
                                    </motion.span>
                                </motion.h4>
                            ))}
                        </>
                    )}
                </div>

                {/* Center Section: Brand Logo */}
                <div>
                    <Link to="/">
                        <img className={`${styles.logoHeight} -mt-1 cursor-pointer transition-opacity duration-300`} src={styles.logoSrc} alt="Brand Logo" />
                    </Link>
                </div>

                {/* Right Section: Icons (Search, User, Wishlist, Cart) */}
                <div className={`flex items-start gap-3 ${styles.textColor}`}>
                    <motion.div variants={iconVariants} whileHover="hover">
                        <Search
                            data-search-icon
                            className={`cursor-pointer ${styles.hoverTextColor} transition-colors duration-200`}
                            size={20}
                            strokeWidth={1.2}
                            onClick={toggleSearchBar}
                        />
                    </motion.div>

                    {!isMobile && (
                        <>
                            <motion.div variants={iconVariants} whileHover="hover">
                                <Link to="/account">
                                    <UserRound className={`cursor-pointer ${styles.hoverTextColor} transition-colors duration-200`} size={20} strokeWidth={1.2} />
                                </Link>
                            </motion.div>
                            <motion.div variants={iconVariants} whileHover="hover">
                                <Link to="/pages/wishlist">
                                    <Heart className={`cursor-pointer ${styles.hoverTextColor} transition-colors duration-200`} size={20} strokeWidth={1.2} />
                                </Link>
                            </motion.div>
                        </>
                    )}

                    <motion.div variants={iconVariants} whileHover="hover" className="relative">
                        <ShoppingCart
                            className={`cursor-pointer ${styles.hoverTextColor} transition-colors duration-200`}
                            size={20}
                            strokeWidth={1.2}
                            onClick={onCartClick}
                        />
                        {getTotalItems() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                {getTotalItems()}
                            </span>
                        )}
                    </motion.div>
                </div>

                {/* MegaMenu and SearchBar Components */}
                <MegaMenu
                    isLeftSidebarOpen={isLeftSidebarOpen}
                    toggleLeftSidebar={toggleLeftSidebar}
                    handleMouseLeaveNavbar={handleMouseLeaveNavbar}
                />
            </motion.div>

            <SearchBar isOpen={isSearchBarOpen} onClose={() => setIsSearchBarOpen(false)} />
        </>
    );
};

export default Navbar;