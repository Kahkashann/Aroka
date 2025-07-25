import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const JourneySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
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
      className="py-20 lg:py-32 bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Content */}
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div variants={fadeInLeft}>
              <motion.h2 
                className="text-3xl lg:text-4xl font-light text-gray-900 mb-4"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                The Journey
              </motion.h2>
              <motion.div 
                className="w-12 h-px bg-gray-400 mb-8"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : { width: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              />
            </motion.div>

            <motion.p 
              variants={fadeInLeft}
              className="text-lg font-light leading-relaxed text-gray-700"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Starting her journey as a content creator with humble videos and big dreams, 
              Komal transformed into one of India's most influential fashion voices.
            </motion.p>

            <motion.p 
              variants={fadeInLeft}
              className="text-lg font-light leading-relaxed text-gray-700"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              From breaking societal norms to walking red carpets, her path has been 
              defined by risk, reinvention, and resilience. Her evolution continues 
              to inspire a generation of fashion lovers to dream big and dress even bigger.
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.img
              src="/komal-journey.jpg"
              alt="Komal's Journey"
              className="w-full h-[400px] lg:h-[500px] object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Subtle overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default JourneySection;