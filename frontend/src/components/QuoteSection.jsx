import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const QuoteSection = () => {
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

  return (
    <motion.section 
      ref={ref}
      className="py-20 lg:py-32 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
        <motion.blockquote 
          className="text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed mb-8"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          "Fashion is not just what you wear, it's how you feel in it. 
          And I want every person to feel like their most confident self."
        </motion.blockquote>
        
        <motion.div 
          className="flex items-center justify-center space-x-4"
          variants={fadeInUp}
        >
          <motion.div 
            className="w-8 h-px bg-gray-300"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : { width: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <span className="text-sm font-light text-gray-600 uppercase tracking-wider">
            Komal Pandey
          </span>
          <motion.div 
            className="w-8 h-px bg-gray-300"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : { width: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default QuoteSection;