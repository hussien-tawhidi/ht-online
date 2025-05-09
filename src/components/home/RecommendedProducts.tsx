"use client";
import Image from "next/image";
import { products } from "./data"; // Replace with your recommended list
import ProductCarousel from "./ProductCarousel";
import { motion } from "framer-motion";
const RecommendedProducts = () => {
  return (
    <div className='border border-tusi/30 w-[90%] mx-auto p-5 my-10 rounded-xl'>
      <ProductCarousel
        title='پیشنهادات برای شما'
        products={products}
        showAllLink='/recommended'
        specail
      />
      <div className='grid gap-2 md:grid-cols-2 mt-10  overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.03 }}>
          <Image
            src={"/banner/recomended-glasses-banner.jpg"}
            alt={"recomended-glasses-banner"}
            width={1000}
            height={200}
            className='object-cover transition-all hover:shadow duration-300 overflow-hidden w-full mx-auto'
          />
        </motion.div>
        <motion.div
          className='overflow-hidden'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.03 }}>
          <Image
            src={"/banner/recomended-shoes-banner.jpg"}
            alt={"recomended-glasses-banner"}
            width={1000}
            height={200}
            className='object-cover transition-all hover:shadow duration-300 overflow-hidden w-fit mx-auto'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
