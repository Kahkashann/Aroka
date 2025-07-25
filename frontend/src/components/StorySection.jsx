import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StorySection = () => {
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
      className="py-20 lg:py-32 bg-gray-50"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
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
              The Story
            </motion.h2>

            <motion.div
              className="w-12 h-px bg-gray-400 mx-auto mb-12"
              variants={fadeInUp}
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : { width: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            />

            <motion.p
              variants={fadeInUp}
              className="text-lg font-light leading-relaxed text-gray-700 mb-8"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Her style is unapologetically expressive, often pushing boundaries with androgynous
              looks, dramatic silhouettes, and powerful themes around body image, gender, and identity.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg font-light leading-relaxed text-gray-700 mb-8"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Beyond clothes, she speaks about mental health, vulnerability, and empowerment,
              making her content deeply relatable and inspiring to millions.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg font-light leading-relaxed text-gray-700"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Komal has carved out a niche where fashion meets emotion, and every outfit
              becomes a form of self-love and declaration of confidence.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default StorySection;