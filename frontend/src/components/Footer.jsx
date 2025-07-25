import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ArrowRight } from 'lucide-react'; 

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const inputVariants = {
  initial: {}, 
  focused: { borderColor: '#1e1e1e' },
};

const buttonVariants = {
  rest: { x: 0 },
  hover: { x: 4 }, 
  tap: { scale: 0.95 }
};

const navLinks = [
  {
    title: 'Quick Links',
    items: [
      { text: 'Best Sellers', path: '/best-sellers' },
      { text: 'New Arrivals', path: '/new-arrivals' },
      { text: 'About Us', path: '/about-us' },
      { text: 'Lookbooks', path: '/lookbooks' },
    ],
  },
  {
    title: 'Our Policies',
    items: [
      { text: 'Returns & Exchange', path: '/' },
      { text: 'Shipping Policy', path: '/' },
      { text: 'Terms & Conditions', path: '/' },
      { text: 'Privacy Policy', path: '/' },
    ],
  },
];

const socialLinks = [
  { icon: FaFacebookF, url: 'https://www.facebook.com/arokaofficial/' },
  { icon: FaXTwitter, url: 'https://x.com/arokaofficial' },
  { icon: FaInstagram, url: 'https://www.instagram.com/arokaofficial/' },
  { icon: FaPinterestP, url: 'https://in.pinterest.com/arokaofficial/?invite_code=15714f525db848e68aa77ccfe09a279b&sender=1087478778680191795' },
  { icon: FaYoutube, url: 'https://www.youtube.com/channel/UCStjwRraqKVo0cO_HC-heSA' },
];

const Footer = () => {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#f9f7f5] text-[#1e1e1e] px-6 md:px-12 lg:px-20 py-16 text-sm"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-y-12 gap-x-8">
        {/* Newsletter Section */}
        <div className="md:col-span-5 lg:col-span-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide mb-6">Let’s keep in touch</h3> 
          <div className="relative max-w-sm border-b border-black/30 pb-1"> 
            <motion.input
              type="email"
              placeholder="Enter your e-mail"
              className="bg-transparent border-0 focus:outline-none focus:ring-0 w-full py-2 placeholder:text-sm text-base pr-8" 
              variants={inputVariants}
              whileFocus="focused"
              aria-label="Enter your email for newsletter subscription"
            />
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-gray-700 hover:text-black transition-colors" 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} />
            </motion.button>
          </div>
          <p className="text-xs text-gray-600 mt-4 leading-relaxed"> 
            Get early access to drops, behind the scenes and exclusive offers.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to our ${social.icon.name.replace('Fa', '')} page`}
              >
                <motion.div
                  whileHover={{ scale: 1.15, color: '#000000' }} 
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <social.icon className="text-[20px] text-gray-700 transition-colors duration-300 cursor-pointer" />
                </motion.div>
              </a>
            ))}
          </div>
        </div>

        {navLinks.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`md:col-span-3 lg:col-span-2`}> 
            <h4 className="uppercase text-sm font-semibold tracking-widest mb-5"> 
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={item.path}
                    className="group relative block w-fit pb-1"
                  >
                    <span className="text-sm font-extralight text-gray-700 hover:text-black transition-colors duration-300 ">
                      {item.text}
                    </span>
                    <span className="block h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 absolute bottom-0 left-0 right-0" /> 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Store Location */}
        <div className="md:col-span-4 lg:col-span-4">
          <h4 className="uppercase text-sm font-semibold tracking-widest mb-5">Store Location</h4> 
          <p className="text-sm font-extralight text-gray-700 leading-relaxed mb-4">
            Shwaran Couture LLP, 1st Floor, Plot No. 42,<br />
            Deonar Industrial Estate,<br />
            Govandi (W), Mumbai - 400043
          </p>
          <p className="text-sm font-extralight text-gray-700">
            Contact us for New Orders at{' '}
            <a href="tel:+918591034648" className="hover:underline text-gray-700 font-semibold">
              +91 85910 34648
            </a>
            <br />
            For Existing Order Support at{' '}
            <a href="tel:+918104962773" className="hover:underline text-gray-700 font-semibold">
              +91 81049 62773
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-xs text-gray-500 mt-20 pt-6 border-t border-black/10 text-center"> 
        © {new Date().getFullYear()} Aroka. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;