import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
	womenCategories,
	menCategories,
	collectionsCategories,
	desktopMainMenuItems,
} from '../data/menuData';

const DesktopMenu = ({ toggleLeftSidebar, handleMouseLeaveNavbar }) => {
	const [activeMain, setActiveMain] = useState(null);
	const [activeSub, setActiveSub] = useState(null);
	const [activeFinal, setActiveFinal] = useState(null);

	const sidebarVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
		exit: { opacity: 0, x: -20, transition: { delay: 0.1, duration: 0.2 } },
	};

	const submenuVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
		exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
	};

	const textVariants = {
		inactive: {
			color: '#000',
			fontWeight: 300,
			scale: 1,
			textShadow: 'none',
			transition: { duration: 0.2 },
		},
		active: {
			color: '#000',
			fontWeight: 400,
			scale: 1.01,
			textShadow: '0 0 3px rgba(0,0,0,0.15)',
			transition: { duration: 0.2 },
		},
	};

	const lineVariants = {
		hidden: { width: 0, opacity: 0 },
		visible: {
			width: '16px',
			opacity: 1,
			transition: { duration: 0.2 },
		},
	};

	const subMenuItemsMap = {
		Women: womenCategories,
		Men: menCategories,
		Collections: collectionsCategories,
		'New Arrival': [],
	};

	const handleMainEnter = (key) => {
		setActiveMain(key);
		setActiveSub(null);
	};

	const handleSubEnter = (key) => setActiveSub(key);

	return (
		<>
			<motion.div
				className="fixed inset-0 bg-white/50 z-40"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={toggleLeftSidebar}
			/>

			<motion.div
				className="fixed top-0 left-0 h-full w-full max-w-xl bg-white text-black py-6 px-8 z-50 flex flex-col justify-between shadow-2xl"
				variants={sidebarVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				onMouseLeave={handleMouseLeaveNavbar}
			>
				<div className="flex gap-18 items-start">
					{/* Main Menu */}
					<div className="text-sm flex flex-col gap-1.5">
						{Object.entries(desktopMainMenuItems).map(([key, item]) => {
							const isActive = activeMain === key;
							const isLink = !!item.path; 

							const content = (
								<motion.span
									className="block"
									variants={textVariants}
									animate={isActive ? 'active' : 'inactive'}
								>
									{key}
								</motion.span>
							);

							return (
								<motion.h4
									key={key}
									className="cursor-pointer flex items-center text-nowrap"
									onMouseEnter={() => handleMainEnter(key)}
								>
									<motion.div
										className="h-[1px] w-4 bg-black mr-2"
										variants={lineVariants}
										initial="hidden"
										animate={isActive ? 'visible' : 'hidden'}
										style={{ transformOrigin: 'left' }}
									/>
									{isLink ? (
										<Link to={item.path} onClick={toggleLeftSidebar} className="no-underline text-inherit">
											{content}
										</Link>
									) : (
										content
									)}
								</motion.h4>
							);
						})}
					</div>

					{/* Sub Menu */}
					<div className="text-sm flex flex-col gap-1.5 min-w-[120px]">
						<AnimatePresence mode="wait">
							{activeMain && desktopMainMenuItems[activeMain]?.subItems?.length > 0 && (
								<motion.div
									key={`${activeMain}-submenu`}
									variants={submenuVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="flex flex-col gap-1.5"
								>
									{desktopMainMenuItems[activeMain].subItems.map((item, i) => {
										const name = typeof item === 'string' ? item : item.name;
										const to = item.to;

										const isActive = activeSub === name;
										const hasNext = to || subMenuItemsMap[name]?.length > 0;

										const content = (
											<motion.span
												className="block"
												variants={textVariants}
												animate={isActive ? 'active' : 'inactive'}
											>
												{name}
											</motion.span>
										);

										return (
											<motion.h4
												key={name}
												className="cursor-pointer flex items-center text-nowrap"
												onMouseEnter={() => handleSubEnter(name)}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1, transition: { delay: i * 0.05 } }}
												transition={{ type: 'spring', stiffness: 300, damping: 30 }}
											>
												<motion.div
													className="h-[1px] w-4 bg-gray-700 mr-2"
													variants={lineVariants}
													initial="hidden"
													animate={isActive ? 'visible' : 'hidden'}
													style={{ transformOrigin: 'left' }}
												/>
												{hasNext ? (
													<Link
														to={to || '#'}
														onClick={to ? toggleLeftSidebar : (e) => e.preventDefault()}
														className="no-underline text-inherit"
													>
														{content}
													</Link>
												) : (
													content
												)}
											</motion.h4>
										);
									})}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Final Menu */}
					<div className="text-sm flex flex-col gap-1.5 min-w-[150px]">
						<AnimatePresence mode="wait">
							{activeSub && subMenuItemsMap[activeSub]?.length > 0 && (
								<motion.div
									key={`${activeSub}-finalmenu`}
									variants={submenuVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="flex flex-col gap-1.5"
								>
									{subMenuItemsMap[activeSub].map((item, i) => (
										<motion.div
											key={item.name}
											className="relative flex items-center group text-nowrap"
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0, transition: { delay: i * 0.03 } }}
											onMouseEnter={() => setActiveFinal(item.name)}
											onMouseLeave={() => setActiveFinal(null)}
										>
											<motion.div
												className="h-[1px] w-4 bg-black mr-2"
												variants={lineVariants}
												initial="hidden"
												animate={activeFinal === item.name ? 'visible' : 'hidden'}
												style={{ transformOrigin: 'left' }}
											/>
											<Link to={item.to} onClick={toggleLeftSidebar} className="block text-left relative z-10">
												<motion.span
													className="block"
													variants={textVariants}
													initial="inactive"
													animate={activeFinal === item.name ? 'active' : 'inactive'}
												>
													{item.name}
												</motion.span>
											</Link>
										</motion.div>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Bottom Banners */}
				<motion.div
					className="flex justify-around"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
				>
					{[
						{ src: '/new-in.png', label: 'New In', to: '/new-arrivals' },
						{ src: '/celebrity-closet.jpeg', label: 'Best Sellers', to: '/best-sellers' },
					].map(({ src, label, to }) => (
						<motion.div
							key={label}
							className="flex flex-col items-center gap-2 cursor-pointer"
							whileHover={{ scale: 1.05 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<Link to={to} onClick={toggleLeftSidebar}>
								<img src={src} alt={label} className="h-84" />
							</Link>
							<motion.p className="text-sm font-thin" variants={textVariants} initial="inactive" whileHover="active">
								{label}
							</motion.p>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</>
	);
};

export default DesktopMenu;
