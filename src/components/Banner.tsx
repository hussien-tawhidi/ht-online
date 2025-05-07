"use client";

import Image from "next/image";
import { motion } from "framer-motion";
export default function Banner({ src, alt }: { src: string; alt?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className='flex overflow-hidden items-center rounded justify-center relative cursor-pointer  group'>
      <Image
        src={src}
        alt={alt || "banner"}
        width={1000}
        height={200}
        className='object-cover transition-all hover:shadow duration-300 overflow-hidden w-full mx-auto'
      />
      <div className='absolute top-0 right-0 backdrop-blur-[2px] h-full w-full transition-all duration-300 opacity-0 group-hover:opacity-50'></div>
      <button className='absolute top-auto bottom-auto right-auto left-auto mx-auto cursor-pointer backdrop-blur-[4px] py-2 px-3 rounded opacity-0 transition-all duration-300 group-hover:opacity-100'>
        برای دیدن بیشتر کلیک کنید
      </button>
    </motion.div>
  );
}
