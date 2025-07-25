import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            className="py-20 lg:py-32 bg-gray-50 text-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: false, amount: 0.3 }}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <motion.h2
                            className="text-3xl lg:text-4xl font-light text-gray-900 mb-4"
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            Join the Fashion Revolution
                        </motion.h2>

                        <motion.div
                            className="w-12 h-px bg-gray-400 mx-auto mb-8"
                            variants={fadeInUp}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 48 } : { width: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                        />

                        <motion.p
                            className="text-lg font-light leading-relaxed text-gray-700 mb-12"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            Explore Komal's world of unapologetic styling, vulnerability, and art.
                            Step into a space where fashion is fearless and every look is a statement of identity.
                        </motion.p>

                        <motion.button
                            className="inline-flex items-center space-x-3 px-8 py-3 border border-gray-900 text-gray-900 font-light text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Link to="/shop-all"><span>Explore Collection</span></Link>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default CTASection;