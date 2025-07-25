// src/components/LeftSidebar.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const MegaMenu = ({ isLeftSidebarOpen, toggleLeftSidebar, handleMouseLeaveNavbar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLeftSidebarOpen && (
        isMobile ? (
          <MobileMenu
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleLeftSidebar={toggleLeftSidebar}
          />
        ) : (
          <DesktopMenu
            toggleLeftSidebar={toggleLeftSidebar}
            handleMouseLeaveNavbar={handleMouseLeaveNavbar}
          />
        )
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;