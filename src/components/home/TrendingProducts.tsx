"use client";

import { motion } from "framer-motion";
import { products } from "./data";
import Banner from "../Banner";
import ProductCarousel from "./ProductCarousel";

const TrendingProducts = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='text-right px-4 py-8 overflow-hidden border border-tusi/30 w-[90%] mx-auto p-5 my-10'>
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='md:block hidden'
        transition={{ delay: 0.2, duration: 0.5 }}>
        <Banner src='/banner/trending.png' />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='md:hidden block'
        transition={{ delay: 0.2, duration: 0.5 }}>
        <Banner src='/banner/trending-sm.png' />
      </motion.div>

      <ProductCarousel
        title='محصولات ترند'
        products={products.slice(0, 6)}
        showAllLink='/trending'
        isNew
      />
    </motion.section>
  );
};

export default TrendingProducts;
