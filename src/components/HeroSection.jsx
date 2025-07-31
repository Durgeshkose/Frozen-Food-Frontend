import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/frozen-hero.jpg'; // apne image ka path set karo

const HeroSection = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-16 lg:flex lg:items-center lg:justify-between">
      <motion.div
        className="max-w-xl mb-10 lg:mb-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Premium <span className="text-blue-600">Frozen Foods</span><br /> Delivered Fresh!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore our wide range of frozen meals, snacks, and desserts – all at unbeatable prices.
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={heroImage}
          alt="Frozen Food Banner"
          className="rounded-lg shadow-xl w-full h-auto object-cover"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
