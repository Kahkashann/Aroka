import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
      ref={containerRef}
      className="relative min-h-screen bg-[#EDE7E2]"
      style={{ y: heroY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image */}
        <motion.div
          className="relative overflow-hidden bg-gray-100"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src="/komal-pandey.jpg"
            alt="Komal Pandey"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Subtle overlay animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <motion.div
            className="max-w-lg space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <motion.h1 
                className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-6"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                About
                <span className="block">Komal Pandey</span>
              </motion.h1>
              <motion.div 
                className="w-12 h-px bg-gray-400 mb-8"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg font-light leading-relaxed text-gray-700"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              A storyteller, an artist, and a fearless voice in India's digital fashion revolution.
              From content creator to one of the most recognized faces in fashion, her journey
              is a masterclass in reinvention and authenticity.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg font-light leading-relaxed text-gray-700"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              What sets Komal apart is her bold approach to fashion — she doesn't follow trends,
              she creates narratives. Each piece tells a story of self-expression and empowerment.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;