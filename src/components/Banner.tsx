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
    </motion.div>
  );
}
