// src/components/MobileMenu.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import {
    womenCategories,
    menCategories,
    collectionsCategories,
    mobileMainMenuItems,
} from '../data/menuData';

const MotionLink = motion(Link);

const MobileMenu = ({ isLeftSidebarOpen, toggleLeftSidebar }) => {
    const [currentView, setCurrentView] = useState('main');
    const [activeMain, setActiveMain] = useState(null);
    const [activeSub, setActiveSub] = useState(null);

    const sidebarVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: 'easeIn' },
        },
    };

    const underlineVariants = {
        rest: { width: 0, transition: { duration: 0.2, ease: 'easeOut' } },
        hover: { width: '100%', transition: { duration: 0.2, ease: 'easeOut' } },
    };

    const subMenuMap = {
        Women: womenCategories,
        Men: menCategories,
        Collections: collectionsCategories,
    };

    const handleMainClick = (key) => {
        const item = mobileMainMenuItems[key];
        if (item?.subItems?.length) {
            setActiveMain(key);
            setCurrentView('sub');
        } else if (item?.path) {
            toggleLeftSidebar();
        }
    };

    const handleSubClick = (name, to) => {
        if (subMenuMap[name]) {
            setActiveSub(name);
            setCurrentView('final');
        } else if (to) {
            toggleLeftSidebar();
        }
    };

    const handleBack = () => {
        if (currentView === 'final') {
            setCurrentView('sub');
            setActiveSub(null);
        } else if (currentView === 'sub') {
            setCurrentView('main');
            setActiveMain(null);
        }
    };

    useEffect(() => {
        if (isLeftSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLeftSidebarOpen]);

    return (
        <AnimatePresence>
            {isLeftSidebarOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleLeftSidebar}
                    />

                    <motion.div
                        className="fixed inset-0 top-16 bg-white text-black z-50 flex flex-col"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >

                        <div className="flex-grow overflow-y-auto px-6 py-3">
                            {currentView !== 'main' && (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 hover:text-black"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>
                            )}

                            {currentView === 'main' && (
                                <ul className="space-y-0.5">
                                    {Object.keys(mobileMainMenuItems).map((key) => {
                                        const item = mobileMainMenuItems[key];
                                        const hasSub = item.subItems && item.subItems.length > 0;

                                        return (
                                            <li key={key}>
                                                {hasSub ? (
                                                    <motion.button
                                                        onClick={() => handleMainClick(key)}
                                                        className="w-full text-left py-1 text-sm text-gray-800 flex justify-between items-center hover:text-gray-900"
                                                        initial="rest"
                                                        whileHover="hover"
                                                    >
                                                        <span className="relative inline-block pb-[2px]">
                                                            {key}
                                                            <motion.span
                                                                className="absolute bottom-0 left-0 h-[1px] bg-gray-800"
                                                                variants={underlineVariants}
                                                            />
                                                        </span>
                                                        <ChevronRight size={16} className="text-gray-500" />
                                                    </motion.button>
                                                ) : (
                                                    <MotionLink
                                                        to={item.path}
                                                        onClick={toggleLeftSidebar}
                                                        className="block py-1 text-sm text-gray-800 hover:text-gray-900 flex items-center"
                                                        initial="rest"
                                                        whileHover="hover"
                                                    >
                                                        <span className="relative inline-block pb-[2px]">
                                                            {key}
                                                            <motion.span
                                                                className="absolute bottom-0 left-0 h-[1px] bg-gray-800"
                                                                variants={underlineVariants}
                                                            />
                                                        </span>
                                                    </MotionLink>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {currentView === 'sub' && activeMain && (
                                <ul className="space-y-0.5">
                                    {mobileMainMenuItems[activeMain].subItems.map((sub, idx) => {
                                        const name = typeof sub === 'string' ? sub : sub.name;
                                        const to = sub.to;
                                        const hasNested = subMenuMap[name];

                                        return (
                                            <li key={idx}>
                                                {hasNested ? (
                                                    <motion.button
                                                        onClick={() => handleSubClick(name, to)}
                                                        className="w-full text-left py-1 text-sm text-gray-800 flex justify-between items-center hover:text-gray-900"
                                                        initial="rest"
                                                        whileHover="hover"
                                                    >
                                                        <span className="relative inline-block pb-[2px]">
                                                            {name}
                                                            <motion.span
                                                                className="absolute bottom-0 left-0 h-[1px] bg-gray-800"
                                                                variants={underlineVariants}
                                                            />
                                                        </span>
                                                        <ChevronRight size={16} className="text-gray-500" />
                                                    </motion.button>
                                                ) : (
                                                    <MotionLink
                                                        to={to}
                                                        onClick={toggleLeftSidebar}
                                                        className="block py-1 text-sm text-gray-800 hover:text-gray-900 flex items-center"
                                                        initial="rest"
                                                        whileHover="hover"
                                                    >
                                                        <span className="relative inline-block pb-[2px]">
                                                            {name}
                                                            <motion.span
                                                                className="absolute bottom-0 left-0 h-[1px] bg-gray-800"
                                                                variants={underlineVariants}
                                                            />
                                                        </span>
                                                    </MotionLink>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            {currentView === 'final' &&
                                activeSub &&
                                subMenuMap[activeSub]?.length > 0 && (
                                    <ul className="space-y-0.5">
                                        {subMenuMap[activeSub].map((item, idx) => (
                                            <li key={idx}>
                                                <MotionLink
                                                    to={item.to}
                                                    onClick={toggleLeftSidebar}
                                                    className="block py-1 text-sm text-gray-800 hover:text-gray-900 flex items-center"
                                                    initial="rest"
                                                    whileHover="hover"
                                                >
                                                    <span className="relative inline-block pb-[2px]">
                                                        {item.name}
                                                        <motion.span
                                                            className="absolute bottom-0 left-0 h-[1px] bg-gray-800"
                                                            variants={underlineVariants}
                                                        />
                                                    </span>
                                                </MotionLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>

                        {currentView === 'main' && (
                            <div className="flex justify-center w-full mb-6 gap-4">
                                {[
                                    { to: '/new-in', img: '/new-in.png', label: 'New In' },
                                    { to: '/best-sellers', img: '/celebrity-closet.jpeg', label: 'Best Sellers' },
                                ].map(({ to, img, label }) => (
                                    <motion.div
                                        key={label}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Link to={to} onClick={toggleLeftSidebar} className="flex flex-col items-center p-3">
                                            <div className="w-full h-[18rem] sm:h-[21rem] overflow-hidden shadow-md mb-3">
                                                <img src={img} alt={label} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-sm font-light text-gray-800 text-center">{label}</p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
